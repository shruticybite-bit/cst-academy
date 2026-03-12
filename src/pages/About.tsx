import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import PageLayout from "@/components/PageLayout";
import ThreeBackground from "@/components/ThreeBackground";
import Safe3D from "@/components/Safe3D";

/* ---------------- TEAM CARD ---------------- */

interface TeamCardProps {
  name: string
  role: string
  description: string
  image: string
  category: string
}

const TeamCard = ({ name, role, description, image, category }: TeamCardProps) => {
  return (

    <motion.div
      whileHover={{ y: -12, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
    >

      {/* Image */}

      <div className="relative aspect-[4/3] overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <span className="absolute top-3 left-3 text-xs px-3 py-1 bg-black/60 rounded-full text-white backdrop-blur">
          {category}
        </span>

      </div>

      {/* Info */}

      <div className="p-6 text-center">

        <h3 className="text-lg font-semibold text-white">
          {name}
        </h3>

        <p className="text-wrlds-blue text-sm">
          {role}
        </p>

        <p className="text-gray-300 text-sm mt-3">
          {description}
        </p>

      </div>

    </motion.div>

  )
}

/* ---------------- BACKGROUND ---------------- */

const FallbackBackground = () => (
  <div className="absolute inset-0 bg-wrlds-dark overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wrlds-blue/10 rounded-full blur-[150px] animate-pulse"></div>
  </div>
)

/* ---------------- ABOUT PAGE ---------------- */

const About = () => {

  const teams = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Cyber Security Trainer",
      description:
        "Specializes in ethical hacking, penetration testing and cybersecurity training.",
      image: "/teams/1.jfif",
      category: "Cybersecurity"
    },
    {
      id: 2,
      name: "Amit Verma",
      role: "Ethical Hacker",
      description:
        "Focused on vulnerability assessment and real-world attack simulations.",
      image: "/teams/2.jfif",
      category: "Tools"
    },
    // {
    //   id: 3,
    //   name: "Neha Singh",
    //   role: "Security Analyst",
    //   description:
    //     "Works on threat monitoring, incident response and infrastructure defense.",
    //   image: "/teams/3.jfif",
    //   category: "Defense"
    // }
  ]

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef
  })

  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (

    <PageLayout>

      {/* Background */}

      <div className="fixed inset-0 z-0">
        <Safe3D fallback={<FallbackBackground />}>
          <ThreeBackground />
        </Safe3D>
      </div>

      <div ref={containerRef} className="relative z-10 text-white min-h-screen">

        {/* HERO */}

        <section className="relative h-[80vh] flex items-center justify-center">

          <div className="absolute inset-0 bg-black/40"></div>

          <motion.div
            style={{ opacity: opacityHero }}
            className="container relative z-20 text-center px-6"
          >

            <Link
              to="/"
              className="inline-flex items-center text-white/60 hover:text-white mb-8 transition group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              Modern Hackers for{" "}
              <span className="text-wrlds-blue">
                a Modern World
              </span>
            </h1>

          </motion.div>

        </section>

        {/* CONTENT */}

        <div className="max-w-7xl mx-auto px-6 py-24 -mt-20">

          {/* MISSION */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-card p-12 rounded-3xl mb-32 border-white/10"
          >

            <div className="grid md:grid-cols-2 gap-12 items-center">

              <div>

                <h2 className="text-4xl font-bold mb-6">
                  Our Mission
                </h2>

                <div className="h-1 w-20 bg-wrlds-blue mb-8"></div>

                <p className="text-xl text-wrlds-muted mb-6">
                  At CST Academy, our mission is to empower the next generation of ethical hackers by providing practical, real-world cybersecurity education.
                </p>

                <p className="text-white/70">
                  We believe the future belongs to skilled security professionals who understand how systems work, think like attackers, and defend digital infrastructure. Through hands-on training and industry-focused learning, we aim to build a community of ethical hackers ready to secure the connected world.
                </p>

              </div>

              <img
                src="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />

            </div>

          </motion.div>


          {/* TRINITY */}

          <div className="mb-32">

            <h2 className="text-5xl font-bold text-center mb-16">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrlds-blue to-white">Trinity</span> of Cybersecurity
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                {
                  title: "Offensive Security",
                  desc: "Ethical hacking, penetration testing, vulnerability research, and real-world attack simulations."
                },
                {
                  title: "Security Intelligence",
                  desc: "Threat analysis, malware research, OSINT, and advanced cyber defense strategies."
                },
                {
                  title: "Cyber Defense",
                  desc: "Security monitoring, incident response, and protecting digital infrastructures at scale."
                }
              ].map((pillar, i) => (

                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >

                  <h3 className="text-2xl font-bold mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-gray-300">
                    {pillar.desc}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>


          {/* TEAM */}

          <div>

            <h2 className="text-4xl font-bold text-center mb-16">
              Our <span className="text-wrlds-blue">Cyber Experts</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

              {teams.map((member) => (
                <TeamCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  image={member.image}
                  category={member.category}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </PageLayout>

  )
}

export default About