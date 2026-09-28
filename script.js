// ================= NAVBAR =================

const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
        const isOpen = navbarMenu.classList.toggle("active");

        navbarToggle.classList.toggle("active");
        navbarToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbarMenu.classList.remove("active");
            navbarToggle.classList.remove("active");
            navbarToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ================= THEME TOGGLE =================

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle
    ? themeToggle.querySelector("i")
    : null;

function applyTheme(theme) {

    const isLight = theme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    if (themeIcon) {
        themeIcon.className = isLight
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }
}


// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    applyTheme("light");
} else {
    applyTheme("dark");
}


// Theme button click
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLightTheme =
            document.body.classList.contains(
                "light-theme"
            );

        const newTheme =
            isLightTheme
                ? "dark"
                : "light";

        applyTheme(newTheme);

        localStorage.setItem(
            "theme",
            newTheme
        );
    });
}


// ================= TYPING EFFECT =================

const typingElement =
    document.querySelector(".typing");

const introText = "Hello, it's me";

let typingIndex = 0;

function typeText() {

    if (!typingElement) return;

    if (typingIndex < introText.length) {

        typingElement.textContent +=
            introText.charAt(typingIndex);

        typingIndex++;

        setTimeout(
            typeText,
            90
        );

    }
}

typeText();


// ================= SCROLL REVEAL =================

const revealElements =
    document.querySelectorAll(".reveal");

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// ================= ACTIVE NAVIGATION =================

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    navLinks.forEach((link) => {
                        link.classList.remove(
                            "active"
                        );
                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add(
                            "active"
                        );
                    }
                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }
        );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// =========================================================
// PREMIUM PROFILE MOUSE EFFECT
// =========================================================

const profilePhoto =
    document.querySelector(".profile-photo");

const heroVisual =
    document.querySelector(".hero-visual");

const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;

if (
    profilePhoto &&
    heroVisual &&
    finePointer &&
    !prefersReducedMotion
) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame = null;


    function animateProfile() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;

        profilePhoto.style.transform =
            `translate3d(${currentX * 0.35}px, ${currentY * 0.35}px, 0)`;

        animationFrame =
            requestAnimationFrame(
                animateProfile
            );
    }


    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            mouseX =
                (x - centerX) /
                18;

            mouseY =
                (y - centerY) /
                18;

            if (!animationFrame) {
                animateProfile();
            }
        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            mouseX = 0;
            mouseY = 0;

            if (!animationFrame) {
                animateProfile();
            }
        }
    );
}


// =========================================================
// SCROLL PROGRESS
// =========================================================

let scrollTicking = false;

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {
        return;
    }

    const progress =
        (scrollTop / documentHeight) * 100;

    document.documentElement.style
        .setProperty(
            "--scroll-progress",
            `${progress}%`
        );

    scrollTicking = false;
}

window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                updateScrollProgress
            );

            scrollTicking = true;
        }

    },
    {
        passive: true
    }
);

updateScrollProgress();


// =========================================================
// NAVBAR SCROLL EFFECT
// =========================================================

const navbar =
    document.querySelector(".navbar");

let navbarTicking = false;

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 25) {
        navbar.classList.add(
            "scrolled"
        );
    } else {
        navbar.classList.remove(
            "scrolled"
        );
    }

    navbarTicking = false;
}

window.addEventListener(
    "scroll",
    () => {

        if (!navbarTicking) {

            window.requestAnimationFrame(
                updateNavbar
            );

            navbarTicking = true;
        }

    },
    {
        passive: true
    }
);

updateNavbar();


// =========================================================
// CARD HOVER POINTER EFFECT
// =========================================================

const interactiveCards =
    document.querySelectorAll(
        ".skill-card, .project-card, .social-card"
    );

if (
    finePointer &&
    !prefersReducedMotion
) {

    interactiveCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    35;

                const rotateY =
                    (centerX - x) /
                    35;

                card.style.transform =
                    `translateY(-5px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });
}


// =========================================================
// SMOOTH ANCHOR OFFSET
// =========================================================

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",

                block: "start"
            });
        }
    );
});