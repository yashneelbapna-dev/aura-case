import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Plus, Star, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    // Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleAddToCart = () => {
        setIsAdded(true);
        confetti({
            particleCount: 15,
            spread: 20,
            origin: { y: 0.8 },
            colors: ['#7C6DFA', '#FA6D9A', '#6DFADC']
        });
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="glass-card rounded-3xl p-5 group flex flex-col"
        >
            {/* Image Area */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 mb-5 flex items-center justify-center p-4">
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${product.colorTheme || 'from-purple-500/20 to-pink-500/20'}`} />
                <img
                    src={product.image || product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110 z-10"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.badge === 'Hot' ? 'bg-orange-500' : 'bg-[var(--accent-purple)]'}`}>
                        {product.badge} {product.badge === 'Hot' && "🔥"}
                    </span>
                </div>

                {/* Wishlist */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/20 transition-colors"
                >
                    <Heart
                        size={18}
                        className={`transition-colors ${isWishlisted ? 'fill-[var(--accent-pink)] stroke-[var(--accent-pink)]' : 'stroke-white'}`}
                    />
                </button>
            </div>

            {/* Info */}
            <div className="flex-1">
                <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < (product.rating || 5) ? 'fill-yellow-500 stroke-yellow-500' : 'stroke-dim'} />
                    ))}
                </div>
                <h3 className="font-syne font-bold mb-1 truncate">{product.name}</h3>
                <p className="text-dim text-xs mb-4">{product.compatibility}</p>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-xl font-bold">${product.price}</span>
                        {(product.oldPrice || product.old_price) && (
                            <span className="text-dim text-xs line-through ml-2">${product.oldPrice || product.old_price}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`p-3 rounded-full transition-all duration-300 ${isAdded ? 'bg-green-500' : 'bg-[var(--accent-purple)] hover:scale-110'}`}
                    >
                        {isAdded ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [products, setProducts] = useState([
        { id: 1, name: 'Cyber Neon Glow', compatibility: 'iPhone 15 Pro Max', price: 29.99, oldPrice: 39.99, rating: 5, badge: 'Hot', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-purple-500/30 to-pink-500/30', category: 'iPhone' },
        { id: 2, name: 'Ocean Mist Clear', compatibility: 'Samsung S24 Ultra', price: 24.99, rating: 4, badge: 'New', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-teal-500/30 to-blue-500/30', category: 'Samsung' },
        { id: 3, name: 'Sunset Gradient', compatibility: 'iPhone 14 Pro', price: 32.00, oldPrice: 45.00, rating: 5, badge: 'Hot', image: 'https://images.unsplash.com/photo-1565544421424-df38d011c215?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-orange-500/30 to-gold-500/30', category: 'iPhone' },
        { id: 4, name: 'Midnight Nebula', compatibility: 'Pixel 8 Pro', price: 27.50, rating: 5, badge: 'New', image: 'https://images.unsplash.com/photo-15747514d3600-985863d0800e?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-violet-500/30 to-red-500/30', category: 'OnePlus' },
        { id: 5, name: 'Forest Stealth', compatibility: 'OnePlus 12', price: 25.99, rating: 4, badge: 'Hot', image: 'https://images.unsplash.com/photo-1558712613-2d57c672b1cc?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-green-500/30 to-teal-500/30', category: 'OnePlus' },
        { id: 6, name: 'Crimson Edge', compatibility: 'iPhone 15', price: 28.00, rating: 5, badge: 'New', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-red-500/30 to-orange-500/30', category: 'iPhone' },
        { id: 7, name: 'Aether Blue', compatibility: 'Samsung S23', price: 22.99, rating: 4, badge: 'Hot', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-blue-500/30 to-violet-500/30', category: 'Samsung' },
        { id: 8, name: 'Golden Hour', compatibility: 'iPhone 15 Pro', price: 34.99, oldPrice: 42.99, rating: 5, badge: 'New', image: 'https://images.unsplash.com/photo-1565544421424-df38d011c215?q=80&w=1000&auto=format&fit=crop', colorTheme: 'from-yellow-500/30 to-green-500/30', category: 'iPhone' }
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!import.meta.env.VITE_SUPABASE_URL) return;
                const { data, error } = await supabase.from('products').select('*');
                if (data && !error) setProducts(data);
            } catch (e) {
                console.warn('Supabase not configured, using demo data.', e);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

    return (
        <section id="shop" className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <span className="text-[var(--accent-teal)] font-bold tracking-widest uppercase text-xs">Collection</span>
                        <h2 className="text-4xl md:text-5xl font-syne font-extrabold mt-2">Elite Selection</h2>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {['All', 'iPhone', 'Samsung', 'OnePlus'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white' : 'border-white/10 hover:border-white/30 text-dim'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
