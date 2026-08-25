import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import { getAllArticles, getArticlesByTag } from '@/lib/articles';
import { SITE, categories } from '@/data/site';

export default function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="animate-fade-in border-b border-rule py-16 sm:py-20">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">ABOUT THIS SITE</p>
        <h1 className="mt-5 font-serif-jp text-[1.7rem] leading-[1.7] text-paper sm:text-[2rem]">
          占いは、当てるものではなく
          <br />
          自分の考えに気付くための道具です。
        </h1>
        <div className="mt-7 max-w-[42rem] space-y-4 text-[0.95rem] leading-[1.95] text-paper-dim">
          <p>
            はじめまして、みおです。東京で働く28歳の独身OLで、タロットを独学で3年続けています。
            悩むたびに占いを求めて渡り歩いてしまう、いわゆる「占いジプシー」という状態には
            心当たりがあり、その距離感をずっと考えてきました。
          </p>
          <p>
            このサイトは、占いと健全な距離を取るために知っておきたかったことをまとめた備忘録です。
            電話占い各社が公表している料金体系・鑑定方式の比較と、占いに依存せず付き合うための考え方を、
            誇張なしで書いています。「絶対当たる」「必ず復縁できる」といった表現は使いません。
          </p>
        </div>
        <p className="mt-8">
          <Link
            href="/about"
            className="text-[0.85rem] text-gold-soft underline decoration-gold-dim underline-offset-[0.28em] transition-colors hover:text-gold"
          >
            運営者について詳しく
          </Link>
        </p>
      </section>

      <section className="py-16" aria-labelledby="latest">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 id="latest" className="font-serif-jp text-[1.15rem] tracking-[0.04em] text-paper">
            最新の記事
          </h2>
          <Link
            href="/articles"
            className="shrink-0 text-[0.8rem] text-paper-dim no-underline transition-colors hover:text-gold-soft"
          >
            すべて見る({articles.length}件) →
          </Link>
        </div>
        <ArticleList articles={latest} />
      </section>

      <section className="border-t border-rule py-16" aria-labelledby="categories">
        <h2 id="categories" className="mb-2 font-serif-jp text-[1.15rem] tracking-[0.04em] text-paper">
          カテゴリから探す
        </h2>
        <ul className="mt-6 border-t border-rule">
          {categories.map((category) => {
            const count = getArticlesByTag(category.name).length;
            return (
              <li key={category.slug} className="border-b border-rule">
                <Link
                  href={`/categories/${category.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5 no-underline"
                >
                  <span className="font-serif-jp text-[1rem] text-paper transition-colors group-hover:text-gold-soft">
                    {category.name}
                  </span>
                  <span className="text-[0.72rem] tracking-[0.1em] text-gold-dim">{count}件</span>
                  <span className="w-full text-[0.82rem] leading-[1.8] text-paper-dim">
                    {category.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-rule py-14">
        <p className="text-[0.8rem] leading-[1.95] text-paper-faint">
          {SITE.name}で紹介する電話占いサービスの情報は、各社が公表している内容にもとづくものです。
          運営者はこれらのサービスの利用者ではなく、鑑定内容についての体験談は掲載していません。
          記事にはアフィリエイトリンクを含む場合があり、その記事には冒頭に「PR」を表示しています。
          詳しくは
          <Link href="/privacy" className="mx-1 text-gold-soft underline decoration-gold-dim underline-offset-[0.25em]">
            プライバシーポリシー
          </Link>
          と
          <Link href="/disclaimer" className="mx-1 text-gold-soft underline decoration-gold-dim underline-offset-[0.25em]">
            免責事項
          </Link>
          をご確認ください。
        </p>
      </section>
    </div>
  );
}
