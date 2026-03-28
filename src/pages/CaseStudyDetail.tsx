import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  createdAt?: string;
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) {
          setError("Invalid URL");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://cst-acadmay-backend.onrender.com/api/services/detail/${slug}`
        );

        if (res.data?.success && res.data?.data) {
          setPost(res.data.data);
        } else {
          setError("Case study not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load case study");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // ✅ Format Date
  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =====================
  // 🔄 STATES
  // =====================

  if (loading) {
    return (
      <PageLayout>
        <div className="text-center py-20 text-white">
          Loading case study...
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <div className="text-center py-20 text-white">
          <h1 className="text-3xl font-bold mb-4">
            {error || "Case Study Not Found"}
          </h1>

          <Link to="/case-studies">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`${post.title} - CST Academy`}
        description={post.excerpt?.replace(/<[^>]+>/g, "")}
        imageUrl={post.imageUrl}
        publishDate={post.date || post.createdAt}
        author={post.author || "CST Academy"}
        category={post.category}
        type="article"
      />

      <article className="relative z-10 w-full">

        {/* HERO */}
        <div className="relative min-h-[80vh] flex items-center">

          {post.imageUrl && (
            <div className="absolute inset-0">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          )}

          <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 max-w-4xl">

            <Link
              to="/case-studies"
              className="inline-flex items-center text-white/60 hover:text-white mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>

            <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs uppercase">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-6">
              {post.title}
            </h1>

            {/* excerpt HTML clean */}
            <div
              className="text-xl text-white/70 mb-6"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />

            <div className="flex gap-6 text-white/50 text-sm">
              <span>{formatDate(post.date || post.createdAt)}</span>
              <span>{post.author || "CST Academy"}</span>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-6 py-16 max-w-3xl">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

      </article>
    </PageLayout>
  );
};

export default CaseStudyDetail;