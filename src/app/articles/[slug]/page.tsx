import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AffiliateCard from '@/components/AffiliateCard';
import PrLabel from '@/components/PrLabel';
import { getAllArticles, getArticle, getNeighbours, formatDate } from '@/lib/articles';
import { renderArticleBody } from '@/lib/markdown';
import { SITE, categoryByName } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `${SITE.url}/articles/${article.slug}`,
      publishedTime: article.date,
      authors: [SITE.author],
      tags: article.tags,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const blocks = await renderArticleBody(article.body);
  const { newer, older } = getNeighbours(article.slug);
  const category = categoryByName(article.tags[0] ?? '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/articles/${article.slug}` },
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    inLanguage: 'ja',
    author: { '@type': 'Person', name: SITE.author, url: `${SITE.url}/about` },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    image: `${SITE.url}${SITE.ogImage}`,
    keywords: article.tags.join(', '),
    isAccessibleForFree: true,
  };

  return (
    <div className="mx-auto max-w-4xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="animate-fade-in py-14">
        <header className="mx-auto max-w-[680px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] tracking-[0.1em] text-paper-faint">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.updated && (
              <span className="text-paper-dim">
                最終更新日:
                <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </span>
            )}
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="text-gold-dim no-underline transition-colors hover:text-gold-soft"
              >
                {category.name}
              </Link>
            )}
          </div>

          <h1 className="mt-4 font-serif-jp text-[1.5rem] leading-[1.65] text-paper sm:text-[1.72rem]">
            {article.title}
          </h1>
        </header>

        {article.pr && (
          <div className="mx-auto mt-8 max-w-[680px]">
            <PrLabel />
          </div>
        )}

        <div className="article-body mx-auto mt-10 max-w-[680px]">
          {blocks.map((block, i) =>
            block.kind === 'affiliate' ? (
              <AffiliateCard key={i} id={block.id} />
            ) : (
              <div key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
            ),
          )}
        </div>

        <footer className="mx-auto mt-16 max-w-[680px] border-t border-rule pt-8">
          <p className="text-[0.78rem] leading-[1.9] text-paper-faint">
            この記事は各社が公表している情報の整理と、運営者みおの個人的な見解をもとに書いています。
            鑑定結果には個人差があり、未来を保証するものではありません。詳しくは
            <Link href="/disclaimer" className="mx-1 text-gold-soft underline decoration-gold-dim underline-offset-[0.25em]">
              免責事項
            </Link>
            をご覧ください。
          </p>

          <nav className="mt-10 grid gap-px border-y border-rule sm:grid-cols-2" aria-label="前後の記事">
            {newer ? (
              <Link href={`/articles/${newer.slug}`} className="group block py-6 no-underline sm:pr-6">
                <span className="text-[0.7rem] tracking-[0.16em] text-gold-dim">← 新しい記事</span>
                <span className="mt-2 block font-serif-jp text-[0.95rem] leading-[1.7] text-paper transition-colors group-hover:text-gold-soft">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link
                href={`/articles/${older.slug}`}
                className="group block border-t border-rule py-6 no-underline sm:border-t-0 sm:border-l sm:pl-6 sm:text-right"
              >
                <span className="text-[0.7rem] tracking-[0.16em] text-gold-dim">古い記事 →</span>
                <span className="mt-2 block font-serif-jp text-[0.95rem] leading-[1.7] text-paper transition-colors group-hover:text-gold-soft">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <p className="mt-10">
            <Link
              href="/articles"
              className="text-[0.82rem] text-paper-dim no-underline transition-colors hover:text-gold-soft"
            >
              記事一覧に戻る
            </Link>
          </p>
        </footer>
      </article>
    </div>
  );
}
