import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-24 pb-12 border-t border-white/10 mt-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="text-2xl font-bold font-syne text-gradient mb-6">AURA CASES</div>
                        <p className="text-dim text-sm leading-relaxed mb-8">
                            Redefining mobile protection with futuristic design and elite craftsmanship. Stay protected, stay aura.
                        </p>
                        <div className="flex space-x-4">
                            {[Twitter, Linkedin, Instagram, Youtube].map((Icon, idx) => (
                                <button key={idx} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-[var(--accent-purple)] hover:border-[var(--accent-purple)] transition-all">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-syne font-bold mb-6 uppercase tracking-widest text-xs text-white">Shop</h4>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Best Sellers', 'Custom Studio', 'Limited Edition', 'Accessories'].map(link => (
                                <li key={link}><a href="#" className="text-dim hover:text-white transition-colors text-sm">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-syne font-bold mb-6 uppercase tracking-widest text-xs text-white">Support</h4>
                        <ul className="space-y-4">
                            {['Track Order', 'Return Policy', 'Shipping Info', 'Drop Test Data', 'Contact Us'].map(link => (
                                <li key={link}><a href="#" className="text-dim hover:text-white transition-colors text-sm">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-syne font-bold mb-6 uppercase tracking-widest text-xs text-white">Company</h4>
                        <ul className="space-y-4">
                            {['Our Story', 'Sustainability', 'Bulk Orders', 'Affiliate Program', 'Careers'].map(link => (
                                <li key={link}><a href="#" className="text-dim hover:text-white transition-colors text-sm">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-6">
                    <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] text-dim/50">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dim/50">
                        © 2025 AURA CASES. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
