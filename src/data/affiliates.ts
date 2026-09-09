export type Affiliate = {
  id: string;
  label: string; // 表示テキスト
  url: string; // アフィリエイトURL(後で埋める)
  program: 'a8' | 'afb' | 'amazon' | 'rakuten' | 'coconala';
  /** afb の通常リンクコードに含まれる1x1計測タグのURL(任意) */
  impressionUrl?: string;
};

/**
 * 記事Markdown内の {{affiliate:id}} がここの id と対応します。
 *
 * 使い方: 各プログラムで発行したアフィリエイトURLを url に貼るだけ。
 * url が空文字のあいだはリンクを一切描画しません(壊れたリンクを出さないため)。
 *
 * 参考として、各サービスの公式サイトURLをコメントに残しています。
 * A8.net などで該当プログラムを検索するときの手がかりに使ってください。
 */
export const affiliates: Affiliate[] = [
  // 公式: https://vernis.co.jp/
  {
    id: 'vernis',
    label: '電話占いヴェルニ 公式サイトを見る',
    url: 'https://t.afi-b.com/visit.php?a=r7674L-z365459o&p=b991605f',
    impressionUrl: 'https://t.afi-b.com/lead/r7674L/b991605f/z365459o',
    program: 'afb',
  },
  // 公式: https://kizuna-uranai.com/
  {
    id: 'kizuna',
    label: '電話占い絆 公式サイトを見る',
    url: 'https://t.afi-b.com/visit.php?a=18791i-M297873R&p=b991605f',
    impressionUrl: 'https://t.afi-b.com/lead/18791i/b991605f/M297873R',
    program: 'afb',
  },
  // 公式: https://d-ny.jp/
  {
    id: 'destiny',
    label: '電話占いデスティニー 公式サイトを見る',
    url: 'https://t.afi-b.com/visit.php?a=J8084z-A2707070&p=b991605f',
    impressionUrl: 'https://t.afi-b.com/lead/J8084z/b991605f/A2707070',
    program: 'afb',
  },
  // 公式: https://feel-fortune.jp/
  { id: 'feel', label: '電話占いFeel 公式サイトを見る', url: '', program: 'a8' },
  // 公式: https://tarot.line.me/
  { id: 'line-talk', label: 'LINEトーク占い 公式サイトを見る', url: '', program: 'a8' },
  // 公式: https://pure-r.com/
  { id: 'purely', label: '電話占いピュアリ 公式サイトを見る', url: '', program: 'a8' },
  // 公式: https://coconala.com/categories/3?service_kind=1
  { id: 'coconala', label: 'ココナラ占い カテゴリを見る', url: '', program: 'coconala' },
];

export function getAffiliate(id: string): Affiliate | undefined {
  return affiliates.find((a) => a.id === id);
}

/** url が未入力のものは「まだ出せないリンク」として扱う */
export function isLive(a: Affiliate | undefined): a is Affiliate {
  return !!a && a.url.trim().length > 0;
}
