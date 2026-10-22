
// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// LIGHT AND DARK THEME
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

try {
    if (localStorage.getItem("portfolio-theme") === "dark") {
        root.setAttribute("data-theme", "dark");
    }
} catch (error) {}

function updateThemeButton() {
    const dark = root.getAttribute("data-theme") === "dark";

    themeToggle.textContent = dark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") !== "dark";

    if (dark) {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }

    try {
        localStorage.setItem(
            "portfolio-theme",
            dark ? "dark" : "light"
        );
    } catch (error) {}

    updateThemeButton();
});

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");

    menuToggle.textContent = open ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// TYPING ANIMATION
const phrases = ["Information Technology Student"];
const typing = document.getElementById("typing");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeText() {
    const phrase = phrases[phraseIndex];

    typing.textContent = phrase.substring(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
        charIndex++;
        setTimeout(typeText, 75);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeText, 1400);
    } else if (charIndex > 0) {
        charIndex--;
        setTimeout(typeText, 35);
    } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeText, 300);
    }
}

typeText();

// SCROLL REVEAL
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(element => {
        revealObserver.observe(element);
    });
} else {
    document.querySelectorAll(".reveal").forEach(element => {
        element.classList.add("visible");
    });
}

// ACTIVE NAVIGATION AND BACK TO TOP
const pageSections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");

function updateScrollState() {
    const position = window.scrollY + 130;

    pageSections.forEach(section => {
        if (
            position >= section.offsetTop &&
            position < section.offsetTop + section.offsetHeight
        ) {
            navAnchors.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + section.id
                );
            });
        }
    });

    toTop.classList.toggle("show", window.scrollY > 400);
}

window.addEventListener("scroll", updateScrollState, {
    passive: true
});

updateScrollState();

toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
    });
});

// CONTACT FORM
// Opens the visitor's email application.
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (
        !name ||
        !message ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        formMsg.textContent =
            "Please enter your name, a valid email and a message.";
        return;
    }

    const subject = encodeURIComponent(
        "Portfolio enquiry from " + name
    );

    const body = encodeURIComponent(
        message + "\n\nFrom: " + name + "\nEmail: " + email
    );

    formMsg.textContent = "Opening your email application...";

    window.location.href =
        "mailto:sruthikasree07@gmail.com?subject=" +
        subject + "&body=" + body;
});

// CALM PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];

const pointer = {
    x: -1000,
    y: -1000
};

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(
        55,
        Math.floor(width * height / 23000)
    );

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.7
    }));
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
});

window.addEventListener("mouseout", event => {
    if (!event.relatedTarget) {
        pointer.x = -1000;
        pointer.y = -1000;
    }
});

function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    const dark = root.getAttribute("data-theme") === "dark";
    const color = dark ? "170,205,190" : "112,157,137";

    particles.forEach((a, index) => {
        const dx = a.x - pointer.x;
        const dy = a.y - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 100 && distance > 0) {
            a.x += (dx / distance) * 0.7;
            a.y += (dy / distance) * 0.7;
        }

        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.4)`;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
            const b = particles[j];
            const gap = Math.hypot(a.x - b.x, a.y - b.y);

            if (gap < 115) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle =
                    `rgba(${color},${0.12 * (1 - gap / 115)})`;

                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    });

    if (!reduceMotion) {
        requestAnimationFrame(drawParticles);
    }
}

resizeCanvas();
drawParticles();
