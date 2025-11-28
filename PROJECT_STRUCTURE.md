# PayChase - Project Structure

## Directory Overview

```
paychase/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   ├── cron/
│   │   │   └── check-reminders/  # Cron job for overdue reminders
│   │   ├── invoices/
│   │   │   ├── [id]/
│   │   │   │   ├── send/         # Send invoice via WhatsApp
│   │   │   │   └── mark-paid/    # Mark invoice as paid
│   │   │   └── route.ts          # List/Create invoices
│   │   ├── subscription/
│   │   │   ├── status/           # Check subscription status
│   │   │   └── create-checkout/  # Create Stripe checkout
│   │   └── webhooks/
│   │       ├── stripe/           # Stripe webhook handler
│   │       └── razorpay/         # Razorpay webhook handler
│   ├── dashboard/                # Main dashboard page
│   ├── demo/                     # Public demo page
│   ├── payment/
│   │   ├── success/              # Payment success page
│   │   └── cancel/               # Payment cancel page
│   ├── pricing/                  # Pricing page
│   ├── sign-in/                  # Clerk sign in
│   ├── sign-up/                  # Clerk sign up
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── create-invoice-dialog.tsx # Invoice creation form
│   ├── invoice-list.tsx          # Invoice list component
│   └── subscribe-button.tsx      # Subscription button
├── lib/                          # Utility libraries
│   ├── utils/
│   │   ├── currency.ts           # Currency formatting
│   │   └── date.ts               # Date utilities
│   ├── constants.ts              # App constants
│   ├── pdf-generator.tsx         # PDF generation logic
│   ├── stripe.ts                 # Stripe client
│   ├── supabase.ts               # Supabase client
│   ├── utils.ts                  # General utilities
│   └── whatsapp.ts               # WhatsApp integration
├── hooks/                        # React hooks
│   └── use-toast.ts              # Toast notification hook
├── types/                        # TypeScript types
│   └── index.ts                  # Type definitions
├── public/                       # Static assets
│   └── robots.txt
├── .env.example                  # Environment variables template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── middleware.ts                 # Clerk authentication middleware
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
├── README.md                     # Main documentation
├── SETUP_GUIDE.md                # Quick setup guide
├── DEPLOYMENT.md                 # Deployment instructions
├── FEATURES.md                   # Feature list
└── PROJECT_STRUCTURE.md          # This file
```

## Key Files Explained

### Configuration Files

- **next.config.mjs**: Next.js configuration, includes canvas alias for PDF generation
- **tailwind.config.ts**: Tailwind CSS theme and plugin configuration
- **tsconfig.json**: TypeScript compiler options
- **vercel.json**: Vercel deployment config with cron job definition
- **.env.example**: Template for environment variables

### Core Application Files

- **app/layout.tsx**: Root layout with Clerk provider and toast notifications
- **app/page.tsx**: Landing page with hero section and features
- **middleware.ts**: Clerk authentication middleware for protected routes

### API Routes

All API routes follow Next.js 15 App Router conventions:

- **GET /api/invoices**: List user's invoices
- **POST /api/invoices**: Create new invoice
- **POST /api/invoices/[id]/send**: Send invoice via WhatsApp
- **POST /api/invoices/[id]/mark-paid**: Mark invoice as paid
- **GET /api/subscription/status**: Check subscription status
- **POST /api/subscription/create-checkout**: Create Stripe checkout session
- **POST /api/webhooks/stripe**: Handle Stripe webhooks
- **POST /api/webhooks/razorpay**: Handle Razorpay webhooks
- **GET /api/cron/check-reminders**: Cron job for sending reminders

### Components

**UI Components (shadcn/ui):**
- Pre-built, accessible components
- Fully customizable with Tailwind CSS
- Located in `components/ui/`

**Custom Components:**
- `create-invoice-dialog.tsx`: Modal form for creating invoices
- `invoice-list.tsx`: Display list of invoices with actions
- `subscribe-button.tsx`: Handle subscription checkout

### Libraries

**lib/supabase.ts:**
- Supabase client initialization
- Database type definitions
- Admin client for server-side operations

**lib/whatsapp.ts:**
- Multi-provider WhatsApp integration
- Support for UltraMsg, Wassenger, Maytapi, Twilio
- Unified interface for sending messages

**lib/pdf-generator.tsx:**
- React PDF component for invoice generation
- Professional invoice template
- Renders to buffer for upload

**lib/stripe.ts:**
- Stripe client initialization
- Type-safe Stripe operations

### Utilities

**lib/utils/date.ts:**
- Date formatting functions
- Calculate days overdue
- Date manipulation helpers

**lib/utils/currency.ts:**
- Currency formatting
- Currency symbol lookup

**lib/constants.ts:**
- App-wide constants
- Message templates
- Configuration values

### Types

**types/index.ts:**
- TypeScript interfaces for Invoice, Subscription
- Input types for API requests
- Shared type definitions

## Data Flow

### Creating and Sending an Invoice

1. User fills form in `create-invoice-dialog.tsx`
2. POST to `/api/invoices` creates database record
3. User clicks "Send" in `invoice-list.tsx`
4. POST to `/api/invoices/[id]/send`:
   - Generates PDF using `pdf-generator.tsx`
   - Uploads to Supabase Storage
   - Creates Stripe checkout session
   - Sends WhatsApp message via `whatsapp.ts`
5. Updates invoice with payment link and PDF URL

### Payment Flow

1. Client clicks payment link (Stripe checkout)
2. Completes payment
3. Stripe sends webhook to `/api/webhooks/stripe`
4. Webhook handler marks invoice as paid
5. Dashboard updates automatically

### Reminder Flow

1. Vercel cron triggers `/api/cron/check-reminders` daily
2. Queries overdue invoices from Supabase
3. Checks if reminder is due (3 days since last)
4. Sends reminder via WhatsApp
5. Updates reminder count and timestamp

## Authentication Flow

1. User visits protected route
2. `middleware.ts` checks Clerk session
3. Redirects to sign-in if not authenticated
4. After sign-in, redirects to dashboard
5. User ID from Clerk used for database queries

## Database Schema

### invoices table
- id (UUID, primary key)
- user_id (text, from Clerk)
- client_name, client_whatsapp, client_email
- amount, currency, due_date, description
- status (pending/paid/overdue)
- payment_link, pdf_url
- reminder_count, last_reminder_sent
- created_at, updated_at

### subscriptions table
- id (UUID, primary key)
- user_id (text, unique)
- stripe_customer_id, stripe_subscription_id
- status (trialing/active/canceled/past_due)
- trial_ends_at, current_period_end
- created_at

## Environment Variables

See `.env.example` for complete list. Key variables:

- **Clerk**: Authentication
- **Supabase**: Database and storage
- **Stripe**: Payments and subscriptions
- **WhatsApp**: Message delivery
- **App Config**: URLs and settings

## Tech Stack Summary

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Payments**: Stripe, Razorpay
- **PDF**: @react-pdf/renderer
- **WhatsApp**: Multiple providers
- **Hosting**: Vercel
- **Cron**: Vercel Cron Jobs

## Development Workflow

1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Fill in environment variables
5. Run development server: `npm run dev`
6. Make changes
7. Test locally
8. Commit and push
9. Deploy to Vercel

## Testing Strategy

- Manual testing in development
- Test with Stripe test mode
- Test WhatsApp with real numbers
- Verify webhooks with Stripe CLI
- Test cron job manually via API call

## Performance Considerations

- Server-side rendering for landing page
- Client-side rendering for dashboard
- API routes are serverless functions
- PDF generation is on-demand
- Database queries are indexed
- Images optimized with Next.js Image

## Security Features

- Clerk handles authentication
- Middleware protects routes
- API routes verify user ID
- Webhook signatures verified
- Environment variables for secrets
- Supabase RLS can be enabled
- HTTPS enforced by Vercel

## Scalability

- Serverless architecture scales automatically
- Database can handle thousands of invoices
- Supabase storage scales with usage
- Stripe handles payment processing
- WhatsApp providers have rate limits
- Cron job processes in batches

## Future Enhancements

See FEATURES.md for complete list of potential features.

## Documentation

- **README.md**: Main documentation and setup
- **SETUP_GUIDE.md**: Quick start guide
- **DEPLOYMENT.md**: Production deployment
- **FEATURES.md**: Feature list and roadmap
- **PROJECT_STRUCTURE.md**: This file

## Support and Maintenance

- Check logs in Vercel dashboard
- Monitor Stripe dashboard for payments
- Check Supabase for database issues
- Verify WhatsApp provider status
- Update dependencies regularly
- Monitor error rates
- Review user feedback

---

This structure provides a solid foundation for a production-ready invoice management system with automatic payment reminders via WhatsApp.
