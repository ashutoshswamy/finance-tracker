# Finance Tracker

Track income and expenses with brutal clarity. Know your balance. Always.

Built by [Ashutosh Swamy](https://ashutoshswamy.in) · [GitHub](https://github.com/ashutoshswamy)

---

## Stack

- **Next.js 16** (App Router, server components)
- **Firebase** — Auth (email/password + Google) + Firestore
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **next-themes** — dark/light mode (dark default)
- **Cormorant Garamond** display font + Geist Sans/Mono

## Features

- Add, edit, delete transactions (income & expense)
- 10+ categories per transaction type
- Net balance + income/expense summary
- 8 currency options with proper formatting
- Per-user data isolation via Firebase Auth
- Fully responsive, dark/light theme

## Setup

**1. Clone and install**

```bash
npm install
```

**2. Create `.env.local`**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**3. Firebase console setup**

- Enable **Email/Password** and **Google** sign-in providers in Authentication
- Deploy Firestore security rules from `firestore.rules`:

```
Rules tab → paste contents of firestore.rules → Publish
```

**4. Run**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to [Vercel](https://vercel.com) — add all `NEXT_PUBLIC_*` env vars in project settings.

## Project Structure

```
app/
  page.tsx          # Landing page
  login/            # Sign in
  register/         # Create account
  dashboard/        # Main app
components/
  auth-provider.tsx
  currency-provider.tsx
  error-boundary.tsx
  summary-cards.tsx
  transaction-form.tsx
  transaction-list.tsx
  theme-toggle.tsx
lib/
  firebase.ts
  types.ts
  currency.ts
firestore.rules     # Firestore security rules
```
