import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, emoji, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="glass-card rounded-3xl p-8 group relative overflow-hidden"
        >
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

            <div className="text-4xl mb-6 inline-block drop-shadow-[0_0_15px_rgba(124,109,250,0.5)]">
                {emoji}
            </div>
            <h3 className="text-xl font-syne font-bold mb-3">{title}</h3>
            <p className="text-dim text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
};

const Features = () => {
    const features = [
        { title: 'Military Protection', description: 'Certified 10ft drop protection with dual-layer shock absorption system.', emoji: '🛡️' },
        { title: 'UV Prints', description: 'High-definition prints that never fade or scratch, even under harsh sunlight.', emoji: '✨' },
        { title: 'Eco Materials', description: 'Crafted from 60% recycled bioplastics without compromising on durability.', emoji: '🌿' },
        { title: 'MagSafe Ready', description: 'Powerful built-in N52 grade magnets for seamless accessory compatibility.', emoji: '🧲' },
        { title: 'Precision Fit', description: 'Laser-cut accuracy for every port, button, and camera lens.', emoji: '🎯' },
        { title: 'Custom Studio', description: 'Create your own identity with our online 3D case configurator.', emoji: '🎨' }
    ];

    return (
        <section className="py-24 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[var(--accent-purple)] font-bold tracking-widest uppercase text-xs">Innovation</span>
                    <h2 className="text-4xl md:text-5xl font-syne font-extrabold mt-2">Built Different</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            {...feature}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
