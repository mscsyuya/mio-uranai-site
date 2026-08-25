import type { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'みおの備忘録へのお問い合わせ先です。記事内容へのご質問、執筆依頼、PRのご相談はメールにて承っています。',
  alternates: { canonical: '/contact' },
};

const subject = encodeURIComponent(`【${SITE.name}】お問い合わせ`);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="animate-fade-in border-b border-rule py-14">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">CONTACT</p>
        <h1 className="mt-4 font-serif-jp text-[1.55rem] text-paper">お問い合わせ</h1>
      </header>

      <div className="legal-body mx-auto max-w-[680px] py-12">
        <p>
          当サイトへのお問い合わせは、下記のメールアドレス宛にお願いいたします。
          お問い合わせフォームは設置しておりません。
        </p>

        <div className="my-9 border-y border-gold-dim/45 py-6 text-center">
          <p className="text-[0.72rem] tracking-[0.18em] text-gold-dim">MAIL</p>
          <p className="mt-3">
            <a
              href={`mailto:${SITE.email}?subject=${subject}`}
              className="font-serif-jp text-[1.15rem] tracking-[0.03em] text-gold-soft"
            >
              {SITE.email}
            </a>
          </p>
          <p className="mt-3 text-[0.78rem] text-paper-faint">
            クリックするとメールソフトが起動します
          </p>
        </div>

        <h2>お問い合わせ前のお願い</h2>
        <ul>
          <li>個別の鑑定依頼は承っておりません(運営者は占い師ではありません)</li>
          <li>占い師の紹介・斡旋は行っておりません</li>
          <li>記事内容に関するご質問、執筆依頼、PRのご相談などは歓迎いたします</li>
        </ul>

        <h2>ご返信について</h2>
        <p>
          お問い合わせの内容によっては、ご返信までお時間をいただく場合がございます。
          また、内容によってはご返信できかねる場合もございますので、あらかじめご了承ください。
          いただいた個人情報はお問い合わせへの回答のためにのみ利用します。
        </p>

        <h2>その他の連絡手段</h2>
        <p>
          <a href={SITE.threadsUrl} target="_blank" rel="noopener">
            Threads {SITE.threadsHandle}
          </a>
          のDMでも受け付けています。
        </p>
      </div>
    </div>
  );
}
