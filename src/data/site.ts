export const SITE = {
  name: 'みおの備忘録',
  tagline: '占いは"当てる"より"気付く"道具',
  email: 'mio.uranai.review@gmail.com',
  threadsUrl: 'https://www.threads.net/@mio_uranai_review',
  amazonAssociateActive: false, // Amazonアソシエイト審査通過後に true にする

  // --- 以下はページ側が参照するサイト共通の設定値 ---
  threadsHandle: '@mio_uranai_review',
  description:
    'タロットを独学で3年続けている運営者みおが、電話占い各社の料金体系・鑑定方式を公開情報から比較し、占いに依存しないための付き合い方をまとめた個人サイトです。',
  /** 独自ドメイン取得後は Vercel の環境変数 NEXT_PUBLIC_SITE_URL を設定するだけで全ページに反映されます */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mio-uranai-site.vercel.app').replace(/\/$/, ''),
  author: 'みお',
  locale: 'ja_JP',
  established: '2026-01-11',
  establishedLabel: '2026年1月', // /about のサイト開設表記
  establishedText: '2026年1月11日', // 各規約の制定日表記
  establishedYear: 2026,
  ogImage: '/og-default.png',
} as const;

export const categories = [
  {
    slug: 'reviews',
    name: 'サービス比較',
    description: '電話占い各社の料金体系・鑑定方式・システムを、公開情報から比較します。',
  },
  {
    slug: 'howto',
    name: '電話占いの使い方',
    description: '料金の仕組み、初回無料分の使い方、鑑定方式の違いなど。',
  },
  {
    slug: 'worries',
    name: '悩み別ガイド',
    description: '復縁・片思い・結婚・仕事など、相談内容ごとの向き合い方。',
  },
  {
    slug: 'basics',
    name: '占いの基礎知識',
    description: 'タロット・西洋占星術・月の満ち欠けの基本。',
  },
  {
    slug: 'distance',
    name: '占いとの付き合い方',
    description: '占いジプシーを卒業し、健全な距離感を保つための考え方。',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export function categoryByName(name: string) {
  return categories.find((c) => c.name === name);
}

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
