type Props = {
  /** 記事冒頭で使うときは full。本文中の小さな注記は compact */
  variant?: 'full' | 'compact';
  /** 対象サービス名を書ければ入れる(例: 電話占いヴェルニ) */
  subject?: string;
};

/**
 * アフィリエイトリンクを含む記事に出す「PR」表記。
 * 景品表示法のステルスマーケティング規制に対応するため、
 * 記事本文を読み始める前に見える位置へ置くこと。
 */
export default function PrLabel({ variant = 'full', subject }: Props) {
  const chip = (
    <span className="inline-flex shrink-0 items-center rounded-[2px] border border-gold-dim px-2 py-[0.1rem] text-[0.7rem] font-semibold tracking-[0.18em] text-gold">
      PR
    </span>
  );

  if (variant === 'compact') {
    return (
      <span className="inline-flex items-center gap-2 align-middle text-[0.8rem] text-paper-faint">
        {chip}
        <span>広告を含みます</span>
      </span>
    );
  }

  return (
    <aside
      className="flex gap-3 border-y border-rule-soft bg-ink-sunken/60 px-4 py-3 text-[0.82rem] leading-[1.85] text-paper-dim"
      aria-label="広告に関する表示"
    >
      {chip}
      <p>
        本記事には{subject ? `「${subject}」への` : ''}アフィリエイトリンクが含まれます。
        記事内の評価はすべて運営者個人の体験・感想に基づくもので、鑑定結果には個人差があり、
        未来を保証するものではありません。
      </p>
    </aside>
  );
}
