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
}

const CoursePostDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/services/detail/${slug}`
        );

        if (response.data.success) {
          setPost(response.data.data);
        } else {
          setPost(null);
        }

      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="text-center py-20">Loading...</div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`${post.title} - WRLDS`}
        description={post.excerpt}
        imageUrl={post.imageUrl}
        publishDate={post.date}
        author={post.author}
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
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 max-w-4xl">

            <Link
              to="/blog"
              className="inline-flex items-center text-white/60 hover:text-white mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>

            <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs uppercase">
              {post.category}
            </span>

            <h1 className="text-5xl font-bold text-white mt-6 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-white/70 mb-6">
              {post.excerpt}
            </p>

            <div className="flex gap-6 text-white/50 text-sm">
              <span>{post.date}</span>
              <span>{post.author}</span>
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

export default CoursePostDetail;