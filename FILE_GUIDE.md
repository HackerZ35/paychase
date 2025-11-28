# PayChase - Complete File Guide

Every file in the project explained.

## 📚 Documentation Files (11)

| File | Purpose | Read When |
|------|---------|-----------|
| `START_HERE.md` | Quick navigation guide | First time opening project |
| `OVERVIEW.md` | High-level project overview | Want to understand what you got |
| `QUICK_START.md` | 5-minute setup guide | Want to get running fast |
| `INSTALL.md` | Installation troubleshooting | Having installation issues |
| `README.md` | Complete setup guide | Need detailed instructions |
| `SETUP_GUIDE.md` | Step-by-step setup | Prefer guided approach |
| `DEPLOYMENT.md` | Production deployment | Ready to go live |
| `TESTING_GUIDE.md` | Testing checklist | Want to test everything |
| `FEATURES.md` | Feature list & roadmap | Curious about features |
| `PROJECT_STRUCTURE.md` | Code organization | Want to understand code |
| `PROJECT_SUMMARY.md` | Complete summary | Want full overview |
| `CHECKLIST.md` | Setup checklist | Want to track progress |
| `FILE_GUIDE.md` | This file | Want to understand files |

## ⚙️ Configuration Files (10)

| File | Purpose | Modify? |
|------|---------|---------|
| `.env.example` | Environment variables template | No - copy to .env |
| `.env` | Your API keys (not in git) | Yes - add your keys |
| `.gitignore` | Files to ignore in git | Rarely |
| `.eslintrc.json` | ESLint configuration | Rarely |
| `package.json` | Dependencies & scripts | When adding packages |
| `tsconfig.json` | TypeScript configuration | Rarely |
| `tailwind.config.ts` | Tailwind CSS configuration | For theme changes |
| `postcss.config.mjs` | PostCSS configuration | Rarely |
| `next.config.mjs` | Next.js configuration | For advanced config |
| `vercel.json` | Vercel deployment config | For cron jobs |
| `middleware.ts` | Auth middleware | For route protection |

## 🎨 Page Files (9)

| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Landing page |
| `app/layout.tsx` | All pages | Root layout |
| `app/globals.css` | All pages | Global styles |
| `app/dashboard/page.tsx` | `/dashboard` | Main dashboard |
| `app/demo/page.tsx` | `/demo` | Public demo |
| `app/pricing/page.tsx` | `/pricing` | Pricing page |
| `app/sign-in/[[...sign-in]]/page.tsx` | `/sign-in` | Sign in page |
| `app/sign-up/[[...sign-up]]/page.tsx` | `/sign-up` | Sign up page |
| `app/payment/success/page.tsx` | `/payment/success` | Payment success |
| `app/payment/cancel/page.tsx` | `/payment/cancel` | Payment cancel |

## 🔌 API Routes (8)

| File | Endpoint | Purpose |
|------|----------|---------|
| `app/api/invoices/route.ts` | `GET/POST /api/invoices` | List/create invoices |
| `app/api/invoices/[id]/send/route.ts` | `POST /api/invoices/:id/send` | Send invoice via WhatsApp |
| `app/api/invoices/[id]/mark-paid/route.ts` | `POST /api/invoices/:id/mark-paid` | Mark invoice as paid |
| `app/api/subscription/status/route.ts` | `GET /api/subscription/status` | Check subscription status |
| `app/api/subscription/create-checkout/route.ts` | `POST /api/subscription/create-checkout` | Create Stripe checkout |
| `app/api/webhooks/stripe/route.ts` | `POST /api/webhooks/stripe` | Handle Stripe webhooks |
| `app/api/webhooks/razorpay/route.ts` | `POST /api/webhooks/razorpay` | Handle Razorpay webhooks |
| `app/api/cron/check-reminders/route.ts` | `GET /api/cron/check-reminders` | Send overdue reminders |

## 🧩 Component Files (11)

| File | Purpose | Used In |
|------|---------|---------|
| `components/create-invoice-dialog.tsx` | Invoice creation form | Dashboard |
| `components/invoice-list.tsx` | Display invoice list | Dashboard |
| `components/subscribe-button.tsx` | Subscription button | Pricing page |
| `components/ui/button.tsx` | Button component | Everywhere |
| `components/ui/card.tsx` | Card component | Dashboard, pricing |
| `components/ui/dialog.tsx` | Dialog/modal component | Invoice dialog |
| `components/ui/input.tsx` | Input field component | Forms |
| `components/ui/label.tsx` | Label component | Forms |
| `components/ui/select.tsx` | Select dropdown component | Forms |
| `components/ui/toast.tsx` | Toast notification | Everywhere |
| `components/ui/toaster.tsx` | Toast container | Root layout |

## 📚 Library Files (9)

| File | Purpose | Used By |
|------|---------|---------|
| `lib/supabase.ts` | Supabase client & types | API routes |
| `lib/whatsapp.ts` | WhatsApp integration | Send invoice API |
| `lib/pdf-generator.tsx` | PDF generation | Send invoice API |
| `lib/stripe.ts` | Stripe client | Payment APIs |
| `lib/constants.ts` | App constants | Everywhere |
| `lib/utils.ts` | General utilities | Components |
| `lib/utils/date.ts` | Date utilities | Invoice display |
| `lib/utils/currency.ts` | Currency utilities | Invoice display |

## 🎣 Hook Files (1)

| File | Purpose | Used By |
|------|---------|---------|
| `hooks/use-toast.ts` | Toast notification hook | Components |

## 📝 Type Files (1)

| File | Purpose | Used By |
|------|---------|---------|
| `types/index.ts` | TypeScript type definitions | Everywhere |

## 🌐 Static Files (2)

| File | Purpose |
|------|---------|
| `public/robots.txt` | SEO robots file |
| `app/favicon.ico` | Favicon (placeholder) |

## 📁 Folder Structure

```
paychase/
├── .vscode/                    # VS Code settings
├── app/                        # Next.js app directory
│   ├── api/                   # API routes
│   │   ├── cron/             # Cron jobs
│   │   ├── invoices/         # Invoice APIs
│   │   ├── subscription/     # Subscription APIs
│   │   └── webhooks/         # Webhook handlers
│   ├── dashboard/            # Dashboard page
│   ├── demo/                 # Demo page
│   ├── payment/              # Payment pages
│   ├── pricing/              # Pricing page
│   ├── sign-in/              # Sign in page
│   └── sign-up/              # Sign up page
├── components/                # React components
│   └── ui/                   # UI components
├── hooks/                     # React hooks
├── lib/                       # Libraries
│   └── utils/                # Utility functions
├── public/                    # Static files
└── types/                     # TypeScript types
```

## 🔍 File Relationships

### Invoice Creation Flow
```
Dashboard (page.tsx)
  → CreateInvoiceDialog (component)
    → Input, Label, Button (UI components)
      → POST /api/invoices (API route)
        → Supabase (lib/supabase.ts)
```

### Invoice Sending Flow
```
InvoiceList (component)
  → Button (UI component)
    → POST /api/invoices/[id]/send (API route)
      → PDF Generator (lib/pdf-generator.tsx)
      → Supabase Storage (lib/supabase.ts)
      → WhatsApp API (lib/whatsapp.ts)
      → Stripe Checkout (lib/stripe.ts)
```

### Payment Flow
```
Stripe Checkout (external)
  → POST /api/webhooks/stripe (API route)
    → Supabase (lib/supabase.ts)
      → Update invoice status
```

### Reminder Flow
```
Vercel Cron (daily)
  → GET /api/cron/check-reminders (API route)
    → Supabase (lib/supabase.ts)
    → WhatsApp API (lib/whatsapp.ts)
```

## 📝 When to Modify Files

### Frequently Modified
- `app/page.tsx` - Update landing page content
- `app/dashboard/page.tsx` - Customize dashboard
- `components/create-invoice-dialog.tsx` - Add invoice fields
- `lib/constants.ts` - Update constants
- `.env` - Update API keys

### Occasionally Modified
- `app/pricing/page.tsx` - Change pricing
- `lib/pdf-generator.tsx` - Customize PDF design
- `tailwind.config.ts` - Change theme colors
- `components/ui/*` - Customize UI components

### Rarely Modified
- `middleware.ts` - Change auth logic
- `next.config.mjs` - Advanced Next.js config
- `tsconfig.json` - TypeScript settings
- `vercel.json` - Deployment config
- API route files - Core logic

### Never Modify
- `.gitignore` - Git ignore rules
- `package.json` - Unless adding packages
- `.eslintrc.json` - Linting rules
- `postcss.config.mjs` - PostCSS config

## 🎯 File Size Reference

| Type | Count | Total Size |
|------|-------|------------|
| Documentation | 13 | ~50 KB |
| Configuration | 10 | ~10 KB |
| Pages | 9 | ~15 KB |
| API Routes | 8 | ~20 KB |
| Components | 11 | ~25 KB |
| Libraries | 9 | ~20 KB |
| Hooks | 1 | ~5 KB |
| Types | 1 | ~2 KB |
| **Total** | **62** | **~150 KB** |

## 🔧 Customization Guide

### Change Branding
- Edit `app/page.tsx` - Landing page text
- Edit `app/dashboard/page.tsx` - Dashboard title
- Edit `lib/pdf-generator.tsx` - PDF header
- Update `app/favicon.ico` - Favicon

### Change Colors
- Edit `tailwind.config.ts` - Theme colors
- Edit `app/globals.css` - CSS variables

### Change Pricing
- Edit `app/pricing/page.tsx` - Display price
- Edit `.env` - Stripe price ID
- Update Stripe product

### Add Features
- Create new page in `app/`
- Create new API route in `app/api/`
- Create new component in `components/`
- Add types in `types/index.ts`

### Change Currency
- Edit `lib/constants.ts` - Add currencies
- Edit `components/create-invoice-dialog.tsx` - Currency options
- Update Stripe product currencies

## 📖 Reading Order

**For Beginners:**
1. START_HERE.md
2. QUICK_START.md
3. README.md
4. app/page.tsx
5. app/dashboard/page.tsx

**For Developers:**
1. PROJECT_STRUCTURE.md
2. lib/supabase.ts
3. app/api/invoices/route.ts
4. components/create-invoice-dialog.tsx
5. lib/whatsapp.ts

**For Deployment:**
1. DEPLOYMENT.md
2. CHECKLIST.md
3. vercel.json
4. .env.example

## 🎓 Learning Path

**Week 1: Setup**
- Read documentation
- Setup environment
- Run locally
- Test features

**Week 2: Customize**
- Change branding
- Modify colors
- Update content
- Test changes

**Week 3: Deploy**
- Push to GitHub
- Deploy to Vercel
- Setup webhooks
- Test production

**Week 4: Launch**
- Switch to live mode
- Add custom domain
- Market your app
- Get users!

---

**This guide covers all 62 files in the project. Use it as a reference when working with the codebase!**
