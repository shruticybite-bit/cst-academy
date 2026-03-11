
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TechDetails from "./pages/TechDetails";
import DevelopmentProcess from "./pages/DevelopmentProcess";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import CoursePostDetail from "./pages/CoursePostDetail";
import Cases from "./pages/Cases";
import Services from "./pages/Services";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import AdminLogin from "./pages/admin/LoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorkshopPage from "./pages/admin/AdminWorkshopPage";
import AdminContactPage from "./pages/admin/AdminContactPage";
import AdminServices from "./pages/admin/AdminServices";
import CMSPopupSetting from "./pages/admin/CMSPopupSetting";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <Cursor />
      <div className="noise-overlay"></div>
      <TooltipProvider>
        <Toaster />
        <Sonner /> 
        <BrowserRouter> 
          <Routes>  
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/launch/dashboard" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="workshop" element={<AdminWorkshopPage />} />
              <Route path="cms-popup-setting" element={<CMSPopupSetting />} />
              <Route path="contacts" element={<AdminContactPage />} />
              <Route path="services" element={<AdminServices />} />
            </Route>
            <Route path="/projects/services" element={<Services />} />
            <Route path="/tech-details" element={<TechDetails />} />
            <Route path="/development-process" element={<DevelopmentProcess />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/course-detail/:slug" element={<CoursePostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
