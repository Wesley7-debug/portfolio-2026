# Portfolio v3

A modern, animation-rich portfolio site built with **Next.js 16**, **GSAP**, **Lenis**, and **Tailwind CSS v4**.

## Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router) |
| UI            | React 19, Tailwind CSS v4                     |
| Animations    | GSAP + ScrollTrigger                          |
| Smooth Scroll | Lenis                                         |
| Icons         | Lucide React                                  |
| Fonts         | Inter, Sora, BitcountGridSingle (custom)      |

## Project Structure

```
app/
├── layout.tsx                  # Root layout with Header + metadata
├── page.tsx                    # Home page (Hero section)
├── globals.css                 # Tailwind imports, fonts, modal keyframes
└── components/
    ├── Header.tsx              # Fixed header — composes column sub-components
    ├── Hero.tsx                # Main hero — orchestrates text animation, marquee, modal
    ├── header/
    │   ├── IntroColumn.tsx     # Profile intro, avatar, location
    │   ├── PositionColumn.tsx  # Role, freelance info, project costs
    │   ├── RecognitionColumn.tsx # Awards, badges, highlights
    │   ├── BrandsColumn.tsx    # Client brand list
    │   └── ConnectColumn.tsx   # Social links, CTA buttons
    ├── hero/
    │   ├── AnimatedTextBlock.tsx   # Word-by-word stagger text component
    │   ├── MarqueeSection.tsx      # Infinite-scrolling image marquee
    │   ├── ScrollProgressBar.tsx   # Scroll-driven progress indicator
    │   └── hooks/
    │       ├── useLenis.ts         # Lenis smooth-scroll integration
    │       └── useMarqueeScroll.ts # Velocity-responsive marquee logic
    └── ui/
        ├── CornerButton.tsx    # Styled button with corner accents
        ├── ProfileAvatar.tsx   # Gradient avatar placeholder
        ├── ProjectModal.tsx    # Full-screen hover-triggered project modal
        ├── SectionLabel.tsx    # Column header label with purple dot
        └── TagBadge.tsx        # Pill badge (default + outline variants)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Modular Architecture** — Header and Hero split into focused, reusable sub-components
- **Scroll-Driven Text Animation** — Words stagger in/out in sync with scroll position (GSAP + ScrollTrigger)
- **Velocity-Responsive Marquee** — Infinite-scrolling image carousel speeds up with scroll velocity
- **Project Hover Modal** — Hover over marquee images to trigger a full-screen project detail overlay (press `Esc` or click **Close** / **Cancel** to dismiss)
- **Lenis Smooth Scroll** — Butter-smooth scrolling via the `useLenis` hook
- **Fixed Header** — Multi-column info header stays pinned while content scrolls beneath

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```
