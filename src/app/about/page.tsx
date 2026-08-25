import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: '運営者プロフィール',
  description:
    'みおの備忘録の運営者「みお」のプロフィールと、サイト運営の基本姿勢・連絡先をまとめたページです。',
  alternates: { canonical: '/about' },
};

const profile = [
  { label: 'ハンドルネーム', value: 'みお' },
  { label: '年齢・属性', value: '28歳・独身OL' },
  { label: '居住地', value: '東京都' },
  { label: '占い経験', value: 'タロット独学3年' },
  { label: 'サイト開設', value: SITE.established },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="animate-fade-in border-b border-rule py-14">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">PROFILE</p>
        <h1 className="mt-4 font-serif-jp text-[1.55rem] text-paper">運営者プロフィール</h1>
      </header>

      <div className="legal-body mx-auto max-w-[680px] py-12">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-b border-rule pb-8 text-[0.9rem]">
          {profile.map((row) => (
            <div key={row.label} className="contents">
              <dt className="whitespace-nowrap text-gold-dim">{row.label}</dt>
              <dd className="text-paper">{row.value}</dd>
            </div>
          ))}
        </dl>

        <h2>発信していること</h2>
        <p>
          電話占いサービスの比較、タロット・西洋占星術の解説、お悩み別の占いの使い方、
          占いジプシーを卒業するためのノウハウを中心に書いています。
          「占いは"当てる"より"気付く"道具」というスタンスで、占いとの健全な距離感を試行錯誤している記録です。
        </p>

        <h2>このサイトで扱うテーマ</h2>
        <ul>
          <li>電話占いサービスの比較(各社が公表している情報にもとづく)</li>
          <li>タロット・西洋占星術の解説</li>
          <li>恋愛・復縁・人間関係のお悩み別考察</li>
          <li>占いとの付き合い方・依存しない使い方</li>
        </ul>

        <h2>サイト運営の基本姿勢</h2>
        <ul>
          <li>当サイトにはアフィリエイトリンクが含まれます(該当記事の冒頭に「PR」を表示しています)</li>
          <li>
            紹介する電話占いサイトの情報は、各社が公表している料金・鑑定方式・システムに
            もとづいて記載します。運営者はこれらのサービスの利用者ではないため、
            鑑定内容や占い師個人についての体験談は掲載していません
          </li>
          <li>
            法令(景品表示法・薬機法・特定商取引法等)を遵守し、誇大表現・優良誤認表現は使用しません
          </li>
          <li>「絶対当たる」「必ず復縁できる」といった、結果を保証する表現は使用しません</li>
        </ul>

        <h2>運営者情報・連絡先</h2>
        <p>
          運営者:{SITE.author}(ハンドルネーム)
          <br />
          連絡先:
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <br />
          SNS:
          <a href={SITE.threadsUrl} target="_blank" rel="noopener">
            Threads {SITE.threadsHandle}
          </a>
        </p>
        <p>
          個別の鑑定依頼・占い師の紹介は承っておりません。
          お問い合わせの詳細は
          <Link href="/contact">お問い合わせページ</Link>
          をご確認ください。
        </p>
      </div>
    </div>
  );
}
