/**
 * MoneyPot — Main JavaScript
 * Handles navigation, scroll reveals, smooth scrolling, and the
 * TikTok in-app browser workaround. Vanilla JS, no dependencies.
 */

// App Store URL
const APP_STORE_URL = 'https://apps.apple.com/app/id6778097835';

/* ---------------------------------------------------------------
   TikTok In-App Browser Detection & Workaround
   TikTok's WebView blocks App Store links, so we detect it and
   nudge the user to open the page in their real browser.
--------------------------------------------------------------- */
function initTikTokWorkaround() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isTikTokBrowser = /musical_ly|BytedanceWebview|TikTok/i.test(userAgent);

    const urlParams = new URLSearchParams(window.location.search);
    const fromTikTok = urlParams.get('from') === 'tiktok';

    if (isTikTokBrowser) {
        // Tag the URL so, if reopened in Safari, we can auto-redirect
        if (!fromTikTok) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('from', 'tiktok');
            window.history.replaceState({}, '', newUrl);
        }
        showTikTokToast();
    } else if (fromTikTok) {
        // Opened in a real browser from TikTok — send straight to the App Store
        window.location.href = APP_STORE_URL;
    }
}

function showTikTokToast() {
    if (document.getElementById('tiktok-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'tiktok-toast';
    toast.className = 'tiktok-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
        '<div class="tiktok-toast-bubble">' +
        '<p>Tap the <strong>•••</strong> menu, then <strong>"Open in browser"</strong> ' +
        'to download MoneyPot for free. 🦊</p>' +
        '</div>';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 500);
}

/* ---------------------------------------------------------------
   Navigation Bar — scroll effect + mobile drawer toggle
--------------------------------------------------------------- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    const links = document.querySelectorAll('.navbar-link');
    if (!navbar) return;

    // Add a solid background once the user scrolls past the top
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (!toggle || !menu) return;

    const closeMenu = () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close after navigating
    links.forEach((link) => link.addEventListener('click', closeMenu));

    // Close when clicking outside the drawer
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !navbar.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
    });
}

/* ---------------------------------------------------------------
   Scroll Reveal — fade/slide elements in as they enter the viewport
--------------------------------------------------------------- */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.feature, .highlight-card, .final-cta-inner, .section-head, ' +
        '.legal-body > section, .info-item, .contact-fox-card, .contact-form-wrapper'
    );

    targets.forEach((el) => el.classList.add('reveal'));

    // Fallback: if IntersectionObserver is unavailable, just show everything
    if (!('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   Smooth scroll for same-page anchor links (offset for sticky nav)
--------------------------------------------------------------- */
function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');
    const offset = navbar ? navbar.offsetHeight : 70;

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ---------------------------------------------------------------
   Boot
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initTikTokWorkaround();
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
});

// Trigger the staggered hero reveal once assets are painted
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});
