import type { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '記事一覧',
  description:
    '電話占いサイトのレビュー、タロット・西洋占星術の基礎、悩み別の占いの使い方まで。公開日の新しい順に並べています。',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="animate-fade-in border-b border-rule py-14">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">ARTICLES</p>
        <h1 className="mt-4 font-serif-jp text-[1.55rem] text-paper">記事一覧</h1>
        <p className="mt-4 max-w-[38rem] text-[0.88rem] leading-[1.9] text-paper-dim">
          全{articles.length}件を公開日の新しい順に並べています。
        </p>
      </header>

      <div className="py-12">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
