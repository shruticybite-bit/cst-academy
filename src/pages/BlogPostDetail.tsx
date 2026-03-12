import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import EnhancedBlogContent from "@/components/EnhancedBlogContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";
import Safe3D from "@/components/Safe3D";

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
  </div>
);

const BlogPostDetail = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch single blog by slug
  useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `https://cst-acadmay-backend.onrender.com/api/services/detail/${slug}`
      );

      console.log("API RESPONSE:", res.data); // Debug

      // ✅ Important Fix
      setPost(res.data.data);

    } catch (error) {
      console.error("Error fetching blog:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    fetchPost();
  }
}, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="text-center text-white py-20 text-xl">
          Loading blog...
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Post Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
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
        description={post.excerpt}
        imageUrl={post.imageUrl}
        type="article"
        publishDate={
          post.createdAt
            ? new Date(post.createdAt).toISOString()
            : undefined
        }
        author={post.author || "WRLDS Team"}
        category={post.category}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <article className="relative z-10 w-full">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center overflow-hidden">
          {post.imageUrl && (
  <div className="absolute inset-0">
    <img
      src={post.imageUrl}
      alt={post.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50"></div>
  </div>
)}

          <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
            <div className="max-w-4xl">
              <Link
                to="/blog"
                className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>

              {/* Category */}
              {post.category && (
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-wrlds-blue/20 text-wrlds-blue rounded-full text-xs font-semibold uppercase tracking-wider border border-wrlds-blue/30">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt (HTML safe render) */}
              {post.excerpt && (
                <div
                  className="text-lg text-white/70 mb-8"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
                {post.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author || "WRLDS Team"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wrlds-dark to-transparent"></div>
        </div>

        {/* Full Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div
  className="prose prose-invert max-w-none"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPostDetail;