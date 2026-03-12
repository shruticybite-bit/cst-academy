import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import BlogPostCard from "@/components/BlogPostCard";
import ThreeBackground from "@/components/ThreeBackground";
import Safe3D from "@/components/Safe3D";

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
  </div>
);

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/services/blogs"
        );

        // Sort newest first
        const sortedBlogs = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setBlogPosts(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <PageLayout>
      <SEO
        title="CST Academy - News and insights about smart textile technology"
        description="Stay updated with the latest news and insights about sensor-integrated textiles and smart technology from WRLDS Technologies."
        imageUrl={featuredPost?.imageUrl}
        keywords={[
          "smart textiles",
          "textile technology",
          "industry news",
          "sensor innovation",
          "wearable tech",
          "smart fabrics",
        ]}
        type="website"
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <div className="relative z-10 w-full pt-24 pb-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-space mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-300">
            The latest trends and news in sensor-integrated textiles and smart
            technology
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center text-white text-xl">
            Loading blogs...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Blog */}
            {featuredPost && (
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="col-span-1 md:col-span-2 lg:col-span-3"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="grid md:grid-cols-2 h-full">
                    <div
                      className="bg-cover bg-center h-64 md:h-full p-8 flex items-center justify-center"
                      style={{
                        backgroundImage: `url('${featuredPost.imageUrl}')`,
                      }}
                    >
                      <div className="text-white text-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium inline-block mb-4">
                          Featured
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                          {featuredPost.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <p className="text-gray-500 text-sm mb-2">
                        Published:{" "}
                        {featuredPost.createdAt
                          ? new Date(
                              featuredPost.createdAt
                            ).toLocaleDateString()
                          : "Recently"}
                      </p>

                      {/* Render HTML excerpt safely */}
                      <div
                        className="text-gray-700 mb-6 line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: featuredPost.excerpt,
                        }}
                      />

                      <Button variant="outline" className="group">
                        Read more
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Other Blogs */}
            {otherPosts.map((post) => (
              <BlogPostCard
                key={post._id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                date={
                  post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "Recently"
                }
                slug={post.slug}
                category={post.category}
              />
            ))}

            {/* Empty State */}
            {blogPosts.length === 0 && (
              <div className="text-white text-center col-span-3">
                No blogs available
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Blog;