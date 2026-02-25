/**
 * AURA CASES - Premium Frontend JS
 * Version 3.0 - All Bugs Fixed Edition
 * Fixes: Stat counters, product cards, filters, scroll reveal,
 *        card tilt, custom cursor, wishlist/cart, responsive, navbar scroll
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

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;
let cursorDot = null, cursorFollow = null;

// ───────────────────────────────────────────────
// 2. Custom Cursor (Bug #6 fix)
// ───────────────────────────────────────────────
function initCursor() {
    // Skip on touch / mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    cursorDot = document.getElementById('cursor');
    cursorFollow = document.getElementById('cursorFollow');
    if (!cursorDot || !cursorFollow) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

        // Expand on hoverable elements
        const target = e.target;
        if (target.closest('button, a, .tilt-card, .filter-btn, .social-btn')) {
            cursorFollow.style.width = '70px';
            cursorFollow.style.height = '70px';
            cursorFollow.style.borderColor = '#FA6D9A';
            cursorFollow.style.backgroundColor = 'rgba(250, 109, 154, 0.05)';
        } else {
            cursorFollow.style.width = '36px';
            cursorFollow.style.height = '36px';
            cursorFollow.style.borderColor = 'rgba(124, 109, 250, 0.5)';
            cursorFollow.style.backgroundColor = 'transparent';
        }
    });

    animateCursor();
}

function animateCursor() {
    if (!cursorFollow) return;
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top = followY + 'px';
    requestAnimationFrame(animateCursor);
}

// ───────────────────────────────────────────────
// 3. Navbar Scroll Effect (Bug #9 fix)
// ───────────────────────────────────────────────
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const mesh = document.querySelector('.bg-mesh');

    if (!navbar && !scrollProgress) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll progress bar
        if (scrollProgress && maxScroll > 0) {
            const progress = Math.min((scrolled / maxScroll) * 100, 100);
            scrollProgress.style.width = progress + '%';
        }

        // Navbar becomes more opaque past 50px
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax mesh
        if (mesh) {
            mesh.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }, { passive: true });
}

// ───────────────────────────────────────────────
// 4. Scroll Reveal Animation (Bug #4 fix)
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
// 5. Stat Counter Animation (Bug #1 fix)
// ───────────────────────────────────────────────
function initStats() {
    const statsSection = document.querySelector('.stats-row');
    const counters = document.querySelectorAll('.stat-num[data-target]');

    if (!statsSection || counters.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    statsObserver.observe(statsSection);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target) || target <= 0) return;

    // Check if label says Satisfaction for % suffix
    const label = el.nextElementSibling;
    const isSatisfaction = label && label.textContent && label.textContent.includes('Satisfaction');
    const suffix = isSatisfaction ? '%' : '+';

    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // EaseOutExpo for dramatic counting
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(easedProgress * target);

        el.textContent = current.toLocaleString('en-IN') + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString('en-IN') + suffix;
        }
    }
    requestAnimationFrame(update);
}

// ───────────────────────────────────────────────
// 6. 3D Card Tilt Effect (Bug #5 fix)
// ───────────────────────────────────────────────
function applyTilt() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    document.querySelectorAll('.tilt-card').forEach(card => {
        // Remove old listeners to prevent duplicates
        card.removeEventListener('mousemove', card._tiltMove);
        card.removeEventListener('mouseleave', card._tiltLeave);

        card._tiltMove = function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Cursor spotlight position
            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;
            card.style.setProperty('--mx', `${px}%`);
            card.style.setProperty('--my', `${py}%`);

            // 3D rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotX = ((y - centerY) / rect.height) * -10;
            const rotY = ((x - centerX) / rect.width) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
        };

        card._tiltLeave = function () {
            card.style.transform = '';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        };

        card.addEventListener('mousemove', card._tiltMove);
        card.addEventListener('mouseleave', card._tiltLeave);
    });
}

// ───────────────────────────────────────────────
// 7. Product Cards (Bug #2 fix)
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

    // Try Supabase, fallback to demo products
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
        const gradient = p.gradient || 'linear-gradient(135deg, #7C6DFA, #FA6D9A)';
        const badgeClass = p.badge === 'Hot' ? 'badge-hot' : 'badge-new';
        const badgeText = p.badge === 'Hot' ? 'Hot 🔥' : 'New';
        const oldPriceHtml = p.old_price ? `<span class="muted small old-price">₹${p.old_price}</span>` : '';

        card.innerHTML = `
            <div class="product-image-area" style="background: ${gradient};">
                <div class="product-badge ${badgeClass}">${badgeText}</div>
                <button class="wishlist-btn" aria-label="Add to wishlist">♡</button>
                <div class="phone-shape"></div>
            </div>
            <div class="product-info">
                <div class="rating">${stars}</div>
                <h3 class="font-syne">${p.name}</h3>
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

    // Re-hook everything for dynamic cards
    applyTilt();
    if (revealObserver) {
        document.querySelectorAll('.product-card.reveal').forEach(el => revealObserver.observe(el));
    }
    initButtonInteractions();
    initFilters();

    // Re-initialize Lucide icons if loaded from CDN
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}

// ───────────────────────────────────────────────
// 8. Wishlist & Cart Interactions (Bug #7 fix)
// ───────────────────────────────────────────────
function initButtonInteractions() {
    // Wishlist ♡ → ♥ toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        // Skip if already bound
        if (btn._bound) return;
        btn._bound = true;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = btn.classList.toggle('active');
            btn.textContent = isActive ? '♥' : '♡';
        });
    });

    // Cart + → ✓ teal for 1.2s then reset
    document.querySelectorAll('.add-btn').forEach(btn => {
        if (btn._bound) return;
        btn._bound = true;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (btn.classList.contains('success')) return;

            btn.classList.add('success');
            btn.textContent = '✓';

            // Confetti burst
            if (window.confetti) {
                const rect = btn.getBoundingClientRect();
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: {
                        x: rect.left / window.innerWidth,
                        y: rect.top / window.innerHeight
                    },
                    colors: ['#7C6DFA', '#FA6D9A', '#6DFADC']
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
// 9. Filter Pills (Bug #3 fix)
// ───────────────────────────────────────────────
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        // Remove old listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            const filter = newBtn.getAttribute('data-filter');

            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');

            // Filter product cards
            document.querySelectorAll('.product-card').forEach(card => {
                const brand = card.getAttribute('data-brand') || '';
                const isMatch = filter === 'all' || brand.toLowerCase() === filter.toLowerCase();

                if (isMatch) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    // Wait for CSS transition before hiding
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
    // A. Custom cursor
    initCursor();

    // B. Scroll effects (navbar + progress bar)
    initScrollEffects();

    // C. Scroll reveal animation
    initReveal();

    // D. Stat counter animation
    initStats();

    // E. Load products (async — handles Supabase fallback)
    loadProducts();

    // F. Card tilt for static cards (categories, features)
    applyTilt();

    // G. Initialize Lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }

    console.log('AURA CASES v3.0 — All Systems Operational ✨');
});
