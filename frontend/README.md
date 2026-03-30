# News Website - Frontend

This directory contains the React frontend for The Daily Chronicle news website.

## Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroArticle.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── Footer.tsx
│   │   └── RelatedArticles.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── SectionPage.tsx
│   │   └── ArticlePage.tsx
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── test/             # Unit tests
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## Design

The frontend features an editorial aesthetic inspired by BBC and NYT:

- **Typography**: Playfair Display (serif) for headlines, Inter (sans-serif) for body
- **Colors**: White background, black text, #BB1919 (BBC red) accent
- **Layout**: Asymmetric newspaper-style grid with responsive design
