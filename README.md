# AMC Financial — Website & Admin Panel

Professional financial education website for **Aasim Majeed AMC**, built with
Next.js 14, Supabase, and Clerk.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + Framer Motion
- **Auth**: Clerk (admin panel)
- **Database**: Supabase (PostgreSQL + RLS)
- **Deployment**: Frontend → Vercel | Backend → Railway

---

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application
- (Optional) [Vercel](https://vercel.com) account for deployment

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase and Clerk credentials.

### 3. Set up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** and run the migration files in order:
   - `supabase/migrations/001_schema.sql` — creates all tables + RLS
   - `supabase/migrations/002_seed.sql` — inserts real content and links
3. Copy your Project URL and API keys into `.env.local`

### 4. Set up Clerk

1. Create a new application at [dashboard.clerk.com](https://dashboard.clerk.com)
2. In **API Keys**, copy your Publishable Key and Secret Key into `.env.local`
3. In **Paths** settings:
   - Sign-in URL: `/admin/login`
   - After sign-in: `/admin/dashboard`
4. Disable public sign-ups (admin-only sign-in):
   - Go to **User & Authentication → Email, Phone, Username**
   - Disable self-service sign-up

### 5. Add portrait image

Place the portrait photo at:
```
public/images/aasim-portrait.jpg
```

Also create an OG image (1200×630) at:
```
public/og-image.jpg
```

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Creating the First Super Admin

After your first Clerk sign-in, you need to assign yourself the `super_admin` role.

1. Sign in at `/admin/login`
2. Note your Clerk user ID (shown in Clerk dashboard → Users)
3. In Supabase SQL Editor, run:

```sql
INSERT INTO admin_roles (clerk_user_id, email, role)
VALUES ('user_YOUR_CLERK_ID_HERE', 'your@email.com', 'super_admin');
```

After that, you can invite other admins through the Admin Panel → Team page.

---

## Replacing Placeholder Links

All placeholder links are documented in [PLACEHOLDERS.md](./PLACEHOLDERS.md).

To update them without any code changes:

1. Go to `/admin/links`
2. Find the placeholder row and click **Edit**
3. Paste the real URL and save
4. The public site updates automatically (cache revalidated)

---

## Deployment

### Frontend — Vercel

1. Push this repo to GitHub
2. Import to Vercel: [vercel.com/import](https://vercel.com/import)
3. Add all environment variables from `.env.example` in Vercel dashboard
4. Deploy

### Backend — Railway (Supabase self-hosted alternative)

If you prefer Railway for the database instead of Supabase cloud:

1. Create a PostgreSQL service on Railway
2. Run the migration SQL files against your Railway DB
3. Update `NEXT_PUBLIC_SUPABASE_URL` and keys accordingly

---

## Admin Panel Routes

| Route | Access |
|-------|--------|
| `/admin/login` | Public (Clerk sign-in) |
| `/admin/dashboard` | All roles |
| `/admin/links` | All roles (edit: editor+) |
| `/admin/content` | All roles (edit: editor+) |
| `/admin/team` | Super Admin only |
| `/admin/settings` | Super Admin only |

---

## Project Structure

```
app/
  layout.tsx          — Root layout, fonts, Clerk, providers
  page.tsx            — Public homepage
  admin/              — Admin panel (all protected routes)
  api/admin/          — Server-side API routes
components/
  ui/                 — Primitive components
  layout/             — Header, Footer, MobileDrawer
  sections/           — Public page sections
  common/             — Shared animated components
  admin/              — Admin-specific components
lib/
  supabase/           — DB client + queries
  clerk/              — Auth helpers
config/               — Site config, roles
types/                — TypeScript types
supabase/migrations/  — SQL schema + seed
styles/globals.css    — Tailwind + design tokens
```

---

## License

Private. All rights reserved — Aasim Majeed AMC.
