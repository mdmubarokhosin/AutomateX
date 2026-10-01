# AutomateX — AI Agent SaaS Template (বহুভাষিক)

AutomateX একটি আধুনিক, সম্পূর্ণ রেসপন্সিভ AI Agent SaaS ওয়েবসাইট টেমপ্লেট যা Tailwind CSS 4, Vite এবং Handlebars দিয়ে তৈরি। এটি AI স্টার্টআপ, অটোমেশন প্ল্যাটফর্ম, চ্যাটবট, ভার্চুয়াল অ্যাসিস্ট্যান্ট এবং SaaS ব্যবসার জন্য উপযুক্ত।

## ✨ নতুন ফিচার (আপডেট)

- **বহুভাষিক সমর্থন (বাংলা + English)** — JavaScript-চালিত i18n সিস্টেম, ভাষা সুইচার সহ, `localStorage`-এ সংরক্ষিত
- **Noto Serif Bangla ফন্ট** — সব জায়গায় (body ও heading) প্রয়োগকৃত
- **SEO উন্নতি** — Open Graph, Twitter Card মেটা ট্যাগ, `robots.txt`, `sitemap.xml`
- **নিরাপত্তা হেডার** — `_headers` ফাইলে CSP-সদৃশ নিরাপত্তা হেডার
- **Cloudflare Pages প্রস্তুত** — `_redirects`, `_headers`, `wrangler.toml` কনফিগ সহ
- **পরিষ্কার কনটেন্ট** — Lorem Ipsum প্লেসহোল্ডার সরানো হয়েছে (Privacy Policy)
- **পাইরেসি ফাইল অপসারিত** — `NullPHPscript.com.html` মুছে ফেলা হয়েছে

## 📦 ইনস্টলেশন ও বিল্ড

```bash
# ডিপেন্ডেন্সি ইনস্টল
npm install

# ডেভেলপমেন্ট সার্ভার
npm run dev

# প্রোডাকশন বিল্ড
npm run build

# বিল্ড প্রিভিউ
npm run preview
```

বিল্ড আউটপুট `dist/` ডিরেক্টরিতে তৈরি হয়।

## 🌐 বহুভাষিক সিস্টেম

- অনুবাদ ফাইল: `src/assets/js/translations.js` (এখানে `en` ও `bn` অবজেক্ট আছে)
- i18n ইঞ্জিন: `src/assets/js/i18n.js`
- পেজে `data-i18n="key"` অ্যাট্রিবিউট যোগ করে টেক্সট অনুবাদ করা হয়
- ভাষা পছন্দ `localStorage`-এ `automatex-lang` কী-তে সংরক্ষিত
- ব্রাউজার ভাষা স্বয়ংক্রিয়ভাবে সনাক্ত হয় (বাংলা → bn, অন্যথা → en)

### নতুন ভাষা যোগ করতে:
1. `translations.js`-এ একটি নতুন কী (যেমন `hi`) যোগ করুন
2. `i18n.js`-এর `SUPPORTED_LANGS` অ্যারেতে কী যোগ করুন
3. navbar-এ ভাষা অপশন যোগ করুন

## 🚀 GitHub + Cloudflare Pages ডিপ্লয়মেন্ট

### ধাপ ১ — GitHub এ পুশ করুন
```bash
git init
git add .
git commit -m "feat: multilingual support + Noto Serif Bangla + Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### ধাপ ২ — Cloudflare Pages ডিপ্লয়
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git
2. আপনার GitHub রিপোজিটরি নির্বাচন করুন
3. বিল্ড সেটিংস (**Cloudflare ড্যাশবোর্ডে অবশ্যই কনফিগার করতে হবে** — wrangler.toml এ `[build]` সেকশন সাপোর্টেড নয়):
   - **Framework preset:** None
   - **Build command:** `bash cf-build.sh`
   - **Build output directory:** `dist`
   - **Environment variables:**
     - `NODE_VERSION` = `22` (প্রস্তাবিত)
     - `YARN_ENABLE_IMMUTABLE_INSTALLS` = `false` (যদি yarn 4 lockfile সমস্যা দেখা দেয়)
4. **Save and Deploy** ক্লিক করুন

> **নোট ১:** লকফাইল (yarn.lock / bun.lock / package-lock.json) রিপোজিটরিতে নেই এবং `.gitignore` এ ইগনোর করা আছে। এটি ইচ্ছাকৃত — Cloudflare এর yarn 4 প্রতিবার নতুন lockfile তৈরি করবে যাতে lockfile মাইগ্রেশন সমস্যা (`YN0028`) এড়ানো যায়। `cf-build.sh` স্ক্রিপ্ট yarn/npm/pnpm যেকোনো প্যাকেজ ম্যানেজারের সাথে কাজ করে।

> **নোট ২:** wrangler.toml এ শুধু `pages_build_output_dir = "dist"` কনফিগার করা আছে (build কমান্ড ড্যাশবোর্ডে কনফিগার করুন)। Cloudflare Pages এর wrangler.toml `[build]` সেকশন গ্রহণ করে না।

### ধাপ ৩ — কাস্টম ডোমেইন (ঐচ্ছিক)
Pages প্রজেক্ট → Custom domains → ডোমেইন যোগ করুন।

## 📁 প্রজেক্ট কাঠামো

```
AutomateX/
├── public/                 # স্ট্যাটিক অ্যাসেট (images, videos, _redirects, _headers)
├── src/
│   ├── assets/
│   │   ├── css/           # Tailwind + কাস্টম CSS
│   │   └── js/
│   │       ├── app.js          # মূল JS
│   │       ├── i18n.js         # i18n ইঞ্জিন
│   │       ├── translations.js # বাংলা + English অনুবাদ
│   │       └── components/     # swiper, animation, gallery
│   ├── partials/          # Handlebars পার্শিয়াল (navbar, footer, head-css)
│   └── *.html             # পেজ টেমপ্লেট
├── vite.config.js
├── wrangler.toml          # Cloudflare Pages কনফিগ
└── package.json
```

## 🛟 সাপোর্ট

- **ওয়েবসাইট:** [unifato.com](https://unifato.com/)
- **ইমেইল:** unifato.themes@gmail.com

---

AutomateX বেছে নেওয়ার জন্য ধন্যবাদ। 🚀
