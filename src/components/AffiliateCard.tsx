import { getAffiliate, isLive } from '@/data/affiliates';

/**
 * 記事Markdown中の {{affiliate:id}} をリンクカードに置き換える。
 * affiliates.ts の url が空のあいだは何も描画しない(壊れたリンクを出さない)。
 */
export default function AffiliateCard({ id }: { id: string }) {
  const affiliate = getAffiliate(id);
  if (!isLive(affiliate)) return null;

  return (
    <div className="my-9 border-y border-gold-dim/45 py-5">
      <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.18em] text-gold-dim">PR</p>
      <a
        href={affiliate.url}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="group flex min-h-11 items-center gap-3 text-[1.02rem] font-medium text-gold-soft no-underline hover:text-gold"
      >
        <span className="underline decoration-gold-dim underline-offset-[0.25em] group-hover:decoration-gold-soft">
          {affiliate.label}
        </span>
        <span aria-hidden className="text-gold-dim transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>
      {affiliate.impressionUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={affiliate.impressionUrl} alt="" width={1} height={1} style={{ border: 'none' }} />
      ) : null}
    </div>
  );
}
