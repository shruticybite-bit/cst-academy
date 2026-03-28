import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import ThreeBackground from "@/components/ThreeBackground";
import Safe3D from "@/components/Safe3D";
import axios from "axios";

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
  </div>
);

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 API Call
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/services/case-studies"
        );

        if (res.data.success) {
          setCases(res.data.data);
        } else {
          setError("No case studies found");
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Case Studies - CST Academy" 
        description="Explore our deployed IoT and smart textile solutions."
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        <div className="container px-6">

          {/* Back */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-wrlds-muted hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Case <span className="text-wrlds-blue">Studies</span>
          </h1>

          {/* ===================== */}
          {/* 🔄 STATES */}
          {/* ===================== */}

          {loading && (
            <p className="text-white">Loading case studies...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {/* ===================== */}
          {/* 📦 GRID */}
          {/* ===================== */}

          {!loading && !error && cases.length === 0 && (
            <p className="text-white">No case studies found</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item) => (
              <Link
                key={item._id}
                to={`/case-study/${item.slug}`} // 🔥 dynamic route
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-wrlds-blue/50 transition"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">

                  {/* Category */}
                  <span className="px-3 py-1 bg-wrlds-blue text-white text-xs rounded-md w-fit mb-2">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-wrlds-blue">
                    {item.title}
                  </h3>

                  {/* Excerpt (HTML safe render) */}
                  <div
                    className="text-white/70 text-sm line-clamp-2 mb-3"
                    dangerouslySetInnerHTML={{ __html: item.excerpt }}
                  />

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white text-sm font-bold">
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Cases;