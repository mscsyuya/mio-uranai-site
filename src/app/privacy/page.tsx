import type { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'みおの備忘録における個人情報の取り扱い、Google Analytics によるアクセス解析とCookie、第三者配信の広告配信についての方針です。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="animate-fade-in border-b border-rule py-14">
        <p className="text-[0.72rem] tracking-[0.22em] text-gold-dim">PRIVACY POLICY</p>
        <h1 className="mt-4 font-serif-jp text-[1.55rem] text-paper">プライバシーポリシー</h1>
      </header>

      <div className="legal-body mx-auto max-w-[680px] py-12">
        <p>
          「{SITE.name}」(以下、「当サイト」)は、ユーザーの個人情報の保護を尊重し、
          以下の方針に基づき適切に取り扱います。
        </p>

        <h2>個人情報の取得について</h2>
        <p>
          当サイトでは、メールによるお問い合わせの際に、お名前(ハンドルネーム)、メールアドレス、
          お問い合わせ内容等の個人情報をご提供いただく場合があります。
          これらは、お問い合わせへの回答のためにのみ利用し、それ以外の目的では使用しません。
          当サイトはお問い合わせフォームを設置しておらず、ご連絡はメールでのみ受け付けています。
        </p>

        <h2>アクセス解析ツールとCookieについて</h2>
        <p>
          当サイトでは、Google が提供するアクセス解析ツール「Google Analytics」および
          「Google Search Console」を使用してアクセス状況を計測する場合があります。
          Google Analytics はトラフィックデータの収集のためにCookie(クッキー)を使用しており、
          このトラフィックデータは匿名で収集されるため、個人を特定するものではありません。
        </p>
        <p>
          Cookie はブラウザの設定からいつでも無効にすることができます。
          Google Analytics の利用規約およびプライバシーポリシーについては、
          <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="nofollow noopener">
            Google アナリティクス利用規約
          </a>
          をご確認ください。
        </p>

        <h2>第三者配信の広告サービスについて</h2>
        <p>
          当サイトは、第三者配信の広告サービス(A8.net、afb、アクセストレード、Link-A、
          もしもアフィリエイト、Amazonアソシエイト、Google AdSense、各電話占いサイトの
          アフィリエイトプログラム等)を利用しています。
        </p>
        <p>
          これらの広告配信事業者は、ユーザーの興味に応じた商品・サービスの広告を表示するために、
          当サイトや他サイトへのアクセス情報である Cookie を使用することがあります。
          この Cookie にはお名前・住所・メールアドレス・電話番号等の個人を特定する情報は含まれません。
          Cookie を無効にする方法や、パーソナライズ広告の設定については、
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="nofollow noopener">
            Google の広告に関するポリシー
          </a>
          をご確認ください。
        </p>

        <h2>Amazonアソシエイト・プログラムについて</h2>
        <p>
          当サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を
          提供することを目的に設定されたアフィリエイトプログラムである、
          Amazonアソシエイト・プログラムの参加者です。
        </p>
        <p>
          Amazon のアソシエイトとして、当サイトは適格販売により収入を得ています。
          また、Amazon.co.jp のウェブサイト上に表示される商品の価格および在庫状況は、
          該当ページの表示時点のものであり、変更される場合があります。
        </p>

        <h2>第三者へのデータ提供について</h2>
        <p>
          当サイトは、法令に基づく場合、または人の生命・身体・財産の保護に必要であって
          本人の同意を得ることが困難な場合を除き、ユーザーの同意なくして個人情報を
          第三者に提供することはありません。
        </p>

        <h2>プライバシーポリシーの変更について</h2>
        <p>
          当サイトは、必要に応じて本ポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当サイト上に掲載された時点で効力を生じるものとします。
        </p>

        <h2>お問い合わせ先</h2>
        <p>
          本ポリシーに関するお問い合わせは
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          までお願いいたします。
        </p>

        <p className="text-[0.85rem] text-paper-faint">制定日:{SITE.establishedText}</p>
      </div>
    </div>
  );
}
