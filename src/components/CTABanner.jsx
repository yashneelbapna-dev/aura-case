import React from 'react';
import { motion } from 'framer-motion';

const CTABanner = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] p-12 md:p-24 glass border border-white/20 text-center"
                >
                    {/* Internal Glows */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent-purple)]/20 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-pink)]/20 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-syne font-extrabold mb-8 leading-tight">
                            Find Your <br />
                            <span className="text-gradient">Perfect Case</span>
                        </h2>
                        <p className="text-dim text-lg mb-10 leading-relaxed">
                            Join 50,000+ satisfied users who have upgraded their device aesthetics and protection.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                                Shop All Designs
                            </button>
                            <button className="px-10 py-5 glass border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTABanner;
