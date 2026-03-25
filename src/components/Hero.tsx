import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Content Layer */}
      <div className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none py-32">
        <div className="relative mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] font-bold font-space tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[0.9]"
          >
            Secure the Future. 
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] font-bold font-space tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-wrlds-blue to-wrlds-blue/50 leading-[0.9]"
          >
          Build Your Cybersecurity Career.  
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-2xl font-light text-wrlds-muted max-w-7xl mx-auto mb-16 leading-relaxed text-center px-6"
        >
          CST Academy is a premier cybersecurity training institute delivering hands-on, industry-aligned programs for students, working professionals, and corporate teams.
Train on real tools, learn from experienced security professionals, and become job-ready for today’s high-demand cybersecurity roles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
        >
          <a
            href="#services"
            className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-wrlds-blue hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,204,0.6)]"
          >
            <span className="relative flex items-center gap-3">
              Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="group px-10 py-5 bg-white/15 border border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/25 transition-all duration-300 flex items-center gap-2"
           onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
          >
            Book Free Career
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 z-20"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </div>

      {/* Visual Bridge Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-wrlds-dark to-transparent z-20 pointer-events-auto"></div>
    </section>
  );
};

export default Hero;