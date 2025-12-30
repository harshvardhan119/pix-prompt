# Supabase Usage Examples in PixPrompt

## 📍 Where Supabase is Used

### 1. **Database Queries** (Most Common)

#### Gallery Page - Fetch All Prompts
```typescript
// app/(marketing)/gallery/page.tsx
const { data: prompts } = await supabase
  .from('prompts')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(20)
```
**Purpose:** Load prompts from database to display in gallery grid

#### Prompt Detail - Get Single Prompt
```typescript
// app/prompts/[slug]/page.tsx
const { data: prompt } = await supabase
  .from('prompts')
  .select('*')
  .eq('slug', params.slug)
  .single()
```
**Purpose:** Fetch individual prompt details by slug

#### Category Page - Filter by Category
```typescript
// app/(marketing)/category/[slug]/page.tsx
const { data: prompts } = await supabase
  .from('prompts')
  .select('*')
  .eq('category', category.name)
  .order('created_at', { ascending: false })
```
**Purpose:** Show only prompts in a specific category

#### Trending Page - Sort by Rating
```typescript
// app/(marketing)/trending/page.tsx
const { data, error } = await supabase
  .from('prompts')
  .select('*')
  .order('rating', { ascending: false })
  .order('views', { ascending: false })
  .limit(20)
```
**Purpose:** Get top-rated and most-viewed prompts

#### Search - Full-Text Search
```typescript
// app/(marketing)/search/page.tsx
const { data, error } = await supabase
  .from('prompts')
  .select('*')
  .or(`title.ilike.%${query}%,prompt.ilike.%${query}%`)
  .order('created_at', { ascending: false })
```
**Purpose:** Search prompts by title or prompt text

---

### 2. **User Authentication**

#### Check if User is Logged In
```typescript
// app/(app)/layout.tsx
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/signin')  // Redirect to login if not authenticated
}
```
**Purpose:** Protect routes (Favorites, Collections) - only logged-in users can access

#### Sign Up New User
```typescript
// app/(auth)/signup/page.tsx
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password
})
```
**Purpose:** Create new user account

#### Sign In Existing User
```typescript
// app/(auth)/signin/page.tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})
```
**Purpose:** Authenticate existing user

---

### 3. **User-Specific Data** (Requires Auth)

#### Get User's Favorites
```typescript
// app/(app)/favorites/page.tsx
const { data: { user } } = await supabase.auth.getUser()

const { data, error } = await supabase
  .from('favorites')
  .select('prompts(*)')
  .eq('user_id', user.id)
```
**Purpose:** Show only the current user's saved prompts

#### Add Prompt to Favorites
```typescript
// When user clicks "Add to Favorites"
const { error } = await supabase
  .from('favorites')
  .insert({
    user_id: user.id,
    prompt_id: promptId
  })
```
**Purpose:** Save a prompt to user's favorites list

#### Remove from Favorites
```typescript
// When user clicks remove button
const { error } = await supabase
  .from('favorites')
  .delete()
  .eq('user_id', user.id)
  .eq('prompt_id', promptId)
```
**Purpose:** Remove a prompt from favorites

#### Get User's Collections
```typescript
// app/(app)/collections/page.tsx
const { data: { user } } = await supabase.auth.getUser()

const { data, error } = await supabase
  .from('collections')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```
**Purpose:** Load user's custom collections

---

### 4. **API Routes** (Server-Side)

#### GET /api/prompts
```typescript
// app/api/prompts/route.ts
const supabase = await createClient()
const { data, error } = await supabase
  .from('prompts')
  .select('*')
  .range(offset, offset + limit - 1)
```
**Purpose:** API endpoint for fetching prompts (can be called from anywhere)

#### GET /api/categories
```typescript
// app/api/categories/route.ts
const { data, error } = await supabase
  .from('categories')
  .select('*')
  .order('prompt_count', { ascending: false })
```
**Purpose:** API endpoint for all categories

#### POST /api/search
```typescript
// app/api/search/route.ts
const { data, error } = await supabase
  .from('prompts')
  .select('*')
  .or(`title.ilike.%${query}%,prompt.ilike.%${query}%`)
```
**Purpose:** API endpoint for search functionality

---

## 🔒 Security Features

### Row Level Security (RLS)

**Public Data (No Auth Required):**
- ✅ Anyone can read prompts
- ✅ Anyone can read categories
- ✅ No login needed to browse

**Private Data (Auth Required):**
- 🔒 Users can only see their own favorites
- 🔒 Users can only see their own collections
- 🔒 Users can only modify their own data

**Example Policy:**
```sql
-- Public can read prompts
CREATE POLICY "Prompts are publicly readable"
  ON prompts FOR SELECT
  USING (true);  -- Everyone can read

-- Users can only see their own favorites
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);  -- Only owner can read
```

---

## 📊 Data Flow

### Without Supabase (Traditional):
```
Frontend → API Server → Database
           (You build this)
```

### With Supabase:
```
Frontend → Supabase → PostgreSQL
           (Already built!)
```

**Benefits:**
- ✅ No backend code needed
- ✅ Automatic API generation
- ✅ Built-in security
- ✅ Real-time capabilities
- ✅ Auto-scaling

---

## 🎯 Key Advantages for PixPrompt

1. **Fast Development**
   - No backend API to build
   - Database queries work immediately
   - Authentication ready to use

2. **Scalability**
   - Handles millions of prompts
   - Auto-scales with traffic
   - No server management

3. **Security**
   - Row Level Security at database level
   - Automatic SQL injection prevention
   - Secure authentication

4. **Cost Effective**
   - Free tier covers MVP needs
   - Pay only when you scale
   - No infrastructure costs

5. **Developer Experience**
   - TypeScript support
   - Auto-generated types
   - Great documentation
   - Easy to use API

---

## 🔄 Migration Path

If you wanted to **remove Supabase** later:

1. Export all data from Supabase
2. Set up your own PostgreSQL database
3. Build REST API endpoints
4. Implement authentication system
5. Update all frontend code to use new API

**Time Required:** 2-3 weeks

**With Supabase:** Everything works now! ⚡

---

## 📝 Summary

**Supabase = Backend-as-a-Service**

It provides:
- ✅ Database (PostgreSQL)
- ✅ Authentication
- ✅ Security (RLS)
- ✅ API (automatic)
- ✅ Storage (for images)
- ✅ Real-time (for future features)

**For PixPrompt:**
- Stores all prompts and metadata
- Handles user accounts
- Protects user data
- Powers search and filtering
- Enables favorites and collections

**Bottom Line:** Supabase eliminates the need for custom backend development, allowing you to focus on building the frontend and user experience! 🚀






