
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import axios from "axios";

const Navbar = () => {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchNavbarCategories = async () => {
    try {
      const res = await axios.get(
        "https://cst-acadmay-backend.onrender.com/api/services/navbar-categories",
        {
          params: { type: "course" },
        }
      );

      if (res.data.success) {
        setCategories(res.data.data);
      } else {
        setCategories([]);
      }

    } catch (error) {
      console.error("Navbar category error:", error);
      setCategories([]);
    }
  };

  fetchNavbarCategories();
}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "shadow-sm" : "")} initial={{
      opacity: 1,
      y: 0
    }} animate={{
      opacity: 1,
      y: 0
    }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
           <Link to="/" className="flex items-center">
  <img
    src="/logo/cst-academy-logo.png"
    alt="WRLDS Technologies Logo"
    className={cn(
      "h-14 md:h-16 w-auto object-contain transition-all duration-300 mt-10 rounded-xl overflow-hidden mt-10",
      isScrolled ? "bg-white" : "bg-white"
    )}
  />
</Link>


          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                  <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    Courses
                  </NavigationMenuTrigger>
                 
                  <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] max-h-[400px] overflow-y-auto">

                    {!categories || categories.length === 0 ? (
                      <li className="text-gray-400 text-sm">
                        No Categories Available
                      </li>
                    ) : (
                      categories.map((item) => (
                        <li key={item.category}>
                          <Link
                            to={`/projects/services?type=course&category=${encodeURIComponent(
                              item.category
                            )}`}
                            className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            {/* Category Name */}
                            <div className="font-medium text-gray-100 hover:text-black transition-colors">
                              {item.category}
                            </div>

                            {/* Excerpt */}
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {item.excerpt
                                ?.replace(/<[^>]+>/g, "")
                                .slice(0, 80)}...
                            </p>
                          </Link>
                        </li>
                      ))
                    )}

                  </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/cases">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Case Studies
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>                
                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Blogs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
              
                
                <NavigationMenuItem>
                  <a href="/contacts-us">
                  <button className={cn("px-4 py-2 rounded-md transition-colors", isScrolled ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600")}>
                    Contact Us
                  </button>
                  </a>
                  
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Reduced height and simplified */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80", isScrolled ? "bg-white" : "bg-black")}>
          <Link to="/#services" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Services
          </Link>
           <Link to="/cases" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
           Case Studies
          </Link>
           <Link to="/blog" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Blogs
          </Link>
          <Link to="/about" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
           About
          </Link>
        <a href="/contacts-us">
        <button className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 bg-gray-200 hover:bg-gray-300" : "text-white bg-gray-700 hover:bg-gray-600")}>
            Contact Us
          </button>
        </a>
          
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
