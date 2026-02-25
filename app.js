/**
 * AURA CASES - Premium Frontend JS
 * Version 2.6 - High Reliability Edition
 */

// 1. Initial State & Config
const SUPABASE_URL = 'https://qucnmzqmeguakbbdkxiu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_UnaoYxxwgzxCVzC_Ki_fRQ__ThTYVqH';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Global State
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;
let cursorDot, cursorFollow;

// 2. Custom Cursor Logic
function initCursor() {
    cursorDot = document.getElementById('cursor');
    cursorFollow = document.getElementById('cursorFollow');

    if (!cursorDot || !cursorFollow) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        // Check for hovers
        const target = e.target;
        if (target.closest('button, a, .tilt-card')) {
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
    // Lerp (Linear Interpolation) for smooth following (0.12 factor)
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;

    cursorFollow.style.transform = `translate3d(${followX}px, ${followY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
}

// 3. Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const mesh = document.querySelector('.bg-mesh');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgress) {
            const progress = (scrolled / maxScroll) * 100;
            scrollProgress.style.width = progress + '%';
        }

        // Navbar background
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
    });
}

// 4. Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// 5. Stat Counter Logic
function initStats() {
    const statsSection = document.querySelector('.stats-row');
    const counters = document.querySelectorAll('.stat-num');

    if (!statsSection || counters.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                statsObserver.unobserve(statsSection);
            }
        });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(easeProgress * target);

        const isSatisfaction = el.nextElementSibling?.innerText.includes('Satisfaction');
        el.innerText = current.toLocaleString() + (isSatisfaction ? '%' : '+');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerText = target.toLocaleString() + (isSatisfaction ? '%' : '+');
        }
    }
    requestAnimationFrame(update);
}

// 6. 3D Card Tilt Logic
function applyTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;

            card.style.setProperty('--mx', `${px}%`);
            card.style.setProperty('--my', `${py}%`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotX = (y - centerY) / rect.height * -10;
            const rotY = (x - centerX) / rect.width * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = "";
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });
}

// 7. Dynamic Product Rendering (Fallback to Demo)
const demoProducts = [
    { id: 1, name: 'Aurora Dream', price: 899, old_price: 1299, badge: 'Hot', gradient: 'linear-gradient(135deg, #7C6DFA, #FA6D9A)', category: 'iPhone 15 Pro Max', rating: 5 },
    { id: 2, name: 'Ocean Breeze', price: 799, old_price: 999, badge: 'New', gradient: 'linear-gradient(135deg, #6DFADC, #6D9EFA)', category: 'Samsung S24 Ultra', rating: 5 },
    { id: 3, name: 'Golden Hour', price: 749, badge: 'Hot', gradient: 'linear-gradient(135deg, #FA9A6D, #FADC6D)', category: 'OnePlus 12 Pro', rating: 5 },
    { id: 4, name: 'Neon Galaxy', price: 849, old_price: 1199, badge: 'New', gradient: 'linear-gradient(135deg, #D06DFA, #FA6D6D)', category: 'Pixel 9 Pro', rating: 5 },
    { id: 5, name: 'Mint Forest', price: 699, badge: 'New', gradient: 'linear-gradient(135deg, #6DFA9A, #6DFADC)', category: 'iPhone 15', rating: 5 },
    { id: 6, name: 'Crimson Blaze', price: 649, old_price: 899, badge: 'Hot', gradient: 'linear-gradient(135deg, #FA6D6D, #FA9A6D)', category: 'Samsung A55', rating: 5 },
    { id: 7, name: 'Deep Space', price: 599, badge: 'New', gradient: 'linear-gradient(135deg, #6D9EFA, #D06DFA)', category: 'OnePlus Nord 4', rating: 5 },
    { id: 8, name: 'Citrus Summer', price: 549, old_price: 799, badge: 'Hot', gradient: 'linear-gradient(135deg, #FADC6D, #6DFA9A)', category: 'Realme GT 6', rating: 5 }
];

async function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Attempt Supabase fetch, fallback to demo
    let products = demoProducts;
    if (supabase) {
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (!error && data && data.length > 0) {
                products = data.slice(0, 8);
            }
        } catch (e) {
            console.warn("Supabase fetch failed, using demo data.");
        }
    }

    products.forEach((p, idx) => {
        const card = document.createElement('div');
        const brand = p.category.split(' ')[0];
        card.setAttribute('data-brand', brand);
        card.className = `product-card glass-card reveal tilt-card delay-${(idx % 4) + 1}`;
        card.innerHTML = `
            <div class="product-image-area" style="background: ${p.gradient || 'var(--surface)'};">
                <div class="product-badge ${p.badge === 'Hot' ? 'badge-hot' : 'badge-new'}">
                    ${p.badge || 'New'} ${p.badge === 'Hot' ? '🔥' : ''}
                </div>
                <div class="wishlist-btn">
                    <i data-lucide="heart"></i>
                </div>
                <div class="phone-shape"></div>
            </div>
            <div class="product-info">
                <div class="rating">
                    ${'★'.repeat(p.rating || 5)}${'☆'.repeat(5 - (p.rating || 5))}
                </div>
                <h3 class="font-syne">${p.name}</h3>
                <p class="muted small">${p.category}</p>
                <div class="flex-between">
                    <div class="price-box">
                        <span class="bold">₹${p.price}</span>
                        ${p.old_price ? `<span class="muted small old-price">₹${p.old_price}</span>` : ''}
                    </div>
                    <button class="add-btn">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-initialize hooks for dynamic content
    if (window.lucide) lucide.createIcons();
    applyTilt();
    document.querySelectorAll('.product-card').forEach(el => revealObserver.observe(el));
    initButtonInteractions();
    initFilters();
}

function initButtonInteractions() {
    // Handle Wishlist Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = btn.classList.toggle('active');
            if (isActive) {
                btn.innerHTML = '<i data-lucide="heart" fill="white"></i>';
            } else {
                btn.innerHTML = '<i data-lucide="heart"></i>';
            }
            if (window.lucide) lucide.createIcons();
        });
    });

    // Handle Add To Cart
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.classList.contains('success')) return;

            const originalIcon = btn.innerHTML;
            btn.classList.add('success');
            btn.innerHTML = '<i data-lucide="check"></i>';

            if (window.lucide) lucide.createIcons();

            if (window.confetti) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#7C6DFA', '#FA6D9A', '#6DFADC']
                });
            }

            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalIcon;
                if (window.lucide) lucide.createIcons();
            }, 1200);
        });
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        // Clone and replace to remove old listeners just in case
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            const filter = newBtn.getAttribute('data-filter');

            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');

            products.forEach(p => {
                const brand = p.getAttribute('data-brand');
                const isMatch = filter === 'all' || brand.toLowerCase() === filter.toLowerCase();

                if (isMatch) {
                    p.style.display = 'block';
                    setTimeout(() => p.classList.remove('hidden'), 10);
                } else {
                    p.classList.add('hidden');
                    setTimeout(() => {
                        if (p.classList.contains('hidden')) p.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// 8. Final App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // A. Start static UI elements
    initCursor();
    initScrollEffects();

    // B. Start observers for animations
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    initStats();

    // C. Load dynamic content
    loadProducts();

    // D. Static card tilt (Categories, Features)
    applyTilt();

    console.log("AURA CASES v2.6 - Systems Operational");
});
