const BASE = 'https://www.malaniimpexinc.com';
const API = process.env.NODE_ENV === 'production'
  ? 'https://www.malaniimpexinc.com/api'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

function slugToTitle(slug) {
  if (!slug) return "Technique";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const { technique_id } = await params;
  let title = `${slugToTitle(technique_id)} | Textile Techniques | Malani Impex`;
  let description = `Explore handcrafted ${slugToTitle(technique_id)} techniques by Malani Impex. Authentic Indian textile artistry and craftsmanship.`;

  try {
    const res = await fetch(`${API}/techniques`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const found = data.data.find((t) => t.slug === technique_id);
        if (found) {
          title = `${found.name} | Textile Techniques | Malani Impex`;
          if (found.description) {
            description = found.description.slice(0, 160);
          }
        }
      }
    }
  } catch {
    // fallback to formatted slug title
  }

  const canonicalUrl = `${BASE}/techniques/${technique_id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default function TechniqueDetailLayout({ children }) {
  return children;
}
