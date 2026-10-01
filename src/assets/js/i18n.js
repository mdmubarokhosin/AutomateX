/*
 * AutomateX — i18n ইঞ্জিন
 * data-i18n="key" অ্যাট্রিবিউট ধারণ করা উপাদানগুলোর টেক্সট প্রতিস্থাপন করে।
 * ভাষা localStorage এ সংরক্ষিত হয় ও পেজ জুড়ে বজায় থাকে।
 * সমর্থিত ভাষা: bn (বাংলা), en (English)
 */

(function () {
  "use strict";

  const SUPPORTED_LANGS = ["en", "bn"];
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "automatex-lang";

  function getStoredLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    // ব্রাউজার ভাষা সনাক্তকরণ
    try {
      const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
      if (nav.indexOf("bn") === 0) return "bn";
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function getDict(lang) {
    const dict = window.AUTOMATEX_I18N || {};
    return dict[lang] || dict[DEFAULT_LANG] || {};
  }

  function applyTranslations(lang) {
    const dict = getDict(lang);
    document.documentElement.setAttribute("lang", lang);

    // data-i18n সহ উপাদান
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (node) {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key]) {
        // HTML ট্যাগ বা প্লেইন টেক্সট নির্বাচন
        if (node.hasAttribute("data-i18n-html")) {
          node.innerHTML = dict[key];
        } else {
          node.textContent = dict[key];
        }
      }
      node.classList.add("i18n-ready");
    });

    // placeholder অনুবাদ
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      const key = node.getAttribute("data-i18n-placeholder");
      if (key && dict[key]) node.setAttribute("placeholder", dict[key]);
    });

    // aria-label অনুবাদ
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      const key = node.getAttribute("data-i18n-aria");
      if (key && dict[key]) node.setAttribute("aria-label", dict[key]);
    });

    // ভাষা সুইচার বোতাম টেক্সট আপডেট
    document.querySelectorAll("[data-lang-current]").forEach(function (node) {
      node.textContent = lang === "bn" ? "বাংলা" : "English";
    });

    // অ্যাক্টিভ অপশন চিহ্নিত করা
    document.querySelectorAll("[data-lang-option]").forEach(function (node) {
      const val = node.getAttribute("data-lang-option");
      if (val === lang) node.classList.add("active");
      else node.classList.remove("active");
    });
  }

  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    setStoredLang(lang);
    applyTranslations(lang);
    document.dispatchEvent(new CustomEvent("automatex:langchange", { detail: { lang: lang } }));
  }

  // প্রাথমিক প্রয়োগ — DOM রেডি হলেই
  function init() {
    const lang = getStoredLang();
    applyTranslations(lang);

    // ভাষা সুইচার ইন্টারঅ্যাকশন
    const switchers = document.querySelectorAll(".lang-switcher");
    switchers.forEach(function (switcher) {
      const btn = switcher.querySelector(".lang-switcher-btn");
      const menu = switcher.querySelector(".lang-switcher-menu");

      if (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          switcher.classList.toggle("open");
          // অন্যান্য সুইচার বন্ধ
          document.querySelectorAll(".lang-switcher.open").forEach(function (s) {
            if (s !== switcher) s.classList.remove("open");
          });
        });
      }

      if (menu) {
        const options = menu.querySelectorAll("[data-lang-option]");
        options.forEach(function (opt) {
          opt.addEventListener("click", function (e) {
            e.preventDefault();
            const val = opt.getAttribute("data-lang-option");
            setLang(val);
            switcher.classList.remove("open");
          });
        });
      }
    });

    // বাইরে ক্লিকে মেনু বন্ধ
    document.addEventListener("click", function () {
      document.querySelectorAll(".lang-switcher.open").forEach(function (s) {
        s.classList.remove("open");
      });
    });

    // এস্কেপ কী-তে মেনু বন্ধ
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".lang-switcher.open").forEach(function (s) {
          s.classList.remove("open");
        });
      }
    });
  }

  // যদি DOM ইতিমধ্যে রেডি থাকে
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // গ্লোবাল এক্সপোর্ট
  window.AutomatexI18n = {
    setLang: setLang,
    getLang: getStoredLang,
    supported: SUPPORTED_LANGS,
  };
})();
