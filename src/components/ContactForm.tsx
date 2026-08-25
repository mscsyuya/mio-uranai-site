import { SITE } from '@/data/site';

/**
 * お問い合わせフォーム。
 *
 * このサイトは静的書き出し(output: 'export')のためサーバー側の受け口を持てません。
 * 送信は Formspree などの外部フォームサービスに委ねる想定で、
 * 送信先URLは SITE.contactFormEndpoint に設定します。
 *
 * 未設定のあいだはフォームを描画しません(送信できないフォームを出さないため)。
 * 設定後もメールアドレスの直記載は併記のまま残します。
 */
export default function ContactForm() {
  const endpoint = SITE.contactFormEndpoint.trim();
  if (!endpoint) return null;

  const field =
    'w-full border border-rule bg-ink-sunken px-3 py-2 text-[0.9rem] text-paper ' +
    'placeholder:text-paper-faint focus:border-gold-dim focus:outline-none';

  return (
    <form action={endpoint} method="POST" className="mt-8 space-y-5 not-prose">
      <div>
        <label htmlFor="name" className="mb-1 block text-[0.8rem] text-paper-dim">
          お名前<span className="ml-2 text-[0.7rem] text-paper-faint">任意</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-[0.8rem] text-paper-dim">
          メールアドレス<span className="ml-2 text-[0.7rem] text-gold-dim">必須</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="example@example.com"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-[0.8rem] text-paper-dim">
          お問い合わせ内容<span className="ml-2 text-[0.7rem] text-gold-dim">必須</span>
        </label>
        <textarea id="message" name="message" rows={7} required className={field} />
      </div>

      {/* スパム対策のハニーポット。人間には見えないので、入力があれば機械とみなす */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="_gotcha">この欄は入力しないでください</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="_subject" value={`【${SITE.name}】お問い合わせ`} />

      <p className="text-[0.78rem] leading-[1.85] text-paper-faint">
        送信いただいた内容は、お問い合わせへの回答のためにのみ利用します。
        個人情報の取り扱いについては、プライバシーポリシーをご確認ください。
      </p>

      <button
        type="submit"
        className="border border-gold-dim px-6 py-2 text-[0.88rem] text-gold-soft transition-colors hover:border-gold hover:text-gold"
      >
        送信する
      </button>
    </form>
  );
}
