import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string;
}

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // =====================
  // 🔥 API CALL
  // =====================
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(
          "https://cst-acadmay-backend.onrender.com/api/services/case-studies"
        );

        if (res.data?.success) {
          setCases(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch cases", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // =====================
  // SCROLL LOGIC
  // =====================
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  // =====================
  // DRAG LOGIC
  // =====================
  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current || e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (target?.closest("a,button")) return;

    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = scrollRef.current.scrollLeft;
    hasDraggedRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;

    const delta = e.clientX - dragStartXRef.current;

    if (!hasDraggedRef.current && Math.abs(delta) > 6) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      scrollRef.current.scrollLeft =
        dragStartScrollLeftRef.current - delta;
    }
  };

  const endDrag = () => {
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 0);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24 relative z-20">
      {/* Header */}
      <div className="container px-6 mb-6 md:mb-12">
        <h2 className="text-3xl md:text-6xl font-bold text-white">
          Case <span className="text-wrlds-blue">Studies</span>
        </h2>

        <div className="flex justify-between items-center">
          <p className="text-wrlds-muted">
            Explore our deployed solutions
          </p>

          <div className="flex items-center gap-3">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft}>
              <ChevronLeft />
            </button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight}>
              <ChevronRight />
            </button>

            <Link to="/case-studies" className="text-wrlds-blue">
              View All →
            </Link>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 🔄 STATES */}
      {/* ===================== */}
      {loading && (
        <p className="text-center text-white">Loading...</p>
      )}

      {/* ===================== */}
      {/* CAROUSEL */}
      {/* ===================== */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto flex gap-6 px-6 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {cases.map((item) => (
          <div
            key={item._id}
            className="min-w-[300px] md:min-w-[500px] relative rounded-2xl overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
              <span className="text-xs text-blue-400 mb-1">
                {item.category}
              </span>

              <h3 className="text-white text-xl font-bold">
                {item.title}
              </h3>

              <Link
                to={`/case-study/${item.slug}`}
                className="text-white mt-2 flex items-center gap-2"
                onClick={(e) => hasDraggedRef.current && e.preventDefault()}
              >
                View Case Study <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <Link
          to="/cases"
          className="min-w-[250px] flex items-center justify-center bg-wrlds-blue text-white rounded-xl"
        >
          View All →
        </Link>
      </div>
    </section>
  );
};

export default Projects;