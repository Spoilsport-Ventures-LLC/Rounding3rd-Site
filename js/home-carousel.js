document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) {
        return;
    }

    const showcaseSection = carousel.closest(".showcase-section");

    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");

    if (!slides.length || !prevButton || !nextButton) {
        return;
    }

    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    if (activeIndex < 0) {
        activeIndex = 0;
    }

    const autoAdvanceMs = 5000;
    let autoAdvanceId = null;
    let isSectionFullyVisible = true;

    const wrapIndex = (index) => (index + slides.length) % slides.length;
    const progressButton = nextButton.classList.contains("showcase-arrow--timed") ? nextButton : null;

    if (progressButton) {
        progressButton.style.setProperty("--showcase-progress-duration", `${autoAdvanceMs}ms`);
    }

    const render = () => {
        const prevIndex = wrapIndex(activeIndex - 1);
        const nextIndex = wrapIndex(activeIndex + 1);

        slides.forEach((slide, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === prevIndex && !isActive;
            const isNext = index === nextIndex && !isActive;

            slide.classList.toggle("is-active", isActive);
            slide.classList.toggle("is-prev", isPrev);
            slide.classList.toggle("is-next", isNext);
            slide.setAttribute("aria-current", isActive ? "true" : "false");
            slide.setAttribute("aria-hidden", isActive ? "false" : "true");
        });
    };

    const stopAutoAdvance = () => {
        if (autoAdvanceId !== null) {
            window.clearInterval(autoAdvanceId);
            autoAdvanceId = null;
        }

        if (progressButton) {
            progressButton.classList.remove("is-timing");
        }
    };

    const restartProgress = () => {
        if (!progressButton) {
            return;
        }

        progressButton.classList.remove("is-timing");
        void progressButton.offsetWidth;
        progressButton.classList.add("is-timing");
    };

    const startAutoAdvance = () => {
        if (!isSectionFullyVisible) {
            stopAutoAdvance();
            return;
        }

        stopAutoAdvance();
        autoAdvanceId = window.setInterval(() => {
            activeIndex = wrapIndex(activeIndex + 1);
            render();
            restartProgress();
        }, autoAdvanceMs);
        restartProgress();
    };

    prevButton.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        render();
        startAutoAdvance();
    });

    nextButton.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % slides.length;
        render();
        startAutoAdvance();
    });

    slides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
            activeIndex = index;
            render();
            startAutoAdvance();
        });
    });

    render();
    startAutoAdvance();

    if (showcaseSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isFullyVisible = entry.intersectionRatio >= 0.98;

                if (isFullyVisible === isSectionFullyVisible) {
                    return;
                }

                isSectionFullyVisible = isFullyVisible;

                if (isSectionFullyVisible) {
                    startAutoAdvance();
                } else {
                    stopAutoAdvance();
                }
            },
            {
                threshold: [0, 0.98, 1]
            }
        );

        observer.observe(showcaseSection);
    }
});
