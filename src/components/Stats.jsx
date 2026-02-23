import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
    const stats = [
        { value: '50,000+', label: 'Customers' },
        { value: '500+', label: 'Designs' },
        { value: '98%', label: 'Satisfaction' },
        { value: '120+', label: 'Models' }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center relative"
                        >
                            <div className="text-4xl md:text-5xl font-syne font-extrabold text-gradient mb-2">
                                {stat.value}
                            </div>
                            <div className="text-dim text-sm uppercase tracking-widest font-bold">
                                {stat.label}
                            </div>
                            {idx < stats.length - 1 && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10 hidden md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
