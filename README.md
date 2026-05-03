# 🎭 Playwright E2E Tests — manuelaklenke.com

End-to-end test suite for [manuelaklenke.com](https://manuelaklenke.com). Tests run automatically after every deployment and results are published to GitHub Pages.

---

## 📊 Test Report

Latest report: **[https://georget88.github.io/manuelaklenke-playwright-e2e/](https://georget88.github.io/manuelaklenke-playwright-e2e/)**

---

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- TypeScript
- GitHub Actions — CI/CD pipeline
- GitHub Pages — HTML report hosting

---

## 📁 Project Structure

```
tests/
├── global.setup.ts       # Global setup (Zscaler proxy cookie handling)
├── helpers.ts            # Shared test helpers
├── navigation.spec.ts    # Navbar links, footer, 404 page
├── home.spec.ts          # Home page load and content
├── about.spec.ts         # About page load
├── portfolio.spec.ts     # Portfolio page load
├── events.spec.ts        # Events page load
├── contact.spec.ts       # Contact form fields and validation
├── accessibility.spec.ts # Skip-to-content link, image alt text, single h1
└── language.spec.ts      # Language switcher (EN / DE / RO)
```

---

## ✅ Test Coverage

| File | Tests | What is covered |
|---|---|---|
| navigation.spec.ts | 7 | Navbar, footer, all page links, 404 |
| accessibility.spec.ts | 15 | Skip-to-content link, image alt text, single h1 on all 5 public pages |
| language.spec.ts | 4 | Language switcher visibility and switching |
| contact.spec.ts | 4 | Form fields, validation, submit behaviour |
| home.spec.ts | 2 | Page load, main content area |
| about.spec.ts | 1 | Page load |
| portfolio.spec.ts | 1 | Page load |
| events.spec.ts | 1 | Page load |
| **Total** | **35** | |

---

## 🚀 Running Tests Locally

**Install dependencies:**
```bash
npm install
npx playwright install chromium
```

**Run all tests (headless):**
```bash
npm test
```

**Run with browser visible:**
```bash
npm run test:headed
```

**Open interactive UI mode:**
```bash
npm run test:ui
```

**View last report:**
```bash
npm run test:report
```

---

## ⚙️ CI/CD Pipeline

Tests are triggered automatically by [GeorgeT88/manuelaklenke-web](https://github.com/GeorgeT88/manuelaklenke-web) after every push to `main`, once the Vercel production deployment is confirmed live:

```
📦 Push to manuelaklenke-web
        ↓
🔨 Build passes
        ↓
⏳ Vercel deployment confirmed live
        ↓
⚡ repository_dispatch: vercel-deploy
        ↓
🎭 35 tests run against https://manuelaklenke.com (Chromium)
        ↓
📊 HTML report published to GitHub Pages

(in parallel: 🔬 Selenium E2E, 🌲 Cypress E2E)
(after all E2E: 🔒 Snyk SCA + 🔎 Semgrep SAST in parallel)
```

Tests can also be triggered manually from **Actions → E2E Tests → Run workflow**, and run on a nightly schedule at **07:00 UTC**.

---

## 🏷️ Run Name Convention

| Trigger | Run name |
|---|---|
| Push via app repo | `E2E Tests — triggered by Vercel deploy` |
| Manual | `E2E Tests — manual run` |
| Nightly schedule (07:00 UTC) | `E2E Tests — nightly run` |
