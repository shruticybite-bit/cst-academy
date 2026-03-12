import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
}

const Services = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const category = searchParams.get("category");

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (!type || !category) return;

        const response = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/services/by-type-category",
          {
            params: { type, category },
          }
        );

        if (response.data.success) {
          setServices(response.data.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [type, category]);

  return (
    <PageLayout>
      <SEO
        title={`${category || "Projects"} - CST Academy`}
        description={`Explore ${category || ""} ${type || ""} programs and insights.`}
      />

      <div className="bg-gradient-to-b from-[#0b0f1a] via-[#0e1424] to-black text-white">

        {/* HERO */}
        <section className="relative w-full aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] flex items-center justify-center text-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Cyber Security Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 max-w-4xl px-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              {category}
            </h1>
            <p className="mt-6 text-gray-300">
              Enterprise-grade protection powered by AI-driven systems.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-24 px-6 bg-[#0c1220]">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {type === "course" ? "Courses" : "Insights"}
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">
              Loading...
            </div>
          ) : services.length === 0 ? (
            <div className="text-center text-gray-400">
              No data found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500 transition group"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4">
                      {item.excerpt?.replace(/<[^>]+>/g, "")}
                    </p>

                    <Link
                      to={`/course-detail/${item.slug}`}
                      className="text-blue-400 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default Services;