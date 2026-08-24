import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { site, categories } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const latest = articles[0]?.date ?? '2026-05-12';

  return [
    { url: `${site.url}/`, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/articles`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
    ...categories.map((c) => ({
      url: `${site.url}/categories/${c.slug}`,
      lastModified: latest,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/articles/${a.slug}`,
      lastModified: a.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
