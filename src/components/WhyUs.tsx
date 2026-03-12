import { motion } from "framer-motion";
import { Zap, Target, Rocket, ShieldCheck } from "lucide-react";

const reasons = [
    {
        icon: <Zap className="w-6 h-6 text-wrlds-blue" />,
        title: "Industry-driven, practical curriculum",
        description: "Industry-driven, practical curriculum.",
    },
    {
        icon: <Target className="w-6 h-6 text-white" />,
        title: "Trainers with real-world cybersecurity experience",
        description: "Trainers with real-world cybersecurity experience.",
    },
    {
        icon: <Rocket className="w-6 h-6 text-blue-300" />,
        title: "Hands-on labs and live tools",
        description: "Hands-on labs and live tools.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-wrlds-muted" />,
        title: "Career mentoring and placement support",
        description: "Career mentoring and placement support.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-wrlds-muted" />,
        title: "Affordable and flexible learning options",
        description: "Affordable and flexible learning options.",
    },
     {
        icon: <Rocket className="w-6 h-6 text-wrlds-muted" />,
        title: " CST Academy stands apart because we focus on skills, outcomes, and careers.",
        description: " CST Academy stands apart because we focus on skills, outcomes, and careers.",
    }
];

const WhyUs = () => {
    return (
        <section className="py-1 relative overflow-hidden bg-transparent">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="container px-6">
                <div className="mb-16 md:flex md:justify-between md:items-end">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold font-space mb-4 text-white">
                            WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrlds-blue to-white">Learners</span> <br /> Choose CST Academy.
                        </h2>
                    </div>
                    {/* <p className="hidden md:block text-wrlds-muted max-w-xs text-sm">
                       CST Academy stands apart because we focus on skills, outcomes, and careers.
                    </p> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-6 rounded-2xl border border-white/5 bg-wrlds-surface hover:bg-white/10 hover:border-wrlds-blue/50 transition-all duration-300"
                        >
                            <div className="mb-4 bg-black/50 w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold font-space mb-2 text-white group-hover:text-wrlds-blue transition-colors">{item.title}</h3>
                            <p className="text-wrlds-muted text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
