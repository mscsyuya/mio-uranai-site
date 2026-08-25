import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SITE, categories } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const latest = articles[0]?.date ?? '2026-05-12';

  return [
    { url: `${SITE.url}/`, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/articles`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE.url}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
    ...categories.map((c) => ({
      url: `${SITE.url}/categories/${c.slug}`,
      lastModified: latest,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${SITE.url}/articles/${a.slug}`,
      lastModified: a.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
