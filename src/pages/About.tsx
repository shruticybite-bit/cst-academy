import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ThreeBackground from '@/components/ThreeBackground';
import Safe3D from '@/components/Safe3D';

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse-slow"></div>
  </div>
);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax transforms
  const yHero = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <PageLayout>
      {/* Global starfield background */}
      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <div ref={containerRef} className="relative z-10 text-white min-h-screen">

        {/* Hero Section with Parallax Background */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Removed background image - now uses global starfield */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          <motion.div
            style={{ opacity: opacityHero }}
            className="container relative z-20 text-center px-6"
          >
            <Link to="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <h1 className="text-6xl md:text-8xl font-bold font-space mb-6 tracking-tighter">
              Modern Hackers for <span className="text-wrlds-blue">a Modern World</span> .
            </h1>
            {/* <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
              Architects of the connected age.
            </p> */}
          </motion.div>

          {/* Fade to content */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-wrlds-dark to-transparent z-20"></div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-6 py-24 relative z-30 -mt-20">

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-3xl mb-32 border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
                <div className="h-1 w-20 bg-wrlds-blue mb-8"></div>
                <p className="text-xl text-wrlds-muted leading-relaxed mb-6">
                  At CST Academy, our mission is to empower the next generation of ethical hackers by providing practical, real-world cybersecurity education.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  We believe the future belongs to skilled security professionals who understand how systems work, think like attackers, and defend digital infrastructure. Through hands-on training and industry-focused learning, we aim to build a community of ethical hackers ready to secure the connected world.
                </p>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                <img src="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png" alt="Mission" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-wrlds-blue/20 mix-blend-overlay"></div>
              </div>
            </div>
          </motion.div>

          {/* The Pillars - Horizontal Scroll/Grid */}
          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-6xl font-bold text-center mb-16"
            >
              The  
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrlds-blue to-white">Trinity</span> of Cybersecurity
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Offensive Security", desc: "Ethical hacking, penetration testing, vulnerability research, and real-world attack simulations.", delay: 0 },
                { title: "Security Intelligence", desc: "Threat analysis, malware research, OSINT, and advanced cyber defense strategies.", delay: 0.2 },
                { title: "Cyber Defense", desc: "Security monitoring, incident response, and protecting digital infrastructures at scale.", delay: 0.4 }
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: pillar.delay, duration: 0.6 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                >
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-wrlds-blue transition-colors">{pillar.title}</h3>
                  <p className="text-wrlds-muted">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-32">
            <h2 className="text-4xl font-bold mb-12 text-center">Meet the Visionaries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Felix von Heland",
                  role: "CEO & Founder",
                  email: "felix@wrlds.com",
                  image: "/lovable-uploads/aa5291bd-2417-4c1e-9a02-0bcc71a92507.png"
                },
                {
                  name: "Niek Bijman",
                  role: "Software Lead",
                  email: null,
                  image: "/lovable-uploads/e502f601-c519-43a8-86f5-5fa89ae50d2f.png"
                },
                {
                  name: "Chengjie Li",
                  role: "Hardware Lead",
                  email: null,
                  image: "/lovable-uploads/3de85ddd-15e1-4216-9697-f91abb9a47ce.png"
                },
                {
                  name: "Love Anderberg",
                  role: "COO",
                  email: "love@wrlds.com",
                  image: "/lovable-uploads/a9bb9110-964a-43b0-a5ab-7162140cd133.png"
                }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-xl aspect-[3/4]"
                >
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-wrlds-blue text-sm font-bold uppercase tracking-wider">{member.role}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-white/70 hover:text-white text-sm mt-1 transition-colors">
                        {member.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
