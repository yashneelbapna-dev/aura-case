# AURA CASES - Premium Ecommerce Website

A high-end ecommerce platform for mobile phone covers, featuring glassmorphism design, animated mesh backgrounds, and 3D interactions.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

## ⚡ Supabase Setup (Step-by-Step)

1. **Create Project**: Go to [Supabase](https://supabase.com) and create a new project.
2. **Setup Table**: 
   - Go to the **SQL Editor** in Supabase.
   - Run the following command to create the `products` table:
   ```sql
   create table products (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     price decimal not null,
     old_price decimal,
     image_url text,
     badge text,
     rating integer default 5,
     compatibility text,
     category text,
     color_theme text,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```
3. **Insert Data**: You can manually add products in the Table Editor or use the SQL Editor to insert some rows.
4. **API Keys**:
   - Go to **Project Settings > API**.
   - Copy the `Project URL` and `anon public` key.
   - Create a `.env` file in the root of this project:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## 🐙 GitHub Connection & Deployment

1. **Create Repository**: Go to GitHub and create a new repository called `aura-cases`.
2. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aura Cases Premium Design"
   git branch -M main
   git remote add origin https://github.com/yourusername/aura-cases.git
   git push -u origin main
   ```
3. **Deploy to Vercel**:
   - Go to [Vercel](https://vercel.com).
   - Click **New Project** and import your `aura-cases` repo.
   - Add your `.env` variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) in the Vercel dashboard.
   - Click **Deploy**.

## ✨ Design Features
- **Glassmorphism**: Frosted glass cards with backdrop blur.
- **Custom Cursor**: Lagrange-style dot and ring cursor.
- **3D Tilt**: Interactive perspective rotation on product cards.
- **Mesh Background**: Animated radial gradient blobs.
- **Animations**: Scroll-triggered reveals and staggered hero entrance.
- **Responsive**: Fully optimized for mobile and desktop (900px breakpoint).
