/**
 * AURA CASES - Premium Frontend JS
 * Version 4.0 - Minimalist Luxury Edition
 * Theme toggle, stat counters, products, filters, scroll effects
 */

// ───────────────────────────────────────────────
// 1. Config & State
// ───────────────────────────────────────────────
const SUPABASE_URL = 'https://qucnmzqmeguakbbdkxiu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_UnaoYxxwgzxCVzC_Ki_fRQ__ThTYVqH';

let supabaseClient = null;
try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.warn('Supabase init skipped:', e.message);
}

// ───────────────────────────────────────────────
// 2. Theme Toggle System
// ───────────────────────────────────────────────
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const toggleBtnMobile = document.getElementById('themeToggleMobile');
    const html = document.documentElement;

    // Determine initial theme
    const saved = localStorage.getItem('aura-theme');
    let isDark;

    if (saved) {
        isDark = saved === 'dark';
    } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    applyTheme(isDark);

    // Toggle handlers
    function handleToggle() {
        isDark = !isDark;
        applyTheme(isDark);
        localStorage.setItem('aura-theme', isDark ? 'dark' : 'light');
    }

    if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', handleToggle);

    // Listen for system preference changes (only if user hasn't manually set)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('aura-theme')) {
            isDark = e.matches;
            applyTheme(isDark);
        }
    });

    function applyTheme(dark) {
        if (dark) {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.add('light');
            html.classList.remove('dark');
        }

        const icon = dark ? '☀️' : '🌙';

        // Animate icon swap
        [toggleBtn, toggleBtnMobile].forEach(btn => {
            if (!btn) return;
            const iconEl = btn.querySelector('.toggle-icon');
            if (!iconEl) return;
            btn.setAttribute('aria-pressed', String(!dark));
            iconEl.style.transform = 'scale(0)';
            setTimeout(() => {
                iconEl.textContent = icon;
                iconEl.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// ───────────────────────────────────────────────
// 3. Navbar Scroll Effect
// ───────────────────────────────────────────────
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    if (!navbar && !scrollProgress) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollProgress && maxScroll > 0) {
            const progress = Math.min((scrolled / maxScroll) * 100, 100);
            scrollProgress.style.width = progress + '%';
        }

        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}

// ───────────────────────────────────────────────
// 4. Scroll Reveal Animation
// ───────────────────────────────────────────────
let revealObserver;

function initReveal() {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ───────────────────────────────────────────────
// 5. Stat Counter Animation
// ───────────────────────────────────────────────
function initStats() {
    const statsSection = document.querySelector('.stats-row');
    const counters = document.querySelectorAll('.stat-num[data-target]');

    if (!statsSection || counters.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach((counter, index) => {
                    // Stagger: 0ms, 150ms, 300ms, 450ms
                    setTimeout(() => animateCounter(counter), index * 150);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target) || target <= 0) return;

    const suffix = el.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(easedProgress * target);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString() + suffix;
        }
    }
    requestAnimationFrame(update);
}

// ───────────────────────────────────────────────
// 6. Subtle Card Tilt (kept but no color spotlight)
// ───────────────────────────────────────────────
function applyTilt() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.removeEventListener('mousemove', card._tiltMove);
        card.removeEventListener('mouseleave', card._tiltLeave);

        card._tiltMove = function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            // Subtle tilt — reduced from 10deg to 5deg
            const rotX = ((y - centerY) / rect.height) * -5;
            const rotY = ((x - centerX) / rect.width) * 5;
            card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        };

        card._tiltLeave = function () {
            card.style.transform = '';
        };

        card.addEventListener('mousemove', card._tiltMove);
        card.addEventListener('mouseleave', card._tiltLeave);
    });
}

// ───────────────────────────────────────────────
// 7. Product Cards
// ───────────────────────────────────────────────
const demoProducts = [
    { id: 1, name: 'Aurora Dream', price: 899, old_price: 1299, badge: 'Hot', gradient: 'linear-gradient(135deg, #7C6DFA, #FA6D9A)', category: 'iPhone 15 Pro Max', rating: 5 },
    { id: 2, name: 'Ocean Breeze', price: 799, old_price: 999, badge: 'New', gradient: 'linear-gradient(135deg, #6DFADC, #6D9EFA)', category: 'Samsung S24 Ultra', rating: 5 },
    { id: 3, name: 'Golden Hour', price: 749, old_price: null, badge: 'Hot', gradient: 'linear-gradient(135deg, #FA9A6D, #FADC6D)', category: 'OnePlus 12 Pro', rating: 5 },
    { id: 4, name: 'Neon Galaxy', price: 849, old_price: 1199, badge: 'New', gradient: 'linear-gradient(135deg, #D06DFA, #FA6D6D)', category: 'Pixel 9 Pro', rating: 5 },
    { id: 5, name: 'Mint Forest', price: 699, old_price: null, badge: 'New', gradient: 'linear-gradient(135deg, #6DFA9A, #6DFADC)', category: 'iPhone 15', rating: 5 },
    { id: 6, name: 'Crimson Blaze', price: 649, old_price: 899, badge: 'Hot', gradient: 'linear-gradient(135deg, #FA6D6D, #FA9A6D)', category: 'Samsung A55', rating: 5 },
    { id: 7, name: 'Deep Space', price: 599, old_price: null, badge: 'New', gradient: 'linear-gradient(135deg, #6D9EFA, #D06DFA)', category: 'OnePlus Nord 4', rating: 5 },
    { id: 8, name: 'Citrus Summer', price: 549, old_price: 799, badge: 'Hot', gradient: 'linear-gradient(135deg, #FADC6D, #6DFA9A)', category: 'Realme GT 6', rating: 5 }
];

async function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    let products = demoProducts;
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('products').select('*');
            if (!error && data && data.length > 0) {
                products = data.slice(0, 8);
            }
        } catch (e) {
            console.warn('Supabase fetch failed, using demo data:', e.message);
        }
    }

    products.forEach((p, idx) => {
        const brand = (p.category || '').split(' ')[0];
        const card = document.createElement('div');
        card.setAttribute('data-brand', brand);
        card.className = `product-card glass-card tilt-card reveal delay-${(idx % 4) + 1}`;

        const stars = '★'.repeat(p.rating || 5) + '☆'.repeat(5 - (p.rating || 5));
        const gradient = p.gradient || 'linear-gradient(135deg, #555, #888)';
        const badgeClass = p.badge === 'Hot' ? 'badge-hot' : 'badge-new';
        const badgeText = p.badge === 'Hot' ? 'Hot' : 'New';
        const oldPriceHtml = p.old_price ? `<span class="muted small old-price">₹${p.old_price}</span>` : '';

        card.innerHTML = `
            <div class="product-image-area" style="background: ${gradient};">
                <div class="product-badge ${badgeClass}">${badgeText}</div>
                <button class="wishlist-btn" aria-label="Add to wishlist">♡</button>
                <div class="phone-shape"></div>
            </div>
            <div class="product-info">
                <div class="rating">${stars}</div>
                <h3>${p.name}</h3>
                <p class="muted small">${p.category}</p>
                <div class="flex-between">
                    <div class="price-box">
                        <span class="bold">₹${p.price}</span>
                        ${oldPriceHtml}
                    </div>
                    <button class="add-btn" aria-label="Add to cart">+</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    applyTilt();
    if (revealObserver) {
        document.querySelectorAll('.product-card.reveal').forEach(el => revealObserver.observe(el));
    }
    initButtonInteractions();
    initFilters();

    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}

// ───────────────────────────────────────────────
// 8. Wishlist & Cart Interactions
// ───────────────────────────────────────────────
function initButtonInteractions() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        if (btn._bound) return;
        btn._bound = true;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = btn.classList.toggle('active');
            btn.textContent = isActive ? '♥' : '♡';
        });
    });

    document.querySelectorAll('.add-btn').forEach(btn => {
        if (btn._bound) return;
        btn._bound = true;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (btn.classList.contains('success')) return;

            btn.classList.add('success');
            btn.textContent = '✓';

            // Monochrome confetti
            if (window.confetti) {
                const rect = btn.getBoundingClientRect();
                confetti({
                    particleCount: 60,
                    spread: 50,
                    origin: {
                        x: rect.left / window.innerWidth,
                        y: rect.top / window.innerHeight
                    },
                    colors: ['#F5F5F5', '#AAAAAA', '#555555']
                });
            }

            setTimeout(() => {
                btn.classList.remove('success');
                btn.textContent = '+';
            }, 1200);
        });
    });
}

// ───────────────────────────────────────────────
// 9. Filter Pills
// ───────────────────────────────────────────────
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            const filter = newBtn.getAttribute('data-filter');

            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');

            document.querySelectorAll('.product-card').forEach(card => {
                const brand = card.getAttribute('data-brand') || '';
                const isMatch = filter === 'all' || brand.toLowerCase() === filter.toLowerCase();

                if (isMatch) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 500);
                }
            });
        });
    });
}

// ───────────────────────────────────────────────
// 10. App Initialization
// ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // A. Theme system (must be first for correct icon state)
    initThemeToggle();

    // B. Scroll effects
    initScrollEffects();

    // C. Scroll reveal
    initReveal();

    // D. Stat counters
    initStats();

    // E. Products
    loadProducts();

    // F. Card tilt for static cards
    applyTilt();

    // G. Lucide icons
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }

    console.log('AURA CASES v4.0 — Minimalist Luxury ✦');
});
