# PayChase - Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- A code editor (VS Code recommended)
- Git installed

## Step-by-Step Setup (15 minutes)

### 1. Install Dependencies (2 min)
```bash
npm install
```

### 2. Setup Clerk (3 min)
1. Visit https://clerk.com
2. Sign up and create a new application
3. Choose "Email" as authentication method
4. Copy API keys from dashboard
5. Paste into `.env` file

### 3. Setup Supabase (5 min)
1. Visit https://supabase.com
2. Create new project (wait 2 min for setup)
3. Go to SQL Editor → New Query
4. Copy SQL from README and run it
5. Go to Storage → Create bucket "invoices" (make it public)
6. Copy API keys to `.env`

### 4. Setup Stripe (3 min)
1. Visit https://stripe.com
2. Get test API keys
3. Create product: $5/month
4. Copy Price ID
5. Add all keys to `.env`

### 5. Setup WhatsApp - UltraMsg (2 min)
1. Visit https://ultramsg.com
2. Connect your WhatsApp
3. Get Instance ID and Token
4. Add to `.env`

### 6. Run the App
```bash
npm run dev
```

Visit http://localhost:3000

## Testing Checklist

- [ ] Sign up works
- [ ] Create invoice works
- [ ] PDF generates
- [ ] WhatsApp sends (test with your number)
- [ ] Mark as paid works
- [ ] Subscription checkout works

## Common Issues

**"Unauthorized" error**: Check Clerk keys
**Database error**: Run SQL script in Supabase
**WhatsApp not sending**: Verify provider credentials
**PDF not generating**: Check Supabase storage bucket is public

## Production Deployment

1. Deploy to Vercel: `vercel`
2. Add all environment variables in Vercel dashboard
3. Update `NEXT_PUBLIC_APP_URL` to production URL
4. Setup Stripe webhook with production URL
5. Switch to live API keys

## Support

Check the main README.md for detailed instructions.
