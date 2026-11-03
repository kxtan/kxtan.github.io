// Reveal sections on scroll (sections are only hidden when this script runs; see .js in styles.css)
const sections = document.querySelectorAll('section');

// Sections already on screen show straight away; only those further down fade in.
sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight) section.classList.add('visible');
});
document.documentElement.classList.add('js');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });
    sections.forEach(section => observer.observe(section));
} else {
    sections.forEach(section => section.classList.add('visible'));
}

// Safety net: never leave content hidden (e.g. background tabs, print, slow devices)
setTimeout(() => sections.forEach(section => section.classList.add('visible')), 2500);

// Light / dark toggle (choice is remembered; otherwise follows the system setting)
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelectorAll('meta[name="theme-color"]');

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeMeta.forEach(m => m.setAttribute('content', theme === 'dark' ? '#1A1917' : '#FAF6EF'));
}

if (toggle) {
    toggle.hidden = false;
    applyTheme(root.getAttribute('data-theme') || 'light');
    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });
    // Follow system changes until the visitor picks a theme themselves
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        let stored = null;
        try { stored = localStorage.getItem('theme'); } catch (err) {}
        if (!stored) applyTheme(e.matches ? 'dark' : 'light');
    });
}

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });
