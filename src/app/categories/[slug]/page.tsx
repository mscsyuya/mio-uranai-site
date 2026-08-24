import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleList from '@/components/ArticleList';
import { getArticlesByTag } from '@/lib/articles';
import { categories, categoryBySlug } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const articles = getArticlesByTag(category.name);

  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="animate-fade-in border-b border-rule py-14">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">CATEGORY</p>
        <h1 className="mt-4 font-serif-jp text-[1.55rem] text-paper">{category.name}</h1>
        <p className="mt-4 max-w-[38rem] text-[0.88rem] leading-[1.9] text-paper-dim">
          {category.description}(全{articles.length}件)
        </p>
      </header>

      <div className="py-12">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
