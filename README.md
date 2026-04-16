# 🎭 Playwright E2E Tests — manuelaklenke.com

End-to-end test suite for [manuelaklenke.com](https://manuelaklenke.com), maintained by the QA team. Tests run automatically after every deployment and results are published to GitHub Pages.

---

## 📊 Test Results

Latest report: **[https://georget88.github.io/playwright/](https://georget88.github.io/playwright/)**

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
├── navigation.spec.ts    # Navbar links, footer, 404 page
├── home.spec.ts          # Home page load and content
├── about.spec.ts         # About page load
├── portfolio.spec.ts     # Portfolio page load
├── events.spec.ts        # Events page load
├── contact.spec.ts       # Contact form fields and validation
├── accessibility.spec.ts # Skip link and image alt text
└── language.spec.ts      # Language switcher (EN / DE / RO)
```

---

## ✅ Test Coverage

| File | Tests | What is covered |
|---|---|---|
| navigation.spec.ts | 7 | Navbar, footer, all page links, 404 |
| accessibility.spec.ts | 10 | Skip-to-content link, image alt text on all pages |
| language.spec.ts | 4 | Language switcher visibility and switching |
| contact.spec.ts | 4 | Form fields, validation, submit behaviour |
| home.spec.ts | 2 | Page load, main content area |
| about.spec.ts | 1 | Page load |
| portfolio.spec.ts | 1 | Page load |
| events.spec.ts | 1 | Page load |
| **Total** | **30** | |

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

Tests are triggered automatically after every push to the `main` branch of [GeorgeT88/my-bmad-project](https://github.com/GeorgeT88/my-bmad-project):

```
📦 Push to my-bmad-project
        ↓
🌐 Vercel deploys the app (~2 min)
        ↓
⚡ GitHub Actions triggers E2E Tests
        ↓
🎭 30 tests run against https://manuelaklenke.com
        ↓
📊 HTML report published to GitHub Pages
```

Tests can also be triggered manually from **Actions → E2E Tests → Run workflow**.

---

## 🏷️ Run Name Convention

| Trigger | Run name |
|---|---|
| Push via app repo | `E2E Tests — triggered by Vercel deploy` |
| Manual | `E2E Tests — manual run` |
| Nightly schedule (07:00 UTC) | `E2E Tests — nightly run` |

---

## ⚠️ Known App Issues

The following issues exist in the app and are documented in the tests:

- `/about`, `/portfolio`, `/contact` — missing `<h1>` element (accessibility)
- `ipapi.co` CORS errors on all pages — caused by IP-based language detection on a free-tier API
