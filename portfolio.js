        /* =====================================================
           MOBILE MENU
        ===================================================== */

        const menuBtn =
            document.getElementById("menuBtn");

        const navLinks =
            document.getElementById("navLinks");

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const icon =
                menuBtn.querySelector("i");

            if (navLinks.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* =====================================================
           CLOSE MENU AFTER CLICK
        ===================================================== */

        document
            .querySelectorAll(".nav-links a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    navLinks.classList.remove("open");

                    const icon =
                        menuBtn.querySelector("i");

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                });

            });


        /* =====================================================
           DARK / LIGHT MODE
        ===================================================== */

        const themeBtn =
            document.getElementById("themeBtn");

        const savedTheme =
            localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light");

        }


        function updateThemeIcon() {

            const icon =
                themeBtn.querySelector("i");

            if (
                document.body.classList.contains("light")
            ) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        }

        updateThemeIcon();


        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("light");

            const theme =
                document.body.classList.contains("light")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "portfolio-theme",
                theme
            );

            updateThemeIcon();

        });
        

        /* =====================================================
           ACTIVE NAVBAR
        ===================================================== */

        const sections =
            document.querySelectorAll("section[id]");

        const navItems =
            document.querySelectorAll(".nav-links a");


        window.addEventListener("scroll", function () {

            let current = "";

            sections.forEach(function (section) {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    current =
                        section.getAttribute("id");

                }

            });


            navItems.forEach(function (link) {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add("active");

                }

            });

        });


        /* =====================================================
           SCROLL REVEAL
        ===================================================== */

        const revealElements =
            document.querySelectorAll(".reveal");


        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });


        /* =====================================================
           COUNTERS
        ===================================================== */

        const counters =
            document.querySelectorAll("[data-count]");

        let counterStarted = false;


        function startCounters() {

            if (counterStarted) return;

            const stats =
                document.querySelector(".stats");

            if (!stats) return;


            const position =
                stats.getBoundingClientRect().top;

            if (
                position <
                window.innerHeight * 0.85
            ) {

                counterStarted = true;


                counters.forEach(function (counter) {

                    const target =
                        Number(
                            counter.dataset.count
                        );

                    let current = 0;

                    const duration = 1500;

                    const startTime =
                        performance.now();


                    function update(time) {

                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );

                        current =
                            Math.floor(
                                progress * target
                            );

                        let suffix = "";

                        if (
                            target === 100
                        ) {

                            suffix = "%";

                        } else {

                            suffix = "+";

                        }

                        counter.textContent =
                            current + suffix;


                        if (progress < 1) {

                            requestAnimationFrame(
                                update
                            );

                        }

                    }

                    requestAnimationFrame(update);

                });

            }

        }


        window.addEventListener(
            "scroll",
            startCounters
        );


        /* =====================================================
           SKILL PROGRESS BARS
        ===================================================== */

        const progressBars =
            document.querySelectorAll(
                ".progress span"
            );


        const skillObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            const width =
                                entry.target.dataset.width;

                            entry.target.style.width =
                                width;

                            skillObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        progressBars.forEach(function (bar) {

            skillObserver.observe(bar);

        });


        /* =====================================================
           PROJECT FILTER
        ===================================================== */

        const filterButtons =
            document.querySelectorAll(".filter-btn");

        const projectCards =
            document.querySelectorAll(".project-card");


        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add("active");


                    const filter =
                        button.dataset.filter;


                    projectCards.forEach(
                        function (card) {

                            const category =
                                card.dataset.category;


                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                card.style.display =
                                    "block";

                                setTimeout(
                                    function () {

                                        card.style.opacity =
                                            "1";

                                        card.style.transform =
                                            "translateY(0)";

                                    },
                                    20
                                );

                            } else {

                                card.style.opacity =
                                    "0";

                                card.style.transform =
                                    "translateY(15px)";

                                setTimeout(
                                    function () {

                                        card.style.display =
                                            "none";

                                    },
                                    300
                                );

                            }

                        }
                    );

                }
            );

        });


        /* =====================================================
           FAQ ACCORDION
        ===================================================== */

        const faqQuestions =
            document.querySelectorAll(
                ".faq-question"
            );


        faqQuestions.forEach(function (question) {

            question.addEventListener(
                "click",
                function () {

                    const item =
                        question.parentElement;


                    document
                        .querySelectorAll(".faq-item")
                        .forEach(function (faq) {

                            if (faq !== item) {

                                faq.classList.remove(
                                    "open"
                                );

                            }

                        });


                    item.classList.toggle("open");

                }
            );

        });


        /* =====================================================
           CONTACT FORM
        ===================================================== */

        const contactForm =
            document.getElementById(
                "contactForm"
            );

        const formMessage =
            document.getElementById(
                "formMessage"
            );


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                formMessage.style.display =
                    "block";


                formMessage.textContent =
                    "Your message has been submitted successfully!";


                contactForm.reset();


                setTimeout(
                    function () {

                        formMessage.style.display =
                            "none";

                    },
                    5000
                );

            }
        );


        /* =====================================================
           NEWSLETTER
        ===================================================== */

        const newsletterForm =
            document.getElementById(
                "newsletterForm"
            );


        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    newsletterForm.querySelector(
                        "input"
                    );


                alert(
                    "Thank you for subscribing!"
                );

                input.value = "";

            }
        );


        /* =====================================================
           BACK TO TOP
        ===================================================== */

        const backTop =
            document.getElementById(
                "backTop"
            );


        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    backTop.classList.add("show");

                } else {

                    backTop.classList.remove("show");

                }

            }
        );


        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        /* =====================================================
           HERO MOUSE EFFECT
        ===================================================== */

        const heroImage =
            document.querySelector(
                ".hero-image-area"
            );


        document.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth <= 900
                ) return;


                const x =
                    (window.innerWidth / 2 -
                    event.clientX) / 80;

                const y =
                    (window.innerHeight / 2 -
                    event.clientY) / 80;


                heroImage.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );


        /* =====================================================
           RESET HERO EFFECT
        ===================================================== */

        document.addEventListener(
            "mouseleave",
            function () {

                heroImage.style.transform =
                    "translate(0,0)";

            }
        );


        /* =====================================================
           CONSOLE
        ===================================================== */

        console.log(
            "Portfolio Website Loaded Successfully!"
        );

