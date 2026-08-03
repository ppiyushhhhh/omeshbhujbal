# Omesh Bhujbal – Professional Portfolio Website

A modern, responsive, and high-performance portfolio website developed for **Omesh Bhujbal**, showcasing professional achievements, work experience, certifications, education, and technical expertise. Built using React, TypeScript, Vite, and Tailwind CSS, the application delivers a fast, scalable, and engaging user experience across all devices.

---

## Table of Contents

- Overview
- Project Information
- Features
- Technology Stack
- Project Structure
- Getting Started
- Installation
- Available Scripts
- Deployment
- Domain Configuration (Cloudflare)
- SSL Configuration
- DNS Configuration
- Domain Renewal & Validity
- Performance
- Browser Support
- Future Improvements
- License
- Author / Maintainer

---

# Overview

This portfolio website serves as the centralized digital presence for the client, showcasing professional accomplishments and career progression.

The website includes:

- Professional Introduction
- Career Experience
- Technical Skills
- Certifications
- Educational Background
- Contact Information

Designed with a modern user interface, the application provides a responsive experience across desktop, tablet, and mobile devices.

---

# Project Information

| Property | Details |
|----------|---------|
| Client | Omesh Bhujbal |
| Project Type | Professional Portfolio Website |
| Frontend | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Framework | shadcn/ui (Radix UI primitives) |
| Deployment Platform | Vercel |
| Primary Domain | https://omeshbhujbal.com |
| Secondary Domain | https://omeshbhujbal.info |
| DNS / Redirect Management | Cloudflare |
| SSL Certificate | Cloudflare Universal SSL (Free) |
| Status | Production Ready |

---

# Features

| Feature | Status |
|----------|--------|
| Responsive Design | Implemented |
| Professional UI | Implemented |
| Mobile Friendly | Implemented |
| Smooth Animations (Framer Motion, GSAP) | Implemented |
| 3D Graphics (Three.js) | Implemented |
| Career Timeline | Implemented |
| Certifications Showcase | Implemented |
| Skills Overview | Implemented |
| Contact Section | Implemented |
| SEO-Friendly Structure (sitemap.xml, robots.txt) | Implemented |
| Optimized Production Build | Implemented |
| Automated Testing (Vitest, Playwright) | Implemented |

---

# Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| UI Components | shadcn/ui |
| Component Library | Radix UI |
| Animations | Framer Motion, GSAP |
| Forms | React Hook Form |
| Validation | Zod |
| Data Fetching / State | TanStack React Query |
| Icons | Lucide React |
| Charts | Recharts |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Testing | Vitest, Testing Library, Playwright |

---

# Project Structure

```text
.
├── public/
│   ├── favicon.ico
│   ├── sitemap.xml
│   ├── robots.txt
│   └── llms.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── test/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tailwind.config.ts
└── README.md
```

| Directory | Description |
|-----------|-------------|
| public | Static assets, sitemap, robots.txt, favicon |
| src/assets | Images and media files |
| src/components | Reusable UI components |
| src/components/ui | shadcn/ui component library |
| src/hooks | Custom React hooks |
| src/lib | Utility functions |
| src/pages | Application pages (Index, NotFound) |
| src/test | Unit test setup and specs |
| App.tsx | Root application component |
| main.tsx | Application entry point |

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/omeshbhujbal.git
```

## Navigate to the Project

```bash
cd omeshbhujbal
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build production version |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |

---

# Deployment

The project is deployed on **Vercel**, with Cloudflare managing DNS, redirects, and SSL in front of it.

| Platform | Supported |
|----------|-----------|
| Vercel | Yes (Production) |
| Netlify | Yes |
| AWS / Azure Static Hosting | Yes |
| GitHub Pages | Yes |

Production deployment uses the optimized Vite build process to ensure fast loading and excellent performance.

---

# Domain Configuration (Cloudflare)

Both domains for this project are managed through **Cloudflare**, which handles DNS resolution, the redirect from the secondary domain to the primary domain, and SSL termination.

| Configuration | Value |
|--------------|-------|
| Primary Domain | omeshbhujbal.com |
| Secondary Domain | omeshbhujbal.info |
| DNS / Redirect Provider | Cloudflare |
| Hosting Provider | Vercel |
| Redirect Type | Permanent (HTTP 301) |
| Redirect Target | https://omeshbhujbal.com |
| Canonical URL | https://omeshbhujbal.com |

### Setup Steps

1. **Add both domains to Cloudflare**
   Both `omeshbhujbal.com` and `omeshbhujbal.info` are added as separate sites in the Cloudflare dashboard, and the nameservers for each domain (at the registrar) are updated to point to the Cloudflare-assigned nameservers.

2. **Point the primary domain to Vercel**
   On `omeshbhujbal.com`, DNS records are created (A / CNAME, as required by Vercel) pointing to the Vercel deployment, and the domain is added under the project's domain settings in Vercel.

3. **Redirect the secondary domain to the primary**
   On `omeshbhujbal.info`, a Cloudflare **Redirect Rule** (Rules → Redirect Rules, or a Bulk Redirect for the whole zone) is configured to permanently (301) redirect all traffic — `omeshbhujbal.info/*` — to `https://omeshbhujbal.com/*`. This keeps `www` and non-`www` variants of the secondary domain consistently routed to the canonical domain.

4. **Enforce HTTPS**
   Cloudflare's **Always Use HTTPS** setting is enabled on both zones, so any HTTP request is redirected to HTTPS before the domain-level redirect (for `.info`) is applied.

This configuration provides:

- A single canonical domain for search engines and visitors
- Improved SEO (no duplicate/competing content across two domains)
- Consistent branding and user experience
- Centralized DNS, redirect, and SSL management through Cloudflare

---

# SSL Configuration

SSL/TLS for both domains is provided and managed through Cloudflare.

| Feature | Status |
|---------|--------|
| HTTPS Enabled | Yes |
| Cloudflare Universal SSL | Yes (Free) |
| SSL/TLS Mode | Full (Strict recommended) |
| Automatic Renewal | Yes (handled by Cloudflare) |
| HTTP to HTTPS Redirect | Enabled (Always Use HTTPS) |

All visitors reaching either domain over HTTP are automatically upgraded to HTTPS.

```text
http://omeshbhujbal.com  ──▶  https://omeshbhujbal.com
http://omeshbhujbal.info ──▶  https://omeshbhujbal.com   (redirect + HTTPS)
```

---

# DNS Configuration

## Primary Domain — omeshbhujbal.com (Cloudflare)

| Record | Host | Points To | Proxy Status |
|--------|------|-----------|--------------|
| A / CNAME | @ | Vercel deployment target | Proxied |
| CNAME | www | Primary domain / Vercel | Proxied |

## Secondary Domain — omeshbhujbal.info (Cloudflare)

| Record | Host | Purpose | Proxy Status |
|--------|------|---------|--------------|
| A / CNAME | @ | Placeholder / redirect target | Proxied |
| CNAME | www | Redirect to primary domain | Proxied |
| Redirect Rule | Entire zone (`/*`) | Permanent (301) redirect to `https://omeshbhujbal.com` | N/A |

---

# Domain Renewal & Validity

| Domain | Role | Registration Term | Renewal Notes |
|--------|------|-------------------|----------------|
| omeshbhujbal.com | Primary | 3 years | Core brand domain; renew before expiry to avoid downtime |
| omeshbhujbal.info | Secondary (redirect only) | 1 year | Used solely to redirect to the primary domain; requires annual renewal |

**Note:** Since `omeshbhujbal.info` is renewed annually while `omeshbhujbal.com` runs on a 3-year term, renewal dates should be tracked separately (e.g., calendar reminders 30 days before each expiry) to ensure the redirect chain and SSL coverage are never interrupted.

---

# Performance

The application is optimized using modern frontend development best practices.

| Optimization | Status |
|-------------|--------|
| Vite Production Build | Enabled |
| Code Splitting | Enabled |
| Asset Optimization | Enabled |
| Lazy Loading | Enabled |
| Responsive Images | Enabled |
| Optimized Rendering | Enabled |
| Fast Loading | Enabled |
| Mobile Optimization | Enabled |
| Cloudflare CDN Caching | Enabled |

---

# Browser Support

| Browser | Supported |
|----------|-----------|
| Google Chrome | Yes |
| Microsoft Edge | Yes |
| Mozilla Firefox | Yes |
| Safari | Yes |
| Brave | Yes |

---

# Future Improvements

Potential enhancements planned for future releases.

| Feature | Status |
|---------|--------|
| Blog Integration | Planned |
| Dark Mode | Planned |
| CMS Integration | Planned |
| Contact Form Backend | Planned |
| Analytics Dashboard | Planned |
| Multi-language Support | Planned |
| Accessibility Improvements | Planned |
| Performance Monitoring | Planned |

---

# License

This project is intended for the client's personal portfolio and professional showcase purposes.

---

# Author / Maintainer

| | |
|---|---|
| **Client** | Omesh Bhujbal |
| **Project** | Professional Portfolio Website |
| **Built With** | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Deployment** | Vercel |
| **DNS / Domain Management** | Cloudflare |
| **Primary Domain** | https://omeshbhujbal.com |
| **Maintained By** | Piyush Prasad ([@ppiyushhhhh](https://github.com/ppiyushhhhh)) |

---

**Designed and developed using modern frontend technologies with a focus on performance, responsiveness, accessibility, and maintainability.**
