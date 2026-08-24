import Link from 'next/link';
import { site } from '@/data/site';

const nav = [
  { href: '/articles', label: '記事一覧' },
  { href: '/about', label: 'プロフィール' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-7">
        <Link href="/" className="no-underline">
          <span className="block font-serif-jp text-[1.35rem] tracking-[0.06em] text-paper">
            {site.name}
          </span>
          <span className="mt-1 block text-[0.72rem] tracking-[0.12em] text-paper-faint">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="サイト内メニュー">
          <ul className="flex gap-6 text-[0.85rem] text-paper-dim">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline transition-colors hover:text-gold-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
