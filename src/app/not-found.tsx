import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="animate-fade-in py-24 text-center">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">404</p>
        <h1 className="mt-5 font-serif-jp text-[1.5rem] text-paper">
          お探しのページは見つかりませんでした
        </h1>
        <p className="mx-auto mt-5 max-w-[32rem] text-[0.88rem] leading-[1.9] text-paper-dim">
          URLが変更されたか、削除された可能性があります。
        </p>
        <p className="mt-9">
          <Link
            href="/articles"
            className="text-[0.88rem] text-gold-soft underline decoration-gold-dim underline-offset-[0.28em] transition-colors hover:text-gold"
          >
            記事一覧から探す
          </Link>
        </p>
      </div>
    </div>
  );
}
