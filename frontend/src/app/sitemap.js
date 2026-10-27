const BASE = 'https://www.malaniimpexinc.com';
const API  = process.env.NEXT_PUBLIC_API_URL;

async function fetchBlogs() {
  try {
    const res = await fetch(`${API}/blogs?limit=200`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const lastmod = '2026-08-26T00:00:00.000Z';

  const staticRoutes = [
    { url: `${BASE}/`,            changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/about`,       changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/collection`,  changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/process`,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/empowerment`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/certificate`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/techniques`,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/seasons`,     changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/seasons/festival`,                    changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/seasons/summer-collection`,           changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/seasons/winter-collection`,           changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/seasons/year-round-classics-collection`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog`,        changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/contact`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacy-policy`,       changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/terms-and-conditions`, changeFrequency: 'yearly', priority: 0.4 },
  ].map((r) => ({ ...r, lastModified: lastmod }));

  // Dynamic blog post URLs
  const blogs = await fetchBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || blog.publishedAt || lastmod,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
