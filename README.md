# PixPrompt - AI Prompts That Actually Work

A production-ready AI prompt gallery website built with Next.js 15 (App Router), Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL.

## 🎉 Status: Production Ready!

All 15 pages implemented, fully responsive, SEO-optimized, and ready for deployment.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality component library
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📁 Project Structure

```
pixprompt/
├── app/                    # Next.js 15 App Router
│   ├── (marketing)/        # Marketing pages (no auth)
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Homepage
│   │   ├── gallery/
│   │   ├── trending/
│   │   ├── category/[slug]/
│   │   └── search/
│   ├── (auth)/             # Auth pages
│   │   ├── signup/
│   │   └── signin/
│   ├── (app)/              # Auth-protected pages
│   │   ├── favorites/
│   │   └── collections/
│   ├── prompts/[slug]/     # Dynamic prompt detail
│   ├── layout.tsx
│   ├── globals.css
│   └── loading.tsx
├── components/             # React components
│   ├── ui/                 # shadcn components
│   ├── cards/
│   ├── modals/
│   └── layout/
├── lib/                    # Utilities
│   ├── utils.ts
│   ├── prisma.ts           # Prisma client
│   └── auth.ts             # NextAuth config
├── prisma/                 # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── types/                  # TypeScript types
└── public/                 # Static assets
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory (use `.env.example` as reference):

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pixprompt?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# App
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Set Up Database

#### Option A: Local PostgreSQL

Install PostgreSQL locally and create a database:

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb pixprompt
```

#### Option B: Hosted PostgreSQL (Recommended)

Use a hosted PostgreSQL service:
- **Neon** (https://neon.tech) - Free serverless Postgres
- **Railway** (https://railway.app) - $5/month credit
- **Supabase** (https://supabase.com) - Just use the database
- **Vercel Postgres** (https://vercel.com/storage/postgres)

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## 🎨 Design System

### Colors
- **Orange Primary**: #FF7A59
- **Orange Dark**: #FF6A40
- **Orange Light**: #FFE8DC
- **Grays**: #F9FAFB, #F3F4F6, #D1D5DB, #374151, #111827

### Typography
- **Font Family**: Inter (Regular 400, Bold 700)
- **Code Font**: Monaco (for prompt text)

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 640px - 1023px
- **Mobile**: Below 640px

## 📄 Pages

1. **Homepage** (`/`) - Hero, stats, features, FAQ
2. **Gallery** (`/gallery`) - Browse all prompts
3. **Trending** (`/trending`) - Trending prompts
4. **Category** (`/category/[slug]`) - Category pages
5. **Search** (`/search`) - Search results
6. **Prompt Detail** (`/prompts/[slug]`) - Individual prompt
7. **Favorites** (`/favorites`) - User favorites (protected)
8. **Collections** (`/collections`) - User collections (protected)
9. **Sign Up** (`/signup`) - Registration
10. **Sign In** (`/signin`) - Login
11. **Contact** (`/contact`) - Contact form
12. **FAQ** (`/faq`) - FAQ page
13. **About** (`/about`) - About page
14. **Terms** (`/terms`) - Terms of service
15. **Privacy** (`/privacy`) - Privacy policy

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- **User** - User accounts with authentication
- **Prompt** - AI prompts with metadata
- **Category** - Prompt categories
- **Favorite** - User favorites (many-to-many)
- **Collection** - User collections
- **CollectionPrompt** - Collection membership (many-to-many)

See `prisma/schema.prisma` for the complete schema.

## 🔐 Authentication

The app uses NextAuth.js with credentials provider:
- Email/password authentication
- Bcrypt password hashing
- JWT session strategy
- Protected routes with server-side session checks

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL
   - `NEXTAUTH_SECRET` - Secret key for JWT signing
   - `NEXT_PUBLIC_SITE_URL` - Your site URL
4. Deploy!

### Database Hosting

Recommended options:
- **Neon** - Serverless Postgres with generous free tier
- **Railway** - Simple deployment with $5/month credit
- **Supabase** - Use just the database features
- **Vercel Postgres** - Integrated with Vercel deployment

## 🔧 Additional Features to Add

1. ✅ ~~Set up database and ORM~~
2. ✅ ~~Configure authentication~~
3. ✅ ~~Add API routes~~
4. Add dark mode
5. Add admin dashboard
6. Implement favorites functionality
7. Implement collections CRUD
8. Add share functionality
9. Add image uploads
10. Set up analytics

## 📝 License

This project is open source and available for use.
