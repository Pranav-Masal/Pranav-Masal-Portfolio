/* =========================================================
   PRANAV MASAL — PREMIUM PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const loader = document.getElementById("pageLoader");

    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");

    const navMenu = document.getElementById("navMenu");

    const themeToggle = document.getElementById("themeToggle");

    const themeIcon = document.querySelector(".theme-icon");

    const navLinks = document.querySelectorAll(".nav-link");

    const revealElements = document.querySelectorAll(".reveal");

    const counters = document.querySelectorAll(".stat-number");

    const cursorDot = document.querySelector(".cursor-dot");

    const cursorOutline = document.querySelector(".cursor-outline");


    /* =====================================================
       02. PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("loaded");
            }

        }, 700);

    });


    /* =====================================================
       03. NAVBAR SCROLL EFFECT
    ===================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );


    handleNavbarScroll();


    /* =====================================================
       04. MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            body.classList.toggle(
                "no-scroll",
                isOpen
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                body.classList.remove("no-scroll");

            });

        });

    }


    /* =====================================================
       05. THEME SYSTEM
    ===================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        updateThemeIcon("light");

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        updateThemeIcon("dark");

    }


    function updateThemeIcon(theme) {

        if (!themeIcon) return;

        if (theme === "dark") {

            themeIcon.textContent = "☼";

        } else {

            themeIcon.textContent = "☾";

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute(
                    "data-theme"
                );

            const nextTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            document.documentElement.setAttribute(
                "data-theme",
                nextTheme
            );


            localStorage.setItem(
                "portfolio-theme",
                nextTheme
            );


            updateThemeIcon(nextTheme);

        });

    }


    /* =====================================================
       06. SCROLL REVEAL
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       07. COUNTER ANIMATION
    ===================================================== */

    let countersStarted = false;


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.count);


        if (Number.isNaN(target)) return;


        const duration = 1500;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress * target
                );


            counter.textContent =
                currentValue;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;
            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const statsSection =
        document.querySelector(".about-stats");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            !countersStarted
                        ) {

                            countersStarted = true;


                            counters.forEach(
                                (counter, index) => {

                                    setTimeout(
                                        () => {

                                            animateCounter(
                                                counter
                                            );

                                        },
                                        index * 150
                                    );

                                }
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       08. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );


                                const target =
                                    link.getAttribute(
                                        "href"
                                    );


                                if (
                                    target ===
                                    `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       09. SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        15;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       10. CUSTOM CURSOR
    ===================================================== */

    const cursorSupported =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursorSupported &&
        cursorDot &&
        cursorOutline
    ) {

        body.classList.add(
            "cursor-active"
        );


        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;

                mouseY = event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            outlineX +=
                (mouseX - outlineX) * 0.14;

            outlineY +=
                (mouseY - outlineY) * 0.14;


            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .skill-card, .project-card, .stat-card"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       11. HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        cursorSupported
    ) {

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


                const rotateY =
                    ((x / rect.width) - 0.5) * 8;


                const rotateX =
                    ((y / rect.height) - 0.5) * -8;


                const card =
                    heroVisual.querySelector(
                        ".hero-card"
                    );


                if (!card) return;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                const card =
                    heroVisual.querySelector(
                        ".hero-card"
                    );


                if (!card) return;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(2deg)
                     rotateY(-5deg)`;

            }
        );

    }


    /* =====================================================
       12. PROJECT CARD TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (cursorSupported) {

        projectCards.forEach(
            (card) => {

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


                        const rotateY =
                            ((x / rect.width) - 0.5) * 4;


                        const rotateX =
                            ((y / rect.height) - 0.5) * -4;


                        card.style.transform =
                            `perspective(1000px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-8px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       13. FLOATING BADGES MOUSE EFFECT
    ===================================================== */

    const floatingBadges =
        document.querySelectorAll(
            ".floating-tech"
        );


    if (
        heroVisual &&
        cursorSupported
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const relativeX =
                    (
                        event.clientX -
                        rect.left -
                        rect.width / 2
                    ) / rect.width;


                const relativeY =
                    (
                        event.clientY -
                        rect.top -
                        rect.height / 2
                    ) / rect.height;


                floatingBadges.forEach(
                    (badge, index) => {

                        const multiplier =
                            (index + 1) * 7;


                        badge.style.transform =
                            `translate(
                                ${relativeX * multiplier}px,
                                ${relativeY * multiplier}px
                            )`;

                    }
                );

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                floatingBadges.forEach(
                    (badge) => {

                        badge.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       14. KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /* "/" = Projects */

            if (
                event.key === "/" &&
                !isTypingField()
            ) {

                event.preventDefault();


                const projects =
                    document.getElementById(
                        "projects"
                    );


                if (projects) {

                    projects.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }


            /* "H" = Home */

            if (
                event.key.toLowerCase() === "h" &&
                !isTypingField()
            ) {

                const home =
                    document.getElementById(
                        "home"
                    );


                if (home) {

                    home.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }


            /* Escape = close menu */

            if (event.key === "Escape") {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                }


                body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );


    function isTypingField() {

        const active =
            document.activeElement;


        if (!active) return false;


        const tag =
            active.tagName.toLowerCase();


        return (
            tag === "input" ||
            tag === "textarea" ||
            tag === "select" ||
            active.isContentEditable
        );

    }


    /* =====================================================
       15. HERO MOUSE PARALLAX
    ===================================================== */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    if (
        heroContent &&
        cursorSupported
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX -
                        window.innerWidth / 2
                    ) / window.innerWidth;


                const y =
                    (
                        event.clientY -
                        window.innerHeight / 2
                    ) / window.innerHeight;


                heroContent.style.transform =
                    `translate(
                        ${x * 4}px,
                        ${y * 3}px
                    )`;

            }
        );

    }


    /* =====================================================
       16. PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.title =
                    "Come back soon 👋";

            } else {

                document.title =
                    "Pranav Masal | Python Developer";

            }

        }
    );


    /* =====================================================
       17. RESIZE HANDLER
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navMenu &&
                menuToggle
            ) {

                navMenu.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );


    /* =====================================================
       18. CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%cPranav Masal",
        `
        font-size: 24px;
        font-weight: bold;
        color: #635bff;
        `
    );


    console.log(
        "%cPython Developer • Backend • AI",
        `
        font-size: 12px;
        color: #8b5cf6;
        `
    );


    console.log(
        "%cBuilt with HTML, CSS & JavaScript.",
        `
        font-size: 11px;
        color: #06b6d4;
        `
    );

});