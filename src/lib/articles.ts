import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Article = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  pr: boolean;
  source?: string;
  body: string;
};

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;

  const files = fs.existsSync(ARTICLES_DIR)
    ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'))
    : [];

  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const slug = String(data.slug || file.replace(/\.md$/, ''));

    return {
      slug,
      title: String(data.title || slug),
      date: String(data.date || ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: String(data.description || ''),
      pr: data.pr === true,
      source: data.source ? String(data.source) : undefined,
      body: content.trim(),
    } satisfies Article;
  });

  // 日付降順。同日なら slug の降順(スラッグ末尾が公開時刻なので実質時刻順)
  articles.sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));

  cache = articles;
  return articles;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}

/** 一覧上の前後関係(0 が最新)。記事下のナビに使う */
export function getNeighbours(slug: string) {
  const all = getAllArticles();
  const i = all.findIndex((a) => a.slug === slug);
  return {
    newer: i > 0 ? all[i - 1] : undefined,
    older: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split('-');
  if (!y || !m || !d) return date;
  return `${y}年${Number(m)}月${Number(d)}日`;
}
