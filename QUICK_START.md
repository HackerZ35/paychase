# PayChase - Quick Start (5 Minutes)

Get PayChase running locally in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- A code editor

## Step 1: Install (1 min)
```bash
npm install
```

## Step 2: Environment Setup (2 min)

Copy the example file:
```bash
cp .env.example .env
```

Add ONLY these required keys to `.env`:

```env
# Clerk (get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Supabase (get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Stripe (get from https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx

# WhatsApp - UltraMsg (get from https://ultramsg.com)
ULTRAMSG_INSTANCE_ID=instance12345
ULTRAMSG_TOKEN=xxxxx
WHATSAPP_PROVIDER=ultramsg

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Database Setup (1 min)

1. Go to your Supabase project
2. Click "SQL Editor"
3. Copy this SQL and run it:

```sql
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

CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
```

4. Go to Storage → Create bucket "invoices" (make it public)

## Step 4: Run (1 min)
```bash
npm run dev
```

Open http://localhost:3000

## Test It Out

1. Click "Get Started" or "Sign Up"
2. Create an account
3. Click "Create Invoice"
4. Fill in the form (use your WhatsApp number for testing)
5. Click "Send Invoice"
6. Check your WhatsApp!

## What's Next?

- Read [README.md](README.md) for detailed setup
- Check [FEATURES.md](FEATURES.md) for all features
- See [DEPLOYMENT.md](DEPLOYMENT.md) to go live

## Troubleshooting

**"Unauthorized" error?**
→ Check your Clerk keys

**Database error?**
→ Make sure you ran the SQL script

**WhatsApp not sending?**
→ Verify UltraMsg credentials and phone number format (+1234567890)

**PDF not generating?**
→ Check Supabase storage bucket is created and public

## Need Help?

Check the full [README.md](README.md) for detailed instructions.

---

That's it! You now have a working invoice system with WhatsApp reminders. 🎉
