import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { getAffiliate, isLive } from '@/data/affiliates';

/** 記事本文は「HTMLの塊」と「アフィリエイトカード」の並びとして表現する */
export type Block =
  | { kind: 'html'; html: string }
  | { kind: 'affiliate'; id: string };

const AFFILIATE_LINE = /^[ \t]*\{\{affiliate:([a-z0-9-]+)\}\}[ \t]*$/gm;
const AFFILIATE_ANY = /\{\{affiliate:[a-z0-9-]+\}\}/g;

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // はてなブログ時代の <br> 改行を再現する(箇条書き「・」の行が潰れないように)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

async function toHtml(markdown: string): Promise<string> {
  // 単独行にならなかった残りのプレースホルダは何も出さずに削る
  const cleaned = markdown.replace(AFFILIATE_ANY, '').trim();
  if (!cleaned) return '';

  const html = String(await processor.process(cleaned));

  return (
    html
      // 外部リンクは別タブ + rel を付ける(アフィリエイトカード側は別途 sponsored を付与)
      .replace(
        /<a href="(https?:\/\/[^"]+)"/g,
        '<a href="$1" target="_blank" rel="nofollow noopener"',
      )
      // 本文中の [表示テキスト](affiliate:id) をアフィリエイトリンクに解決する。
      // ・url が未入力(未提携)のあいだはリンクにせず、ただのテキストとして残す
      // ・広告リンクなので rel に sponsored を付ける
      // ・計測タグはカード側(AffiliateCard)で1回だけ発火させるため、ここでは付けない
      .replace(
        /<a href="affiliate:([a-z0-9-]+)">([\s\S]*?)<\/a>/g,
        (_match, id: string, text: string) => {
          const affiliate = getAffiliate(id);
          if (!isLive(affiliate)) return text;
          return `<a href="${affiliate.url}" target="_blank" rel="nofollow sponsored noopener">${text}</a>`;
        },
      )
      // 比較表が本文幅(680px)を超えるので、横スクロールを表の中に閉じ込める
      .replace(/<table>/g, '<div class="table-scroll"><table>')
      .replace(/<\/table>/g, '</table></div>')
  );
}

/** Markdown 本文を、アフィリエイト差し込み位置で分割してレンダリングする */
export async function renderArticleBody(markdown: string): Promise<Block[]> {
  const blocks: Block[] = [];
  let cursor = 0;

  AFFILIATE_LINE.lastIndex = 0;
  for (const match of markdown.matchAll(AFFILIATE_LINE)) {
    const start = match.index ?? 0;
    const html = await toHtml(markdown.slice(cursor, start));
    if (html) blocks.push({ kind: 'html', html });
    blocks.push({ kind: 'affiliate', id: match[1] });
    cursor = start + match[0].length;
  }

  const tail = await toHtml(markdown.slice(cursor));
  if (tail) blocks.push({ kind: 'html', html: tail });

  return blocks;
}

/** 目次やプレーンテキストが要るとき用 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(AFFILIATE_ANY, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
