# Laksh Sharda — Portfolio

A modern, interactive personal portfolio built with React, TypeScript, and Framer Motion. Features a cinematic intro sequence, smooth scroll-driven navigation, and a space-themed aesthetic.

## Preview

| Intro Screen | Portfolio |
|---|---|
| Full-screen video background with ambient audio | Scroll-driven sections with snappy reveal animations |

## Features

- **Cinematic Intro** — Full-screen looping background video with ambient audio and a mute/unmute toggle
- **Smooth Scroll Navigation** — Fixed navbar with active section highlighting and smooth scrolling to any section
- **About** — Profile photo with subtle blue neon glow accent
- **Experience** — Timeline layout showcasing work experience at U2CA and ThinkingLabs
- **Projects** — Grid of project cards with modal detail views, embedded YouTube demos, and live demo links
- **Skills** — Vertical category rows (Development, Data & ML, Databases, Cloud & DevOps, IoT, Tools) with icon-only display and hover tooltips
- **Achievements** — Carousel highlighting hackathon wins, certifications, and recognitions
- **Education** — Timeline of academic background
- **Contact** — Direct links for phone, email, GitHub, and LinkedIn
- **Scroll Progress Bar** — Visual indicator of page scroll position
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui (Radix primitives) |
| **Animation** | Framer Motion |
| **3D** | Three.js, React Three Fiber, Drei |
| **Routing** | React Router DOM |
| **Backend** | Supabase |
| **Other** | Lucide Icons, Recharts, Zod, React Hook Form |

## Project Structure

```
src/
├── components/
│   ├── intro/          # Intro screen with video + audio
│   ├── sections/       # All portfolio sections (Hero, About, Experience, etc.)
│   ├── projects/       # Project modal and data
│   ├── skills/         # Skills sphere (legacy 3D) and section
│   └── ui/             # shadcn/ui components, Navbar, ScrollProgressBar
├── hooks/              # Custom hooks (scroll progress, focus detection, etc.)
├── pages/              # Index and NotFound pages
├── lib/                # Utility functions
└── integrations/       # Supabase client config
public/
├── audio/              # Background music
├── videos/             # Intro background video
└── *.png / *.jpeg      # Project images, profile photo, favicon
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/lakshsharda/cosmic-navigator.git
cd cosmic-navigator

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
npm run build
npm run preview
```

## License

This project is personal portfolio source code. Feel free to use it as inspiration for your own portfolio.
