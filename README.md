<div align="center">

# 🚀 Manikant Kumar — Developer Portfolio

<a href="https://github.com/manikantbindass/Portfolio">
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=800&size=28&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=AI+Developer;Full+Stack+Engineer;Blockchain+Builder;Web3+Innovator" alt="Typing SVG" />
</a>

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF0070?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  <a href="https://github.com/manikantbindass/Portfolio/stargazers">
    <img src="https://img.shields.io/github/stars/manikantbindass/Portfolio?style=social" />
  </a>
  <a href="https://github.com/manikantbindass/Portfolio/forks">
    <img src="https://img.shields.io/github/forks/manikantbindass/Portfolio?style=social" />
  </a>
</p>

**[🌐 Live Demo](https://manikant.dev)** · **[📬 Contact](mailto:manikant.dev.ai@gmail.com)** · **[💼 LinkedIn](https://www.linkedin.com/in/manikantbindass/)**

</div>

---

## 🎨 Design System — Neumorphism (Soft UI)

This portfolio is built on a **strictly neumorphic design system**:

- 🌫️ **Background**: `#E0E5EC` — cool clay monochromatic base
- 💡 **Dual shadows**: light-source top-left (`rgba(255,255,255,0.5)`) + dark bottom-right (`rgb(163,177,198,0.6)`)
- 🔵 **Accent**: `#6C63FF` violet + `#38B2AC` teal
- 📐 **Rounded**: 32px cards, 16px buttons — pillowed, organic
- ♿ **WCAG AA**: 7.5:1 primary text contrast ratio
- 🌙 **Dark mode**: full dark neumorphic variant with adaptive shadows

---

## ✨ Features

| Feature | Status |
|---|---|
| 🎭 Framer Motion animations (fade-in, hover-lift, press depth) | ✅ |
| 🌙 Dark mode toggle with localStorage persistence | ✅ |
| 📱 Fully responsive (mobile, tablet, desktop) | ✅ |
| 🔗 GitHub API integration — live project fetch | ✅ |
| ⌨️ Typewriter animation hero title | ✅ |
| 🌊 Floating blob/ambient animations | ✅ |
| 🗂️ Linktree-style social links section | ✅ |
| 📧 Contact form with mailto integration | ✅ |
| 🎯 SEO optimized (meta tags, OG, Twitter cards) | ✅ |
| ⌨️ Keyboard navigation & focus states | ✅ |
| 🖼️ Profile photo with rotating gradient ring + float animation | ✅ |

---

## 📁 Folder Structure

```
d:/Portfolio/
├── app/
│   ├── globals.css          # Neumorphic design tokens + Tailwind
│   ├── layout.tsx           # Root layout + SEO metadata
│   └── page.tsx             # Main page composition
├── components/
│   ├── Navbar.tsx           # Sticky navbar + mobile hamburger
│   ├── Hero.tsx             # Typewriter + profile image + CTA
│   ├── About.tsx            # Bio + education + skills grid
│   ├── Experience.tsx       # Animated timeline
│   ├── Projects.tsx         # GitHub API + project cards
│   ├── Certifications.tsx   # Cert cards + stats
│   ├── Contact.tsx          # Form + Linktree-style socials
│   └── Footer.tsx           # Footer with tech badges
├── public/
│   └── profile.jpg          # Professional headshot
├── tailwind.config.ts       # Neumorphic shadow tokens
└── next.config.ts           # Next.js image config
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Plus Jakarta Sans + DM Sans |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/manikantbindass/Portfolio.git

# Navigate to the project
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

No environment variables required — the GitHub API is public and doesn't need a token for basic public repo reads.

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**
3. Import your `Portfolio` repository
4. Vercel auto-detects Next.js — click **"Deploy"**
5. Done! Your portfolio is live 🎉

```bash
# Or deploy via Vercel CLI
npm i -g vercel
vercel deploy
```

### Netlify

1. Go to [netlify.com](https://netlify.com) → **"New site from Git"**
2. Select your `Portfolio` repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add the Netlify Next.js plugin in `netlify.toml`:

```toml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

---

## 📸 Screenshots

| Section | Preview |
|---|---|
| Hero | Profile image with typewriter animation and CTA buttons |
| About | Skills grid with neumorphic cards and education card |
| Experience | Vertical timeline with animated entries |
| Projects | Live GitHub API cards with language tags |
| Certifications | Credential cards with verified badges |
| Contact | Contact form + Linktree-style social links |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🧑‍💻 About Manikant

> **"Full Stack Dev | Building with Blockchain × AI | LLMs in the lab, Web3 in the wild"**

- 🎓 B.Tech CSE (Blockchain Technology) — Parul University, 2023–2027
- 🌐 Blockchain + AI + Full Stack engineer
- 📍 Vadodara, Gujarat, India
- 🔗 [linktr.ee/manikantbindass](https://linktr.ee/manikantbindass)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/manikantbindass">Manikant Kumar</a></p>
  <p>
    <a href="https://github.com/manikantbindass">GitHub</a> ·
    <a href="https://www.linkedin.com/in/manikantbindass/">LinkedIn</a> ·
    <a href="https://x.com/ManikantBindass">Twitter</a> ·
    <a href="https://linktr.ee/manikantbindass">Linktree</a>
  </p>
</div>
