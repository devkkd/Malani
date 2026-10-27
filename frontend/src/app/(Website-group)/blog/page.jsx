"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/website/Container";
import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [allTags, setAllTags] = useState(["All"]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
          // Collect unique tags
          const tags = ["All"];
          data.data.forEach((b) => {
            (b.tags || []).forEach((t) => {
              if (!tags.includes(t)) tags.push(t);
            });
          });
          setAllTags(tags);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered =
    activeTag === "All"
      ? blogs
      : blogs.filter((b) => (b.tags || []).includes(activeTag));

  const featured = filtered.find((b) => b.featured);
  const rest = filtered.filter((b) => !b.featured || b !== featured);

  if (loading) {
    return (
      <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8 min-h-screen">
        <Container>
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141]" />
            <p className="text-[#666141] mt-4 text-lg">Loading stories…</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8 min-h-screen">
      <Container>
        {/* ── Header ── */}
        <div className="text-center mb-14 space-y-4">
          {/* <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen size={28} className="text-[#666141]" />
          </div> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
            Our Blog
          </h1>
          <p className="text-black text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Stories of craftsmanship, heritage, and the hands behind every thread.
          </p>
        </div>

        {/* ── Tag Filter ── */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-[#666141] text-[#FFFEF5] border-[#666141]"
                    : "bg-transparent text-[#666141] border-[#666141]/40 hover:border-[#666141]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="text-center py-32 text-[#666141]/60 text-lg">
            No blog posts yet. Check back soon.
          </div>
        ) : (
          <>
            {/* ── Featured Post ── */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-[#666141]/10 hover:border-[#666141]/30 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-[#E9E4B5]/30 overflow-hidden">
                    {featured.coverImage?.url ? (
                      <Image
                        src={featured.coverImage.url}
                        alt={featured.coverImage.alt || featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9E4B5] to-[#d9d4a5]">
                        <BookOpen size={64} className="text-[#666141]/30" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-[#666141] text-[#FFFEF5] text-xs font-medium px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 bg-[#FFFEF5]">
                    <div className="flex flex-wrap gap-2">
                      {(featured.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[#666141] border border-[#666141]/30 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
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
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {featured.readTime || 5} min read
                        </span>
                        <span>
                          {featured.author || "Malani Impex"}
                        </span>
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
                {rest.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

const BlogCard = ({ blog }) => (
  <Link
    href={`/blog/${blog.slug}`}
    className="group flex flex-col overflow-hidden rounded-sm border border-[#666141]/10 hover:border-[#666141]/30 transition-all duration-300 bg-[#FFFEF5] hover:shadow-md"
  >
    {/* Cover Image */}
    <div className="relative aspect-[16/10] overflow-hidden bg-[#E9E4B5]/30">
      {blog.coverImage?.url ? (
        <Image
          src={blog.coverImage.url}
          alt={blog.coverImage.alt || blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9E4B5] to-[#d9d4a5]">
          <BookOpen size={40} className="text-[#666141]/30" />
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 p-6 flex flex-col gap-3">
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(blog.tags || []).slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-[#666141] border border-[#666141]/30 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl text-black font-normal leading-snug group-hover:text-[#666141] transition-colors duration-300 line-clamp-2">
        {blog.title}
      </h3>

      {blog.excerpt && (
        <p className="text-sm text-black/65 leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#666141]/10 mt-auto">
        <div className="flex items-center gap-3 text-xs text-black/50">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {blog.readTime || 5} min
          </span>
          <span>{blog.author || "Malani Impex"}</span>
        </div>
        <ArrowRight size={14} className="text-[#666141]" />
      </div>
    </div>
  </Link>
);

export default BlogPage;
