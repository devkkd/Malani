"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/website/Container";
import { Clock, ArrowLeft, Tag, BookOpen } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API}/blogs/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setBlog(data.data);
          // Inject JSON-LD schema into <head>
          injectSchema(data.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Inject JSON-LD into document head
  const injectSchema = (b) => {
    const existing = document.getElementById("blog-jsonld");
    if (existing) existing.remove();

    const schema = b.seo?.schemaMarkup
      ? b.seo.schemaMarkup
      : JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: b.title,
          description: b.seo?.metaDescription || b.excerpt || "",
          image: b.coverImage?.url || "",
          author: {
            "@type": "Organization",
            name: b.author || "Malani Impex",
            url: "https://www.malaniimpexinc.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Malani Impex",
            logo: {
              "@type": "ImageObject",
              url: "https://www.malaniimpexinc.com/images/logo/MalaniLogo.png",
            },
          },
          datePublished: b.publishedAt,
          dateModified: b.updatedAt,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.malaniimpexinc.com/blog/${b.slug}`,
          },
          keywords: (b.seo?.keywords || b.tags || []).join(", "),
        });

    const script = document.createElement("script");
    script.id = "blog-jsonld";
    script.type = "application/ld+json";
    script.text = schema;
    document.head.appendChild(script);

    // Also update page title and meta description dynamically
    document.title = `${b.seo?.metaTitle || b.title} – Malani Impex`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", b.seo?.metaDescription || b.excerpt || "");
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-[#FFFEF5] min-h-screen py-16 px-4 md:px-8">
        <Container>
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141]" />
            <p className="text-[#666141] mt-4 text-lg">Loading post…</p>
          </div>
        </Container>
      </section>
    );
  }

  if (notFound || !blog) {
    return (
      <section className="w-full bg-[#FFFEF5] min-h-screen py-16 px-4 md:px-8">
        <Container>
          <div className="text-center py-32">
            <BookOpen size={48} className="text-[#666141]/30 mx-auto mb-4" />
            <h1 className="text-2xl text-black mb-4">Post not found</h1>
            <Link href="/blog" className="text-[#666141] hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="w-full bg-[#FFFEF5] py-12 px-4 md:px-8">
      <Container>
        {/* ── Back Link ── */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#666141] hover:underline"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* ── Tags ── */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-[#666141] border border-[#666141]/30 px-3 py-1 rounded-full"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Title ── */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-6">
            {blog.title}
          </h1>

          {/* ── Meta Row ── */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-black/50 mb-10 pb-6 border-b border-[#666141]/10">
            <span className="font-medium text-[#666141]">
              {blog.author || "Malani Impex"}
            </span>
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {blog.readTime || 5} min read
            </span>
          </div>

          {/* ── Cover Image ── */}
          {blog.coverImage?.url && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm mb-10 bg-[#E9E4B5]/20">
              <Image
                src={blog.coverImage.url}
                alt={blog.coverImage.alt || blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* ── Excerpt ── */}
          {blog.excerpt && (
            <p className="text-lg md:text-xl text-black/70 leading-relaxed mb-8 italic border-l-2 border-[#666141] pl-5">
              {blog.excerpt}
            </p>
          )}

          {/* ── Content ── */}
          <div
            className="prose-malani max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* ── Bottom Tags ── */}
          {blog.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#666141]/10 flex flex-wrap gap-2">
              <span className="text-sm text-black/50 mr-2">Tags:</span>
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs text-[#666141] border border-[#666141]/30 px-3 py-1 rounded-full hover:bg-[#666141] hover:text-[#FFFEF5] transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* ── CTA ── */}
          <div className="mt-14 p-8 bg-[#666141] text-[#FFFEF5] rounded-sm text-center space-y-4">
            <p className="text-xl font-normal">
              Interested in our handcrafted collections?
            </p>
            <Link
              href="/collection"
              className="inline-block border border-[#FFFEF5]/60 text-[#FFFEF5] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#FFFEF5] hover:text-[#666141] transition-colors"
            >
              Explore Collection →
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
