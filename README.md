# Restaurant La Fusta - Website

Modern multilingual restaurant website built with Next.js 15 and Sanity CMS for Restaurant La Fusta.

## 🎉 Project Status: IN DEVELOPMENT

✅ **Content managed through Sanity CMS**  
✅ **Build optimized and production-ready**

🌍 **5 Languages**: Spanish, Catalan, English, German, Dutch

## 🌟 Features

- 🌍 **5 Languages**: Spanish, Catalan, English, German, Dutch
- 🎨 **Modern UI**: Tailwind CSS with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices
- ⚡ **Fast Performance**: Next.js 15 with optimizations
- 🎯 **SEO Optimized**: Comprehensive metadata and structured data
- 🔧 **CMS Powered**: All content managed via Sanity Studio
- 📊 **Dynamic Content**: Real-time updates from Sanity

## 🗃️ Content Management

Website content is managed through **Sanity CMS**:

### Available Pages:
- ✅ **HOME** - Hero, About, Specialties, Location sections
- ✅ **Carta (Menu)** - Restaurant menu with categories
- ✅ **Contact** - Business info and contact forms
- ✅ **Historia (History)** - Restaurant history
- ✅ **Legal Pages** - Privacy policy and legal information

### Content Structure:
- 📄 **Content Types** for different page sections
- 🌐 **Locale-based documents** (separate per language)
- 🔄 **Real-time updates** without deployments
- 📝 **Rich content editing** through Sanity Studio

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
web-fusta/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── carta/         # Menu page
│   │   │   ├── contacto/      # Contact page
│   │   │   ├── historia/      # History page
│   │   │   └── legal/         # Legal pages
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utilities and data
│   │   └── translations/      # Language files
├── sanity/
│   ├── schemas/               # Sanity content schemas
│   └── queries.ts             # GROQ queries
├── public/                    # Static assets
└── package.json
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
