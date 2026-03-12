import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ThreeBackground from '@/components/ThreeBackground';
import Safe3D from '@/components/Safe3D';
import { projects } from '@/data/projects';

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
  </div>
);

const Cases = () => {
  return (
    <PageLayout>
      <SEO 
        title="Case Studies - CST Academy" 
        description="Explore our deployed IoT and smart textile solutions across industries including defense, sports, leisure, and manufacturing."
        imageUrl="/lovable-uploads/93ab0638-8190-4ccf-897f-21fda7f4f5ad.png"
        keywords={['case studies', 'IoT projects', 'smart textiles', 'connected products', 'hardware projects']}
      />
      
      {/* Star background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>
      
      <div className="relative z-10 pt-32 pb-24">
        <div className="container px-6">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-wrlds-muted hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Header */}
          <h1 className="text-4xl md:text-6xl font-bold font-space text-white mb-4 tracking-tight">
            Case <span className="text-wrlds-blue">Studies</span>
          </h1>
          <p className="text-wrlds-muted text-lg mb-12 max-w-2xl">
            Explore our deployed solutions across industries. Each project represents our commitment to building connected products that make a real difference.
          </p>
          
          {/* Grid of cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map(project => (
              <Link 
                key={project.id} 
                to={project.link}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-wrlds-blue/50 transition-all duration-500"
              >
                {/* Image */}
                <img 
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="px-3 py-1 bg-wrlds-blue text-white text-xs font-bold uppercase tracking-wider rounded-md">
                      {project.brand}
                    </span>
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-md backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl font-bold font-space text-white mb-2 group-hover:text-wrlds-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-white font-bold text-sm group/link">
                    View Case Study 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
