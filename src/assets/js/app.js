/*
Template Name: Automatex - Coworking Space Website Tailwind CSS 4 Template
Version: 1.0.0
Author: Unifato
Website: https://unifato.com/
Email: unifato.themes@gmail.com
File: App js
*/

// i18n: অনুবাদ ডিকশনারি ও ইঞ্জিন প্রথমে লোড করা হয় যাতে পেজ রেন্ডারের আগেই ভাষা প্রয়োগ হয়
import "./translations.js";
import "./i18n.js";

// CSS File Import
import "../css/style.css";


// Preline Plugin File Import
import "preline";

import './components/gallary';
import './components/animation';
import './components/swiper';

var stickyNav = document.querySelector(".nav-sticky")

if (stickyNav) {
    window.addEventListener("scroll", function () {
        var scTop = window.pageYOffset || document.documentElement.scrollTop

        if (scTop >= 100) {
            stickyNav.classList.add("nav-sticky-on")
        } else {
            stickyNav.classList.remove("nav-sticky-on")
        }
    })
}



document.addEventListener("DOMContentLoaded", () => {
    let currentPath = window.location.pathname.replace(/\/$/, "");
    if (currentPath === "" || currentPath === "/") currentPath = "/index.html";

    document.querySelectorAll("header nav a[href], header #mobile-menu a[href], footer a[href]").forEach((link) => {
        let href = link.getAttribute("href")?.replace(/\/$/, "");
        if (!href) return;

        // Resolve relative href to absolute path for accurate comparison
        if (!href.startsWith("/")) {
            href = "/" + href;
        }

        if (currentPath === href || currentPath.endsWith(href)) {
            link.classList.add("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/\/$/, "")

    document.querySelectorAll("#offcanvasSidebar ul a[href]").forEach((link) => {
        const href = link.getAttribute("href")?.replace(/\/$/, "")
        if (!href) return

        if (currentPath === href || currentPath.endsWith(href)) {
            link.classList.add("active")
        }
    })
})
// Video Play/Pause Control
document.addEventListener("DOMContentLoaded", () => {
    const videoBtn = document.getElementById("video-control-btn");
    const videoElement = document.getElementById("promo-video");
    const playIcon = document.getElementById("video-play-icon");
    const pauseIcon = document.getElementById("video-pause-icon");

    if (videoBtn && videoElement) {
        videoBtn.addEventListener("click", () => {
            if (videoElement.paused) {
                videoElement.play();
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
            } else {
                videoElement.pause();
                playIcon.classList.remove("hidden");
                pauseIcon.classList.add("hidden");
            }
        });
    }
});

// Hero Video Toggle (Index Page)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    const toggleBtn = document.getElementById('video-toggle-btn');
    const toggleIcon = document.getElementById('video-toggle-icon');

    if (video && toggleBtn && toggleIcon) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (video.paused) {
                video.play();
                toggleIcon.classList.remove('lucide--play');
                toggleIcon.classList.add('lucide--pause');
            } else {
                video.pause();
                toggleIcon.classList.remove('lucide--pause');
                toggleIcon.classList.add('lucide--play');
            }
        });
    }
});

// CTA Video Toggle (About Page)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('about-cta-video');
    const toggleBtn = document.getElementById('about-video-toggle-btn');
    const toggleIcon = document.getElementById('about-video-toggle-icon');

    if (video && toggleBtn && toggleIcon) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (video.paused) {
                video.play();
                toggleIcon.classList.remove('lucide--play');
                toggleIcon.classList.add('lucide--pause');
            } else {
                video.pause();
                toggleIcon.classList.remove('lucide--pause');
                toggleIcon.classList.add('lucide--play');
            }
        });
    }
});

// Results Video Toggle (Index Page)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('results-video');
    const toggleBtn = document.getElementById('results-video-btn');

    if (video && toggleBtn) {
        const playIcon = toggleBtn.querySelector('.play-icon');
        const pauseIcon = toggleBtn.querySelector('.pause-icon');

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (video.paused) {
                video.play();
                if (playIcon) playIcon.classList.add('hidden');
                if (pauseIcon) pauseIcon.classList.remove('hidden');
            } else {
                video.pause();
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
            }
        });
    }
});

// Hero Typing Effect (ভাষা-সচেতন)
document.addEventListener('DOMContentLoaded', () => {
    const typingSpan = document.getElementById('typing-text');
    if (!typingSpan) return;

    // ভাষা অনুযায়ী শব্দ — i18n সিস্টেমের সাথে সামঞ্জস্যপূর্ণ
    const wordsByLang = {
        en: ["Automate", "Execute", "Manage"],
        bn: ["অটোমেট", "এক্সিকিউট", "পরিচালনা"]
    };

    function currentLang() {
        return (document.documentElement.getAttribute("lang") || "en").indexOf("bn") === 0 ? "bn" : "en";
    }

    let words = wordsByLang[currentLang()] || wordsByLang.en;
    let wordIndex = 0;
    let charIndex = words[0].length;
    let isDeleting = true;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // Zero-width space ensures the cursor stays correctly aligned even when the text is empty
        typingSpan.textContent = currentWord.substring(0, charIndex) || '\u200B';

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // ভাষা পরিবর্তনে শব্দ তালিকা আপডেট
    document.addEventListener("automatex:langchange", function (e) {
        const lang = e.detail.lang;
        words = wordsByLang[lang] || wordsByLang.en;
        wordIndex = 0;
        charIndex = words[0].length;
        isDeleting = true;
    });

    // Start the effect after initial pause
    setTimeout(type, 2000);
});


document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('step');
    const step1 = document.getElementById('step-01');
    const step2 = document.getElementById('step-02');
    const step3 = document.getElementById('step-03');

    window.addEventListener('scroll', () => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrollDistance = -rect.top;
        const scrollHeight = rect.height - window.innerHeight;

        let progress = 0;
        if (scrollHeight > 0) {
            progress = Math.max(0, Math.min(1, scrollDistance / scrollHeight));
        }

        let activeStep = 1;
        if (progress > 0.33 && progress <= 0.66) activeStep = 2;
        else if (progress > 0.66) activeStep = 3;

        if (step1 && step2 && step3) {
            if (window.innerWidth >= 768) {
                step1.style.opacity = activeStep === 1 ? '1' : '0';
                step1.style.pointerEvents = activeStep === 1 ? 'auto' : 'none';

                step2.style.opacity = activeStep === 2 ? '1' : '0';
                step2.style.pointerEvents = activeStep === 2 ? 'auto' : 'none';

                step3.style.opacity = activeStep === 3 ? '1' : '0';
                step3.style.pointerEvents = activeStep === 3 ? 'auto' : 'none';
            } else {
                step1.style.opacity = '';
                step1.style.pointerEvents = '';
                step2.style.opacity = '';
                step2.style.pointerEvents = '';
                step3.style.opacity = '';
                step3.style.pointerEvents = '';
            }
        }
    });
});