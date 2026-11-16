"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Container from "@/components/website/Container";
import { Clock, ArrowRight, BookOpen, Globe, Layers } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const LANGUAGES = [
  { value: "all",        label: "All Languages" },
  { value: "english",    label: "English" },
  { value: "hindi",      label: "Hindi" },
  { value: "french",     label: "French" },
  { value: "german",     label: "German" },
  { value: "spanish",    label: "Spanish" },
  { value: "italian",    label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "arabic",     label: "Arabic" },
  { value: "japanese",   label: "Japanese" },
  { value: "chinese",    label: "Chinese" },
];

// ── Inner component (needs useSearchParams) ──────────────────────
const BlogContent = () => {
  const searchParams = useSearchParams();

  const [blogs,      setBlogs]      = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [loading,    setLoading]    = useState(true);

  const activeCategory = searchParams.get("category") || "all";
  const activeLanguage = searchParams.get("language")  || "all";

  const buildUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  const blogUrl = (blog) => {
    const cat  = blog.techniqueCategorySlug || "general";
    const lang = blog.language              || "english";
    return `/blog/${cat}/${lang}/${blog.slug}`;
  };

  useEffect(() => {
    fetch(`${API}/techniques`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setTechniques(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "50" });
        if (activeCategory !== "all") params.set("category", activeCategory);
        if (activeLanguage !== "all") params.set("language",  activeLanguage);
        const res  = await fetch(`${API}/blogs?${params.toString()}`);
        const data = await res.json();
        if (data.success) setBlogs(data.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [activeCategory, activeLanguage]);

  const featured = blogs.find((b) => b.featured);
  const rest     = blogs.filter((b) => b !== featured);

  const categoryOptions = [
    { value: "all",     label: "All Categories" },
    { value: "general", label: "General" },
    ...techniques.map((t) => ({ value: t.slug, label: t.name })),
  ];

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8 min-h-screen">
      <Container>

        {/* ── Header ── */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">Our Blog</h1>
          <p className="text-black text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Stories of craftsmanship, heritage, and the hands behind every thread.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col gap-5 mb-12">
          {/* Category */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs text-black/50 font-medium uppercase tracking-wider">
              <Layers size={12} /> Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((opt) => (
                <Link key={opt.value} href={buildUrl("category", opt.value)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                    activeCategory === opt.value
                      ? "bg-[#666141] text-[#FFFEF5] border-[#666141]"
                      : "bg-transparent text-[#666141] border-[#666141]/30 hover:border-[#666141]"
                  }`}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs text-black/50 font-medium uppercase tracking-wider">
              <Globe size={12} /> Language
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <Link key={lang.value} href={buildUrl("language", lang.value)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                    activeLanguage === lang.value
                      ? "bg-[#666141] text-[#FFFEF5] border-[#666141]"
                      : "bg-transparent text-[#666141] border-[#666141]/30 hover:border-[#666141]"
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Active filter badges */}
        {(activeCategory !== "all" || activeLanguage !== "all") && (
          <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
            <span className="text-black/40">Showing:</span>
            {activeCategory !== "all" && (
              <span className="bg-[#666141]/10 text-[#666141] px-3 py-1 rounded-full text-xs">
                {categoryOptions.find((c) => c.value === activeCategory)?.label || activeCategory}
              </span>
            )}
            {activeLanguage !== "all" && (
              <span className="bg-[#666141]/10 text-[#666141] px-3 py-1 rounded-full text-xs capitalize">
                {LANGUAGES.find((l) => l.value === activeLanguage)?.label || activeLanguage}
              </span>
            )}
            <Link href="/blog" className="text-xs text-black/40 hover:text-black underline ml-1">
              Clear filters
            </Link>
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141]" />
            <p className="text-[#666141] mt-4 text-lg">Loading stories…</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-32 text-[#666141]/60 text-lg">
            No blog posts found.{" "}
            <Link href="/blog" className="underline text-[#666141]">Clear filters</Link>
          </div>
        ) : (
          <>
            {/* ── Featured Post ── */}
            {featured && (
              <Link href={blogUrl(featured)} className="group block mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-[#666141]/10 hover:border-[#666141]/30 transition-all duration-300">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-[#E9E4B5]/30 overflow-hidden">
                    {featured.coverImage?.url ? (
                      <Image src={featured.coverImage.url} alt={featured.coverImage.alt || featured.title}
                        fill sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9E4B5] to-[#d9d4a5]">
                        <BookOpen size={64} className="text-[#666141]/30" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-[#666141] text-[#FFFEF5] text-xs font-medium px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-5 bg-[#FFFEF5]">
                    <div className="flex flex-wrap gap-2">
                      {featured.techniqueCategoryName && (
                        <span className="text-xs text-[#666141] border border-[#666141]/30 px-3 py-1 rounded-full">
                          {featured.techniqueCategoryName}
                        </span>
                      )}
                      {featured.language && (
                        <span className="text-xs text-black/40 border border-black/10 px-3 py-1 rounded-full capitalize">
                          {featured.language}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl md:text-4xl text-black leading-tight group-hover:text-[#666141] transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-black/70 text-sm md:text-base leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-[#666141]/10">
                      <div className="flex items-center gap-4 text-xs text-black/50">
                        <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.readTime || 5} min read</span>
                        <span>{featured.author || "Malani Impex"}</span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-[#666141]">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── Blog Grid ── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((blog) => <BlogCard key={blog._id} blog={blog} blogUrl={blogUrl(blog)} />)}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

// ── Blog Card ────────────────────────────────────────────────────
const BlogCard = ({ blog, blogUrl }) => (
  <Link href={blogUrl}
    className="group flex flex-col overflow-hidden rounded-sm border border-[#666141]/10 hover:border-[#666141]/30 transition-all duration-300 bg-[#FFFEF5] hover:shadow-md"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-[#E9E4B5]/30">
      {blog.coverImage?.url ? (
        <Image src={blog.coverImage.url} alt={blog.coverImage.alt || blog.title}
          fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9E4B5] to-[#d9d4a5]">
          <BookOpen size={40} className="text-[#666141]/30" />
        </div>
      )}
    </div>
    <div className="flex-1 p-6 flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {blog.techniqueCategoryName && (
          <span className="text-[10px] text-[#666141] border border-[#666141]/30 px-2.5 py-0.5 rounded-full">
            {blog.techniqueCategoryName}
          </span>
        )}
        {blog.language && (
          <span className="text-[10px] text-black/40 border border-black/10 px-2.5 py-0.5 rounded-full capitalize">
            {blog.language}
          </span>
        )}
      </div>
      <h3 className="text-xl text-black font-normal leading-snug group-hover:text-[#666141] transition-colors duration-300 line-clamp-2">
        {blog.title}
      </h3>
      {blog.excerpt && (
        <p className="text-sm text-black/65 leading-relaxed line-clamp-2 flex-1">{blog.excerpt}</p>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-[#666141]/10 mt-auto">
        <div className="flex items-center gap-3 text-xs text-black/50">
          <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime || 5} min</span>
          <span>{blog.author || "Malani Impex"}</span>
        </div>
        <ArrowRight size={14} className="text-[#666141]" />
      </div>
    </div>
  </Link>
);

// ── Suspense wrapper (required for useSearchParams) ──────────────
const BlogPage = () => (
  <Suspense fallback={
    <section className="w-full bg-[#FFFEF5] min-h-screen py-16 px-4">
      <div className="flex flex-col items-center justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141]" />
      </div>
    </section>
  }>
    <BlogContent />
  </Suspense>
);

export default BlogPage;
