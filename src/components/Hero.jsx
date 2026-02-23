import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1 rounded-full glass border border-white/20 text-[var(--accent-teal)] text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        New Collection 2025
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-syne font-extrabold leading-tight mb-6">
                        Protect <br />
                        <span className="italic font-normal">Your</span> <br />
                        <span className="text-gradient">World</span> in Style
                    </h1>

                    <p className="text-dim text-lg md:text-xl max-w-md mb-10 leading-relaxed">
                        Premium glassmorphism cases engineered for impact. Military-grade protection meets avant-garde aesthetics.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] rounded-full font-bold flex items-center space-x-2 hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
                            <span>Shop Collection</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-colors">
                            Custom Design
                        </button>
                    </div>
                </motion.div>

                {/* Right Side: Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative hide-mobile"
                >
                    <div className="relative w-full max-w-[400px] mx-auto aspect-[1/2] rounded-[3rem] p-4 glass border-white/10 shadow-2xl">
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-[3rem] p-[2px] overflow-hidden">
                            <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,var(--accent-purple),var(--accent-pink),var(--accent-teal),transparent)]" />
                            <div className="absolute inset-[2px] bg-[var(--bg-dark)] rounded-[2.9rem]" />
                        </div>

                        {/* Inner Content - Placeholder for Image */}
                        <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center group">
                            <img
                                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop"
                                alt="Premium Case"
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-10 left-0 w-full text-center">
                                <span className="text-xs uppercase tracking-[0.3em] text-white/40">Series Elite</span>
                                <p className="text-xl font-syne font-bold">Midnight Aura</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Blobs around phone */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 blur-3xl" />
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
