"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API}/blogs/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API}/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog deleted");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (blog, field) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API}/blogs/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: !blog[field] }),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) =>
          prev.map((b) => (b._id === blog._id ? data.data : b))
        );
        toast.success(`${field === "active" ? "Visibility" : "Featured"} updated`);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#666141]" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-normal text-black">Blog Posts</h1>
          <p className="text-sm text-black/50 mt-1">{blogs.length} total posts</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-[#666141] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#555135] transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Table */}
      {blogs.length === 0 ? (
        <div className="text-center py-32 text-black/40">
          No blog posts yet.{" "}
          <Link href="/admin/blogs/create" className="text-[#666141] underline">
            Create one
          </Link>
        </div>
      ) : (
        <div className="border border-[#666141]/10 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#666141]/5 border-b border-[#666141]/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-black/70">Post</th>
                <th className="text-left px-4 py-3 font-medium text-black/70 hidden md:table-cell">Tags</th>
                <th className="text-left px-4 py-3 font-medium text-black/70 hidden lg:table-cell">Published</th>
                <th className="text-center px-4 py-3 font-medium text-black/70">Active</th>
                <th className="text-center px-4 py-3 font-medium text-black/70">Featured</th>
                <th className="text-right px-4 py-3 font-medium text-black/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr
                  key={blog._id}
                  className={`border-b border-[#666141]/5 hover:bg-[#666141]/3 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-[#FFFEF5]"
                  }`}
                >
                  {/* Post info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded overflow-hidden bg-[#E9E4B5]/30 flex-shrink-0 relative">
                        {blog.coverImage?.url ? (
                          <Image
                            src={blog.coverImage.url}
                            alt={blog.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#666141]/30 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-black truncate max-w-[200px]">
                          {blog.title}
                        </p>
                        <p className="text-xs text-black/40 truncate max-w-[200px]">
                          /{blog.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Tags */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(blog.tags || []).slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] border border-[#666141]/30 text-[#666141] px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-black/50 hidden lg:table-cell">
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </td>
                  {/* Active toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(blog, "active")}
                      title={blog.active ? "Hide post" : "Show post"}
                      className={`mx-auto flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        blog.active
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {blog.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </td>
                  {/* Featured toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(blog, "featured")}
                      title={blog.featured ? "Unfeature" : "Feature this post"}
                      className={`mx-auto flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        blog.featured
                          ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <Star size={14} />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${blog._id}`}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#666141]/10 text-[#666141] hover:bg-[#666141]/20 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id, blog.title)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
