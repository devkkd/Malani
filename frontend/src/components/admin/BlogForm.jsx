"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Upload, X, Plus, Eye } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

// Auto-generate slug from title
const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Estimate read time from HTML content (~200 words/min)
const estimateReadTime = (html) => {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "Malani Impex",
  tags: [],
  category: "",
  readTime: 5,
  featured: false,
  active: true,
  coverImage: { url: "", alt: "" },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    schemaMarkup: "",
    canonicalUrl: "",
    ogImage: "",
  },
  publishedAt: new Date().toISOString().slice(0, 10),
};

export default function BlogForm({ initialData = null, blogId = null }) {
  const router = useRouter();
  const isEditing = !!blogId;

  const [form, setForm] = useState(
    initialData
      ? {
          ...EMPTY_FORM,
          ...initialData,
          tags: initialData.tags || [],
          publishedAt: initialData.publishedAt
            ? new Date(initialData.publishedAt).toISOString().slice(0, 10)
            : EMPTY_FORM.publishedAt,
          seo: { ...EMPTY_FORM.seo, ...(initialData.seo || {}) },
          coverImage: initialData.coverImage || { url: "", alt: "" },
        }
      : EMPTY_FORM
  );

  const [tagInput, setTagInput] = useState("");
  const [kwInput, setKwInput] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // content | seo | preview

  // ── Field helpers ────────────────────────────────────────────
  const set = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const setSeo = (key, value) =>
    setForm((p) => ({ ...p, seo: { ...p.seo, [key]: value } }));

  const handleTitleChange = (val) => {
    setForm((p) => ({
      ...p,
      title: val,
      slug: p.slug === toSlug(p.title) || p.slug === "" ? toSlug(val) : p.slug,
    }));
  };

  const handleContentChange = (val) => {
    setForm((p) => ({
      ...p,
      content: val,
      readTime: estimateReadTime(val),
    }));
  };

  // ── Tags & Keywords ──────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set("tags", [...form.tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (t) => set("tags", form.tags.filter((x) => x !== t));

  const addKeyword = () => {
    const k = kwInput.trim();
    if (k && !form.seo.keywords.includes(k)) {
      setSeo("keywords", [...form.seo.keywords, k]);
    }
    setKwInput("");
  };

  const removeKeyword = (k) =>
    setSeo(
      "keywords",
      form.seo.keywords.filter((x) => x !== k)
    );

  // ── Cover Image Upload ───────────────────────────────────────
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const token = localStorage.getItem("adminToken");
          const res = await fetch(`${API}/upload/image`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ image: reader.result, folder: "blogs" }),
          });
          const data = await res.json();
          if (data.success) {
            set("coverImage", {
              url: data.data.url,
              alt: form.title || "Blog cover image",
            });
            setSeo("ogImage", data.data.url);
            toast.success("Cover image uploaded");
          } else {
            toast.error(data.message || "Upload failed");
          }
        } catch {
          toast.error("Upload failed");
        } finally {
          setUploadingCover(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingCover(false);
      toast.error("Failed to read file");
    }
  };

  const removeCover = () => {
    set("coverImage", { url: "", alt: "" });
    setSeo("ogImage", "");
  };

  // ── Save ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.slug.trim()) return toast.error("Slug is required");
    if (!form.content.trim()) return toast.error("Content is required");

    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const url = isEditing ? `${API}/blogs/${blogId}` : `${API}/blogs`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          publishedAt: new Date(form.publishedAt).toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEditing ? "Blog updated!" : "Blog created!");
        router.push("/admin/blogs");
      } else {
        toast.error(data.message || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ── SEO char counters ────────────────────────────────────────
  const titleLen = form.seo.metaTitle.length;
  const descLen = form.seo.metaDescription.length;

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-normal text-black">
            {isEditing ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          <p className="text-sm text-black/50 mt-1">
            {isEditing ? `Editing: ${form.title}` : "Create a new blog post"}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-sm text-[#666141] hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-[#666141]/10">
        {["content", "seo", "preview"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#666141] text-[#666141]"
                : "text-black/50 hover:text-black"
            }`}
          >
            {tab === "seo" ? "SEO & Schema" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ═══════════════════════════════════════════
            TAB 1: CONTENT
        ═══════════════════════════════════════════ */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title…"
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] text-lg"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-[#666141]/20 rounded overflow-hidden focus-within:border-[#666141]">
                <span className="px-3 py-2.5 bg-[#666141]/5 text-black/40 text-sm border-r border-[#666141]/10">
                  /blog/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="my-blog-post"
                  className="flex-1 px-3 py-2.5 text-black bg-white focus:outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Excerpt{" "}
                <span className="text-black/40 font-normal">(shown in listings)</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="A short summary of the post…"
                rows={3}
                maxLength={500}
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] resize-none text-sm"
              />
              <p className="text-xs text-black/40 mt-1">{form.excerpt.length}/500</p>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Cover Image
              </label>
              {form.coverImage.url ? (
                <div className="relative w-full aspect-[16/7] max-w-lg rounded overflow-hidden bg-[#E9E4B5]/20">
                  <Image
                    src={form.coverImage.url}
                    alt="Cover preview"
                    fill
                    sizes="600px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 hover:bg-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center w-full max-w-lg aspect-[16/7] border-2 border-dashed border-[#666141]/20 rounded cursor-pointer hover:border-[#666141]/50 transition-colors bg-[#FFFEF5] ${
                    uploadingCover ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  <Upload size={28} className="text-[#666141]/40 mb-2" />
                  <span className="text-sm text-black/50">
                    {uploadingCover ? "Uploading…" : "Click to upload cover image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                </label>
              )}
              {form.coverImage.url && (
                <input
                  type="text"
                  value={form.coverImage.alt}
                  onChange={(e) =>
                    set("coverImage", { ...form.coverImage, alt: e.target.value })
                  }
                  placeholder="Image alt text"
                  className="mt-2 w-full max-w-lg border border-[#666141]/20 rounded px-3 py-2 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
              )}
            </div>

            {/* Content (HTML textarea) */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Content <span className="text-red-500">*</span>{" "}
                <span className="text-black/40 font-normal">(HTML supported)</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="<p>Write your blog content here...</p>"
                rows={18}
                className="w-full border border-[#666141]/20 rounded px-4 py-3 text-black bg-white focus:outline-none focus:border-[#666141] resize-y font-mono text-sm"
                required
              />
              <p className="text-xs text-black/40 mt-1">
                Estimated read time: {form.readTime} min
              </p>
            </div>

            {/* Row: Author + Category + Published Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  className="w-full border border-[#666141]/20 rounded px-3 py-2.5 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  placeholder="e.g. Craftsmanship"
                  className="w-full border border-[#666141]/20 rounded px-3 py-2.5 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Publish Date</label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => set("publishedAt", e.target.value)}
                  className="w-full border border-[#666141]/20 rounded px-3 py-2.5 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag and press Enter"
                  className="flex-1 border border-[#666141]/20 rounded px-3 py-2 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-[#666141]/10 text-[#666141] rounded text-sm hover:bg-[#666141]/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-xs border border-[#666141]/30 text-[#666141] px-3 py-1 rounded-full"
                  >
                    {t}
                    <button type="button" onClick={() => removeTag(t)}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Status toggles */}
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set("active", !form.active)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    form.active ? "bg-[#666141]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      form.active ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-sm text-black">Published (visible)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set("featured", !form.featured)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    form.featured ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      form.featured ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-sm text-black">Featured</span>
              </label>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 2: SEO & SCHEMA
        ═══════════════════════════════════════════ */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            {/* SERP Preview */}
            <div className="border border-[#666141]/10 rounded p-4 bg-white">
              <p className="text-xs text-black/40 mb-3 font-medium uppercase tracking-wider">
                SERP Preview
              </p>
              <p className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                {form.seo.metaTitle || form.title || "Page Title"}
              </p>
              <p className="text-green-700 text-xs my-0.5">
                https://www.malaniimpexinc.com/blog/{form.slug || "slug"}
              </p>
              <p className="text-sm text-black/60 line-clamp-2">
                {form.seo.metaDescription || form.excerpt || "Page description will appear here…"}
              </p>
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Meta Title
                <span
                  className={`ml-2 text-xs font-normal ${
                    titleLen > 60 ? "text-red-500" : "text-black/40"
                  }`}
                >
                  {titleLen}/70
                </span>
              </label>
              <input
                type="text"
                value={form.seo.metaTitle}
                onChange={(e) => setSeo("metaTitle", e.target.value)}
                placeholder="SEO title (leave blank to use post title)"
                maxLength={70}
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] text-sm"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Meta Description
                <span
                  className={`ml-2 text-xs font-normal ${
                    descLen > 150 ? "text-red-500" : "text-black/40"
                  }`}
                >
                  {descLen}/160
                </span>
              </label>
              <textarea
                value={form.seo.metaDescription}
                onChange={(e) => setSeo("metaDescription", e.target.value)}
                placeholder="SEO description (150–160 chars ideal)"
                rows={3}
                maxLength={160}
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] resize-none text-sm"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">Focus Keywords</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={kwInput}
                  onChange={(e) => setKwInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                  placeholder="Add keyword and press Enter"
                  className="flex-1 border border-[#666141]/20 rounded px-3 py-2 text-sm text-black bg-white focus:outline-none focus:border-[#666141]"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-[#666141]/10 text-[#666141] rounded text-sm hover:bg-[#666141]/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.seo.keywords.map((k) => (
                  <span
                    key={k}
                    className="flex items-center gap-1.5 text-xs border border-[#666141]/30 text-[#666141] px-3 py-1 rounded-full"
                  >
                    {k}
                    <button type="button" onClick={() => removeKeyword(k)}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Canonical URL{" "}
                <span className="text-black/40 font-normal">(optional override)</span>
              </label>
              <input
                type="url"
                value={form.seo.canonicalUrl}
                onChange={(e) => setSeo("canonicalUrl", e.target.value)}
                placeholder="https://www.malaniimpexinc.com/blog/my-post"
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] text-sm"
              />
            </div>

            {/* OG Image URL */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                OG Image URL{" "}
                <span className="text-black/40 font-normal">(auto-filled from cover)</span>
              </label>
              <input
                type="url"
                value={form.seo.ogImage}
                onChange={(e) => setSeo("ogImage", e.target.value)}
                placeholder="https://…"
                className="w-full border border-[#666141]/20 rounded px-4 py-2.5 text-black bg-white focus:outline-none focus:border-[#666141] text-sm"
              />
            </div>

            {/* JSON-LD Schema */}
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Custom JSON-LD Schema Markup
                <span className="text-black/40 font-normal ml-2">
                  (auto-generated if empty)
                </span>
              </label>
              <textarea
                value={form.seo.schemaMarkup}
                onChange={(e) => setSeo("schemaMarkup", e.target.value)}
                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  ...\n}'}
                rows={10}
                className="w-full border border-[#666141]/20 rounded px-4 py-3 text-black bg-white focus:outline-none focus:border-[#666141] resize-y font-mono text-xs"
              />
              <p className="text-xs text-black/40 mt-1">
                Leave blank to auto-generate BlogPosting schema from post data.
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 3: PREVIEW
        ═══════════════════════════════════════════ */}
        {activeTab === "preview" && (
          <div className="border border-[#666141]/10 rounded overflow-hidden">
            <div className="bg-[#666141]/5 px-4 py-2 text-xs text-black/40 flex items-center gap-2">
              <Eye size={12} /> Preview (rendered HTML)
            </div>
            <div className="p-6 md:p-10">
              {form.coverImage.url && (
                <div className="relative aspect-[16/9] w-full rounded overflow-hidden mb-8 bg-[#E9E4B5]/20">
                  <Image
                    src={form.coverImage.url}
                    alt={form.coverImage.alt || form.title}
                    fill
                    sizes="800px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {form.tags.map((t) => (
                  <span key={t} className="text-xs border border-[#666141]/30 text-[#666141] px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl text-black mb-3">{form.title || "Untitled"}</h1>
              <p className="text-sm text-black/40 mb-6">
                {form.author} · {form.readTime} min read
              </p>
              {form.excerpt && (
                <p className="text-lg text-black/70 italic border-l-2 border-[#666141] pl-5 mb-8">
                  {form.excerpt}
                </p>
              )}
              <div
                className="prose-malani"
                dangerouslySetInnerHTML={{ __html: form.content || "<p>No content yet…</p>" }}
              />
            </div>
          </div>
        )}

        {/* ── Save Button ── */}
        <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[#666141]/10">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#666141] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#555135] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : isEditing ? "Update Post" : "Publish Post"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-black/50 hover:text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
