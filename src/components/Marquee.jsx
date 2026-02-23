import React from 'react';

const Marquee = () => {
    const items = [
        'Free Shipping',
        '30-Day Returns',
        '500+ Designs',
        'Custom Printing',
        'MagSafe Compatible',
        'Military Drop Protection',
        '1 Year Warranty'
    ];

    return (
        <div className="border-y border-white/10 py-6 overflow-hidden bg-black/20">
            <div className="marquee-content gap-12">
                {/* Repeat twice for seamless loop */}
                {[...items, ...items].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                        <span className="text-sm font-syne font-bold uppercase tracking-widest">{item}</span>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-purple)] shadow-[0_0_10px_var(--accent-purple)]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
