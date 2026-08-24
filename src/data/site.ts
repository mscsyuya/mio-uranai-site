export const site = {
  name: 'みおの備忘録',
  tagline: '占いは"当てる"より"気付く"道具',
  description:
    '電話占い・タロット・西洋占星術を3年使ってきた運営者みおが、実際に試したサイトのレビューと、占いに依存しないための使い方をまとめた個人サイトです。',
  /** 独自ドメイン取得後は Vercel の環境変数 NEXT_PUBLIC_SITE_URL を設定するだけで全ページに反映されます */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mio-uranai-site.vercel.app').replace(/\/$/, ''),
  author: 'みお',
  authorBio: '28歳・独身OL・東京在住。タロット独学3年、電話占い利用歴3年。',
  contactEmail: 'info@mscube.jp',
  threads: 'https://www.threads.net/@mio_uranai_review',
  threadsHandle: '@mio_uranai_review',
  locale: 'ja_JP',
  established: '2026年5月12日',
  establishedYear: 2026,
  ogImage: '/og-default.png',
} as const;

export const categories = [
  { slug: 'reviews', name: '個別サイトレビュー', description: '実際に登録して使った電話占いサイトの本音レビュー。' },
  { slug: 'howto', name: '電話占いの使い方', description: '料金の仕組み、初回無料分の使い方、鑑定方式の違いなど。' },
  { slug: 'worries', name: '悩み別ガイド', description: '復縁・片思い・結婚・仕事など、相談内容ごとの向き合い方。' },
  { slug: 'basics', name: '占いの基礎知識', description: 'タロット・西洋占星術・月の満ち欠けの基本。' },
  { slug: 'distance', name: '占いとの付き合い方', description: '占いジプシーを卒業し、健全な距離感を保つための考え方。' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export function categoryByName(name: string) {
  return categories.find((c) => c.name === name);
}

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
