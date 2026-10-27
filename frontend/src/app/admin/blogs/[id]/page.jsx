"use client";
import { useState, useEffect } from "react";
import BlogForm from "@/components/admin/BlogForm";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EditBlogPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${API}/blogs/admin/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setBlog(data.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#666141]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-8 text-center text-black/50">Blog post not found.</div>
    );
  }

  return <BlogForm initialData={blog} blogId={params.id} />;
}
