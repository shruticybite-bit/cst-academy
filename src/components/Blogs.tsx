import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Blogs = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isPointerDownRef = useRef(false);

  // ✅ Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/services/blogs`
        );
        const blogData = res.data?.data || res.data;
        setBlogs(blogData);
      } catch (error) {
        console.error("Blog API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Scroll Buttons Check
  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();

    return () => el.removeEventListener("scroll", checkScrollButtons);
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [blogs]);

  // ✅ Arrow Scroll
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Drag Logic
  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current || e.button !== 0) return;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;

    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || !scrollRef.current) return;

    const delta = e.clientX - dragStartXRef.current;

    if (Math.abs(delta) > 5) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      scrollRef.current.scrollLeft =
        dragStartScrollLeftRef.current - delta;
    }
  };

  const endDrag = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
  };

  // ✅ AUTO SCROLL
  useEffect(() => {
    if (!scrollRef.current || blogs.length === 0) return;

    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: clientWidth * 0.8,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [blogs]);

  // ✅ Pause Auto Scroll
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const startAutoScroll = () => {
    if (!scrollRef.current) return;

    stopAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: clientWidth * 0.8,
          behavior: "smooth",
        });
      }
    }, 4000);
  };

  return (
    <section className="py-1 md:py-1 relative z-20">
      {/* Header */}
      <div className="container px-6 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-6xl font-bold text-white">
            Blogs
          </h2>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white"
              >
                <ChevronRight />
              </button>
            </div>

            <Link
              to="/blog"
              className="text-wrlds-blue font-bold hover:text-white"
            >
              View All →
            </Link>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto scrollbar-hide scroll-smooth select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="flex gap-6 px-6 md:px-20">
          {loading ? (
            <p className="text-white">Loading blogs...</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative flex-shrink-0 w-[85vw] md:w-[600px] aspect-[1.5] rounded-3xl overflow-hidden"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="px-3 py-1 bg-wrlds-blue text-white text-xs rounded-md mb-3 w-fit">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {blog.title}
                  </h3>

                  <div
                    className="text-white/70 text-sm line-clamp-2 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: blog.excerpt,
                    }}
                  />

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-wrlds-blue"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;