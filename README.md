# PayChase - Invoice & Payment Reminder System

A complete MVP for sending invoices via WhatsApp with automatic payment reminders.

## Features

✅ User authentication (Clerk)
✅ Create & manage invoices
✅ Auto-generate beautiful PDF invoices
✅ Send invoices via WhatsApp automatically
✅ Automatic overdue reminders (every 3 days, max 5 reminders)
✅ Stripe & Razorpay payment integration
✅ Auto-detect paid invoices via webhooks
✅ $5/month subscription with 7-day free trial
✅ Fully mobile responsive

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **WhatsApp**: UltraMsg / Wassenger / Maytapi / Twilio
- **PDF**: @react-pdf/renderer
- **Payments**: Stripe + Razorpay
- **Hosting**: Vercel

## Setup Instructions (Complete Beginner Guide)

### 1. Clone & Install

```bash
# Install dependencies
npm install
```

### 2. Setup Clerk Authentication

1. Go to https://clerk.com and create a free account
2. Create a new application
3. Copy your API keys from the dashboard
4. Add to `.env`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 3. Setup Supabase Database

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to Project Settings → API
4. Copy your keys to `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Go to SQL Editor and run this:

```sql
-- Create invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  client_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  due_date DATE NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  payment_link TEXT,
  pdf_url TEXT,
  reminder_count INTEGER DEFAULT 0,
  last_reminder_sent TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'trialing',
  trial_ends_at TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

6. Create Storage Bucket for PDFs:
   - Go to Storage in Supabase dashboard
   - Create a new bucket called `invoices`
   - Make it public (so PDFs can be accessed via URL)
   - Set file size limit to 10MB

### 5. Setup Stripe

1. Go to https://stripe.com and create account
2. Get your test API keys from Developers → API Keys
3. Add to `.env`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Create a product:
   - Go to Products → Add Product
   - Name: "PayChase Pro"
   - Price: $5/month recurring
   - Copy the Price ID to `STRIPE_PRICE_ID`
5. Setup webhook (after deploying):
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 6. Setup WhatsApp (Choose ONE)

#### Option A: UltraMsg (Recommended - 1000 free msgs/month)

1. Go to https://ultramsg.com
2. Create account and connect your WhatsApp
3. Get Instance ID and Token from dashboard
4. Add to `.env`:
   - `ULTRAMSG_INSTANCE_ID`
   - `ULTRAMSG_TOKEN`
   - `WHATSAPP_PROVIDER=ultramsg`

#### Option B: Wassenger

1. Go to https://wassenger.com
2. Connect WhatsApp and get API key
3. Add to `.env`:
   - `WASSENGER_API_KEY`
   - `WASSENGER_DEVICE_ID`
   - `WHATSAPP_PROVIDER=wassenger`

#### Option C: Maytapi

1. Go to https://maytapi.com
2. Setup and get credentials
3. Add to `.env`:
   - `MAYTAPI_PRODUCT_ID`
   - `MAYTAPI_PHONE_ID`
   - `MAYTAPI_API_KEY`
   - `WHATSAPP_PROVIDER=maytapi`

### 7. Setup Razorpay (Optional - for India)

1. Go to https://razorpay.com
2. Get test API keys
3. Add to `.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

### 8. Run Locally

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your keys

# Run development server
npm run dev
```

Open http://localhost:3000

### 9. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Update NEXT_PUBLIC_APP_URL to your production URL
```

### 10. Setup Cron Job for Reminders

After deploying, setup a cron job to check for overdue invoices:

1. Go to https://cron-job.org (free)
2. Create a job that hits: `https://yourdomain.com/api/cron/check-reminders`
3. Schedule: Every day at 9 AM
4. Or use Vercel Cron (add to `vercel.json`):

```json
{
  "crons": [{
    "path": "/api/cron/check-reminders",
    "schedule": "0 9 * * *"
  }]
}
```

## Usage

1. Sign up at `/sign-up`
2. Start 7-day free trial
3. Create invoice from dashboard
4. Click "Send Invoice" - PDF sent via WhatsApp
5. System auto-sends reminders if overdue
6. Mark as paid manually or auto-detect via webhook

## Demo

Visit `/demo` to see the app with fake data (no login required)

## Switching to Live Mode

1. Replace all test API keys with live keys
2. Update Stripe webhook to production URL
3. Test with real WhatsApp number
4. Update `NEXT_PUBLIC_APP_URL` to production domain

## Support

For issues, check:
- Clerk dashboard for auth errors
- Supabase logs for database errors
- Stripe dashboard for payment errors
- WhatsApp provider dashboard for delivery status

## License

MIT
