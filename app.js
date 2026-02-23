/**
 * AURA CASES - Premium Frontend JS
 * No dependencies, vanilla logic.
 */

// 1. Initial State & Config
const SUPABASE_URL = 'https://qucnmzqmeguakbbdkxiu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_UnaoYxxwgzxCVzC_Ki_fRQ__ThTYVqH';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// 2. Custom Cursor Logic
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    // Check for hovers
    const target = e.target;
    if (target.closest('button, a, .glass-card, .wishlist-btn')) {
        ring.style.width = '70px';
        ring.style.height = '70px';
        ring.style.borderColor = '#FA6D9A';
    } else {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = '#7C6DFA';
    }
});

function animateRing() {
    // Lerp (Linear Interpolation) for smooth following
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
}
animateRing();

// 3. Scroll Effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    const progress = (scrolled / maxScroll) * 100;
    scrollProgress.style.width = progress + '%';

    // Navbar background
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax mesh
    const mesh = document.querySelector('.bg-mesh');
    mesh.style.transform = `translateY(${scrolled * 0.15}px)`;
});

// 4. Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // If it's a stat number, start counting
            if (entry.target.classList.contains('stat-num')) {
                startCount(entry.target);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.stat-num').forEach(el => revealObserver.observe(el));

// 5. Stat Counter Logic
function startCount(el) {
    if (el.getAttribute('data-started')) return;
    el.setAttribute('data-started', 'true');

    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const current = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));

        el.innerText = current + (target === 99 ? '%' : '+');

        if (progress < 1) requestAnimationFrame(update);
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

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            // Spotlight effect
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 80%), var(--surface)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            card.style.background = `var(--surface)`;
        });
    });
}
applyTilt();

// 7. Dynamic Product Rendering (Supabase)
const demoProducts = [
    { id: 1, name: 'Cyber Neon Glow', price: 29.99, old_price: 39.99, badge: 'Hot', color_theme: 'from-purple-500 to-pink-500', category: 'iPhone 15 Pro', rating: 5, image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80' },
    { id: 2, name: 'Crystal Ocean', price: 24.99, badge: 'New', color_theme: 'from-teal-500 to-blue-500', category: 'Samsung S24 Ultra', rating: 4, image_url: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80' },
    { id: 3, name: 'Midnight Nebula', price: 32.00, old_price: 45.00, badge: 'Hot', color_theme: 'from-violet-500 to-red-500', category: 'Google Pixel 8', rating: 5, image_url: 'https://images.unsplash.com/photo-15747514d3600-985863d0800e?q=80' },
    { id: 4, name: 'Forest Stealth', price: 27.50, badge: 'New', color_theme: 'from-green-500 to-teal-500', category: 'OnePlus 12', rating: 4, image_url: 'https://images.unsplash.com/photo-1558712613-2d57c672b1cc?q=80' }
];

async function loadProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '<p class="muted">Connecting to Aura Engine...</p>';

    let products = demoProducts;

    if (supabase) {
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (data && data.length > 0) products = data;
        } catch (e) {
            console.warn("Using demo products (Supabase disconnected)");
        }
    }

    grid.innerHTML = '';
    products.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = `product-card glass-card reveal-up tilt-card delay-${(idx % 4) + 1}`;
        card.innerHTML = `
            <div class="product-image-area">
                <div class="product-badge ${p.badge === 'Hot' ? 'badge-hot' : 'badge-new'}">${p.badge} ${p.badge === 'Hot' ? '🔥' : ''}</div>
                <div class="wishlist-btn"><i data-lucide="heart"></i></div>
                <img src="${p.image_url}" alt="${p.name}" style="width: 80%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3)">
            </div>
            <div class="product-info">
                <div class="rating mb-xs">
                    ${'★'.repeat(p.rating || 5)}${'☆'.repeat(5 - (p.rating || 5))}
                </div>
                <h3 class="font-syne" style="font-size: 1.25rem">${p.name}</h3>
                <p class="muted small mb-md">${p.category || p.compatibility}</p>
                <div class="flex-between" style="display: flex; justify-content: space-between; align-items: center">
                    <div>
                        <span class="bold">$${p.price}</span>
                        ${p.old_price ? `<span class="muted small" style="text-decoration: line-through; margin-left: 0.5rem">$${p.old_price}</span>` : ''}
                    </div>
                    <button class="add-btn"><i data-lucide="plus"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-init icons
    lucide.createIcons();
    applyTilt();

    // Init reveal for dynamic elements
    document.querySelectorAll('.product-card').forEach(el => revealObserver.observe(el));

    // Handle Wishlist Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('svg');
            if (btn.classList.contains('active')) {
                btn.style.fill = '#FA6D9A';
            } else {
                btn.style.fill = 'none';
            }
        });
    });

    // Handle Add To Cart
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('success');
            btn.innerHTML = '<i data-lucide="check"></i>';
            lucide.createIcons();

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#7C6DFA', '#FA6D9A', '#6DFADC']
            });

            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = '<i data-lucide="plus"></i>';
                lucide.createIcons();
            }, 2000);
        });
    });
}

loadProducts();

// 8. Initialization
lucide.createIcons();
console.log("AURA CASES v2.0 - Premium Design Active");
