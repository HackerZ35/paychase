# PayChase - Deployment Guide

## Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- All environment variables ready

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add all environment variables from `.env.example`
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### Step 3: Configure Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

**Clerk:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

**Supabase:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Stripe:**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (get this after setting up webhook)
- `STRIPE_PRICE_ID`

**WhatsApp (choose one):**
- `ULTRAMSG_INSTANCE_ID`
- `ULTRAMSG_TOKEN`
- `WHATSAPP_PROVIDER=ultramsg`

**App Config:**
- `NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app`

### Step 4: Setup Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy webhook signing secret
6. Add to Vercel as `STRIPE_WEBHOOK_SECRET`
7. Redeploy the app

### Step 5: Test Production

1. Visit your deployed URL
2. Sign up with a test account
3. Create a test invoice
4. Send to your WhatsApp number
5. Test payment flow
6. Verify webhook works

### Step 6: Enable Cron Jobs

Vercel automatically enables cron jobs from `vercel.json`. Verify in:
- Vercel Dashboard → Your Project → Settings → Cron Jobs

The reminder cron runs daily at 9 AM UTC.

## Switch to Live Mode

### 1. Replace Test Keys with Live Keys

**Stripe:**
- Use live publishable key (starts with `pk_live_`)
- Use live secret key (starts with `sk_live_`)
- Create new webhook for production
- Use live price ID

**WhatsApp:**
- Ensure your WhatsApp provider account is verified
- Use production credentials

**Razorpay (if using):**
- Switch to live keys

### 2. Update Environment Variables

Update all keys in Vercel Dashboard → Settings → Environment Variables

### 3. Redeploy

```bash
vercel --prod
```

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain
5. Update Stripe webhook URL
6. Redeploy

## Monitoring

### Check Logs
- Vercel Dashboard → Your Project → Deployments → View Function Logs

### Monitor Cron Jobs
- Vercel Dashboard → Your Project → Settings → Cron Jobs

### Stripe Dashboard
- Monitor payments and subscriptions
- Check webhook delivery status

### Supabase Dashboard
- Monitor database queries
- Check storage usage
- View API logs

## Troubleshooting

### Webhooks Not Working
- Check webhook secret is correct
- Verify webhook URL is accessible
- Check Stripe dashboard for delivery attempts
- View function logs in Vercel

### WhatsApp Not Sending
- Verify provider credentials
- Check provider dashboard for delivery status
- Ensure phone numbers include country code
- Check function logs for errors

### Database Errors
- Verify Supabase connection
- Check service role key is correct
- Ensure tables are created
- Check RLS policies if enabled

### Cron Job Not Running
- Verify `vercel.json` is in root directory
- Check cron job is enabled in Vercel dashboard
- View cron job logs
- Ensure API route is accessible

## Performance Optimization

### Enable Edge Functions (Optional)
Add to specific API routes:
```typescript
export const runtime = 'edge';
```

### Enable ISR for Static Pages
```typescript
export const revalidate = 3600; // 1 hour
```

### Optimize Images
Use Next.js Image component for all images.

## Security Checklist

- [ ] All API keys are in environment variables
- [ ] Webhook signatures are verified
- [ ] Database has proper indexes
- [ ] Rate limiting is considered
- [ ] CORS is properly configured
- [ ] Error messages don't leak sensitive info
- [ ] Clerk authentication is working
- [ ] Supabase RLS policies (if needed)

## Backup Strategy

### Database Backups
Supabase automatically backs up your database daily (free tier).

### Manual Backup
```sql
-- Export from Supabase SQL Editor
SELECT * FROM invoices;
SELECT * FROM subscriptions;
```

## Scaling Considerations

### Free Tier Limits
- Vercel: 100GB bandwidth/month
- Supabase: 500MB database, 1GB storage
- Clerk: 10,000 MAU
- Stripe: No limits on test mode

### When to Upgrade
- More than 10,000 users → Upgrade Clerk
- More than 500MB data → Upgrade Supabase
- More than 100GB bandwidth → Upgrade Vercel

## Support

- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Clerk: https://clerk.com/support
- Stripe: https://support.stripe.com

## Post-Deployment Checklist

- [ ] App is accessible at production URL
- [ ] Sign up/login works
- [ ] Create invoice works
- [ ] PDF generation works
- [ ] WhatsApp sending works
- [ ] Payment flow works
- [ ] Webhooks are receiving events
- [ ] Cron job is scheduled
- [ ] All environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring is set up
- [ ] Backups are enabled

Your PayChase app is now live! 🚀
