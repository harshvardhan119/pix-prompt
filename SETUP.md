# PixPrompt - Setup Guide

## Phase 1: Initial Setup (30 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Install shadcn/ui Components

The project uses shadcn/ui components. To add more components:

```bash
npx shadcn-ui@latest add [component-name]
```

Available components already set up:
- button
- card
- accordion

To add more:
```bash
npx shadcn-ui@latest add input label select checkbox dialog tabs carousel badge
```

### Step 3: Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Phase 2: Database Setup

### Create Tables in Supabase

Run these SQL commands in your Supabase SQL editor:

```sql
-- Prompts table
create table prompts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  prompt_text text not null,
  category text not null,
  generator text[],
  views integer default 0,
  rating numeric(3,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  prompt_count integer default 0
);

-- User favorites (requires auth)
create table favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  prompt_id uuid references prompts(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, prompt_id)
);

-- Collections (requires auth)
create table collections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Collection prompts junction table
create table collection_prompts (
  id uuid default gen_random_uuid() primary key,
  collection_id uuid references collections(id) on delete cascade,
  prompt_id uuid references prompts(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(collection_id, prompt_id)
);

-- Enable Row Level Security
alter table prompts enable row level security;
alter table categories enable row level security;
alter table favorites enable row level security;
alter table collections enable row level security;
alter table collection_prompts enable row level security;

-- Policies for prompts (public read)
create policy "Prompts are viewable by everyone" on prompts
  for select using (true);

-- Policies for categories (public read)
create policy "Categories are viewable by everyone" on categories
  for select using (true);

-- Policies for favorites (user-specific)
create policy "Users can view own favorites" on favorites
  for select using (auth.uid() = user_id);

create policy "Users can insert own favorites" on favorites
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites" on favorites
  for delete using (auth.uid() = user_id);

-- Policies for collections (user-specific)
create policy "Users can view own collections" on collections
  for select using (auth.uid() = user_id);

create policy "Users can insert own collections" on collections
  for insert with check (auth.uid() = user_id);

create policy "Users can update own collections" on collections
  for update using (auth.uid() = user_id);

create policy "Users can delete own collections" on collections
  for delete using (auth.uid() = user_id);
```

## Phase 3: Next Steps

1. **Add Seed Data**: Populate your database with initial prompts
2. **Configure Authentication**: Set up email/password and OAuth providers
3. **Add Image Storage**: Configure Supabase Storage for prompt images
4. **Set Up API Routes**: Create Next.js API routes for data fetching
5. **Add Search**: Implement full-text search with Supabase
6. **Deploy**: Deploy to Vercel or your preferred platform

## Development Tips

- Use `npm run dev` for development
- Use `npm run build` to test production build
- Check `app/loading.tsx` for loading states
- Use TypeScript for type safety
- Follow Next.js 15 App Router conventions

## Troubleshooting

### Issue: shadcn/ui components not working
- Make sure you've run `npx shadcn-ui@latest init`
- Check that `components.json` exists
- Verify Tailwind config includes component paths

### Issue: Supabase connection errors
- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Ensure RLS policies are set correctly

### Issue: TypeScript errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` paths are correct
- Restart TypeScript server in your IDE

