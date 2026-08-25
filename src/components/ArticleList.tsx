import Link from 'next/link';
import type { Article } from '@/lib/articles';
import { formatDate } from '@/lib/articles';
import { categoryByName } from '@/data/site';

/**
 * 一覧はカード型にせず、罫線区切りの読み物リストで組む。
 */
export default function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <p className="py-10 text-[0.9rem] text-paper-dim">まだ記事がありません。</p>;
  }

  return (
    <ul className="border-t border-rule">
      {articles.map((article, i) => {
        const category = categoryByName(article.tags[0] ?? '');

        return (
          <li
            key={article.slug}
            className="animate-fade-in border-b border-rule"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          >
            <Link href={`/articles/${article.slug}`} className="group block py-7 no-underline">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] tracking-[0.1em] text-paper-faint">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.updated && (
                  <span className="text-paper-dim">
                    最終更新日:
                    <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                  </span>
                )}
                {category && <span className="text-gold-dim">{category.name}</span>}
                {article.pr && <span className="text-paper-faint">PR</span>}
              </div>

              <h3 className="mt-2 font-serif-jp text-[1.08rem] leading-[1.7] text-paper transition-colors group-hover:text-gold-soft">
                {article.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-[0.85rem] leading-[1.85] text-paper-dim">
                {article.description}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
