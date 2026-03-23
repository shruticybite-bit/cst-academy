import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
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
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Detail API (slug)
        const detailRes = await axios.get(
          `https://cst-acadmay-backend.onrender.com/api/services/detail/${slug}`
        );

        const currentPost = detailRes.data.data;
        setPost(currentPost);

        // ✅ Blog List API (sidebar)
        const listRes = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/services/blogs"
        );

        const sorted = listRes.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const filtered = sorted.filter(
          (item) => item.slug !== slug
        );

        setBlogPosts(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);
console.log('blogPosts=',blogPosts);
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
        author={post.author || ""}
        category={post.category}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <article className="relative z-10 w-full">
        {/* HERO */}
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
                className="inline-flex items-center text-white/60 hover:text-white mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>

              {post.category && (
                <span className="inline-block px-4 py-1.5 bg-wrlds-blue/20 text-wrlds-blue rounded-full text-xs mb-4">
                  {post.category}
                </span>
              )}

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>

              {post.excerpt && (
                <div
                  className="text-lg text-white/70 mb-6"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}

              <div className="flex gap-6 text-white/50 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>

                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author || ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-1 sticky top-24 h-fit">
              <h3 className="text-xl font-semibold text-white mb-6">
                Latest Blogs
              </h3>

              <div className="space-y-6">
                {blogPosts.map((item) => (
                  <Link to={`/blog/${item.slug}`} key={item._id}>
                    <div className="flex gap-4 bg-white/5 hover:bg-white/10 transition p-3 rounded-lg">

                      {/* IMAGE */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />

                      {/* TEXT */}
                      <div className="flex flex-col justify-between">

                        <h4 className="text-white text-sm font-semibold line-clamp-2">
                          {item.title}
                        </h4>

                        <p className="text-gray-400 text-xs line-clamp-2">
                          {item.excerpt?.replace(/<[^>]+>/g, "")}
                        </p>

                        <span className="text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {blogPosts.length === 0 && (
                <div className="text-gray-400 text-center">
                  No blogs available
                </div>
              )}
            </div>

          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPostDetail;