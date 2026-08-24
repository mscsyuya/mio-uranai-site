import Link from 'next/link';
import { site, categories } from '@/data/site';

const legal = [
  { href: '/about', label: '運営者情報' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/disclaimer', label: '免責事項' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-ink-sunken">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-label="カテゴリ">
            <h2 className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] text-gold-dim">
              カテゴリ
            </h2>
            <ul className="space-y-2 text-[0.85rem] text-paper-dim">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="no-underline transition-colors hover:text-gold-soft"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="サイト情報">
            <h2 className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] text-gold-dim">
              このサイトについて
            </h2>
            <ul className="space-y-2 text-[0.85rem] text-paper-dim">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="no-underline transition-colors hover:text-gold-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-3 border-t border-rule-soft pt-7 text-[0.75rem] leading-[1.9] text-paper-faint">
          <p>
            当サイトは、A8.net をはじめとするアフィリエイトプログラム、および
            Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定された
            アフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
          <p>
            掲載内容は運営者個人の体験・感想であり、鑑定結果には個人差があります。未来を保証するものではありません。
          </p>
          <p>
            &copy; {site.establishedYear} {site.name} / {site.author}
          </p>
        </div>
      </div>
    </footer>
  );
}
