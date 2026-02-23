import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ text, name, city, emoji, rating, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            className="glass-card rounded-3xl p-8 relative"
        >
            <Quote size={40} className="text-[var(--accent-purple)] mb-6 opacity-40" />

            <p className="text-white/80 italic mb-8 leading-relaxed">"{text}"</p>

            <div className="flex items-center space-x-4">
                <div className="text-3xl bg-white/5 w-12 h-12 rounded-full flex items-center justify-center border border-white/10">
                    {emoji}
                </div>
                <div>
                    <h4 className="font-syne font-bold text-sm tracking-wide">{name}</h4>
                    <p className="text-dim text-xs uppercase tracking-widest">{city}</p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                    <div className="flex space-x-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < rating ? 'fill-[var(--accent-purple)] stroke-[var(--accent-purple)]' : 'stroke-dim'} />
                        ))}
                    </div>
                    <span className="text-[10px] text-dim">{rating}.0 / 5</span>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const reviews = [
        { text: "The quality is unmatched. I've dropped my phone multiple times and it's perfectly safe. Plus the design looks futuristic!", name: "Alex Rivers", city: "New York", emoji: "👨‍💻", rating: 5 },
        { text: "Love the glassmorphism aesthetic. It matches my desk setup perfectly. The MagSafe is super strong too.", name: "Sarah Chen", city: "Singapore", emoji: "👩‍🎨", rating: 5 },
        { text: "Fast shipping and the packaging was premium. Best case I've ever owned. Worth every penny!", name: "Marcus Thorne", city: "London", emoji: "📸", rating: 5 }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-syne font-extrabold">Loved by Elite Users</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <TestimonialCard key={idx} {...review} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
