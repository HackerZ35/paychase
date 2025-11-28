# PayChase - Complete Setup Checklist

Use this checklist to ensure everything is set up correctly.

## ✅ Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor installed (VS Code recommended)
- [ ] Terminal/Command Prompt access

## ✅ Installation Checklist

- [ ] Project downloaded/cloned
- [ ] Navigated to project folder in terminal
- [ ] Ran `npm install` successfully
- [ ] `node_modules` folder created
- [ ] No installation errors

## ✅ Environment Setup Checklist

- [ ] Copied `.env.example` to `.env`
- [ ] `.env` file exists in root folder
- [ ] Ready to add API keys

## ✅ Clerk Setup Checklist

- [ ] Signed up at https://clerk.com
- [ ] Created new application
- [ ] Selected "Email" authentication
- [ ] Copied publishable key to `.env`
- [ ] Copied secret key to `.env`
- [ ] Set sign-in URL to `/sign-in`
- [ ] Set sign-up URL to `/sign-up`
- [ ] Set after-sign-in URL to `/dashboard`
- [ ] Set after-sign-up URL to `/dashboard`

**Environment Variables:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## ✅ Supabase Setup Checklist

- [ ] Signed up at https://supabase.com
- [ ] Created new project
- [ ] Waited for project setup (2 minutes)
- [ ] Copied project URL to `.env`
- [ ] Copied anon key to `.env`
- [ ] Copied service role key to `.env`
- [ ] Opened SQL Editor
- [ ] Ran database creation SQL
- [ ] Verified tables created (invoices, subscriptions)
- [ ] Created storage bucket "invoices"
- [ ] Made bucket public
- [ ] Verified bucket exists

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

**SQL to Run:**
```sql
CREATE TABLE invoices (...);
CREATE TABLE subscriptions (...);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

## ✅ Stripe Setup Checklist

- [ ] Signed up at https://stripe.com
- [ ] Activated test mode
- [ ] Copied publishable key to `.env`
- [ ] Copied secret key to `.env`
- [ ] Created product "PayChase Pro"
- [ ] Set price to $5/month
- [ ] Set billing to recurring
- [ ] Copied price ID to `.env`
- [ ] (Webhook setup after deployment)

**Environment Variables:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx
```

## ✅ WhatsApp Setup Checklist

### Option A: UltraMsg (Recommended)

- [ ] Signed up at https://ultramsg.com
- [ ] Connected WhatsApp account
- [ ] Scanned QR code
- [ ] Verified connection
- [ ] Copied instance ID to `.env`
- [ ] Copied token to `.env`
- [ ] Set provider to "ultramsg" in `.env`

**Environment Variables:**
```
ULTRAMSG_INSTANCE_ID=instance12345
ULTRAMSG_TOKEN=xxxxx
WHATSAPP_PROVIDER=ultramsg
```

### Option B: Other Providers

- [ ] Signed up at provider website
- [ ] Connected WhatsApp
- [ ] Copied credentials to `.env`
- [ ] Set provider name in `.env`

## ✅ App Configuration Checklist

- [ ] Set `NEXT_PUBLIC_APP_URL=http://localhost:3000` in `.env`
- [ ] All required environment variables filled
- [ ] No placeholder values (xxxxx) remaining
- [ ] `.env` file saved

## ✅ Local Testing Checklist

### Start the App
- [ ] Ran `npm run dev`
- [ ] No errors in terminal
- [ ] Saw "Ready in X seconds"
- [ ] Visited http://localhost:3000
- [ ] Landing page loads correctly

### Test Authentication
- [ ] Clicked "Sign Up"
- [ ] Created test account
- [ ] Received verification email (if enabled)
- [ ] Redirected to dashboard
- [ ] Dashboard loads correctly
- [ ] User email shows in navbar
- [ ] Clicked "Sign Out"
- [ ] Redirected to home page
- [ ] Signed in again successfully

### Test Invoice Creation
- [ ] Clicked "Create Invoice"
- [ ] Filled all required fields
- [ ] Used YOUR WhatsApp number
- [ ] Set due date to tomorrow
- [ ] Clicked "Create Invoice"
- [ ] Saw success toast
- [ ] Invoice appears in list
- [ ] Status shows "pending"

### Test Invoice Sending
- [ ] Clicked "Send Invoice"
- [ ] Saw loading state
- [ ] Saw success toast
- [ ] Checked WhatsApp
- [ ] Received message
- [ ] Received PDF attachment
- [ ] Payment link included
- [ ] PDF opens correctly

### Test Payment Flow
- [ ] Clicked payment link
- [ ] Stripe checkout opened
- [ ] Invoice details correct
- [ ] Used test card: 4242 4242 4242 4242
- [ ] Completed payment
- [ ] Redirected to success page
- [ ] (Webhook test after deployment)

### Test Manual Mark as Paid
- [ ] Created another invoice
- [ ] Clicked "Mark Paid"
- [ ] Status changed to "paid"
- [ ] Button disappeared
- [ ] Dashboard stats updated

### Test Demo Page
- [ ] Visited `/demo`
- [ ] Sample invoices displayed
- [ ] Stats show correct numbers
- [ ] Buttons are disabled
- [ ] "Sign Up" button works

### Test Pricing Page
- [ ] Visited `/pricing`
- [ ] Pricing displayed correctly
- [ ] Features listed
- [ ] "Start Free Trial" button visible
- [ ] (Payment test after Stripe setup)

## ✅ Database Verification Checklist

- [ ] Opened Supabase dashboard
- [ ] Checked "invoices" table
- [ ] Test invoice exists
- [ ] All fields populated correctly
- [ ] user_id matches Clerk user
- [ ] Checked "subscriptions" table
- [ ] Subscription record exists
- [ ] Status is "trialing"
- [ ] trial_ends_at is 7 days from now

## ✅ Storage Verification Checklist

- [ ] Opened Supabase Storage
- [ ] Checked "invoices" bucket
- [ ] PDF file exists
- [ ] File name matches invoice ID
- [ ] File is accessible (public)
- [ ] PDF downloads correctly
- [ ] PDF content is correct

## ✅ Pre-Deployment Checklist

- [ ] All local tests passed
- [ ] No errors in browser console
- [ ] No errors in terminal
- [ ] All features working
- [ ] Ready to deploy

## ✅ Deployment Checklist

### GitHub Setup
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Repository is accessible

### Vercel Setup
- [ ] Signed up at https://vercel.com
- [ ] Connected GitHub account
- [ ] Imported repository
- [ ] Added all environment variables
- [ ] Updated `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded
- [ ] Visited production URL
- [ ] App loads correctly

### Stripe Webhook Setup
- [ ] Opened Stripe dashboard
- [ ] Went to Developers → Webhooks
- [ ] Clicked "Add endpoint"
- [ ] Set URL: `https://your-domain.vercel.app/api/webhooks/stripe`
- [ ] Selected events:
  - [ ] checkout.session.completed
  - [ ] invoice.paid
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
- [ ] Copied webhook secret
- [ ] Added to Vercel environment variables
- [ ] Redeployed app

### Cron Job Setup
- [ ] Opened Vercel dashboard
- [ ] Went to project settings
- [ ] Checked Cron Jobs section
- [ ] Verified cron job is scheduled
- [ ] Schedule: "0 9 * * *" (9 AM daily)

## ✅ Production Testing Checklist

### Basic Functionality
- [ ] Visited production URL
- [ ] Landing page loads
- [ ] Sign up works
- [ ] Sign in works
- [ ] Dashboard loads
- [ ] Create invoice works
- [ ] Send invoice works (test with real WhatsApp)
- [ ] Payment works (use test card)
- [ ] Mark as paid works

### Webhook Testing
- [ ] Created test invoice
- [ ] Sent invoice
- [ ] Completed payment
- [ ] Checked Stripe dashboard
- [ ] Webhook delivered successfully
- [ ] Invoice marked as paid automatically
- [ ] Dashboard updated

### Cron Job Testing
- [ ] Created overdue invoice (past due date)
- [ ] Waited for cron job (or triggered manually)
- [ ] Checked Vercel function logs
- [ ] Verified reminder sent
- [ ] Checked WhatsApp
- [ ] Received reminder message
- [ ] Verified reminder_count incremented

## ✅ Go-Live Checklist

### Switch to Live Mode
- [ ] Got live Stripe keys
- [ ] Updated Stripe keys in Vercel
- [ ] Created live Stripe product
- [ ] Updated price ID in Vercel
- [ ] Created live Stripe webhook
- [ ] Updated webhook secret in Vercel
- [ ] Verified WhatsApp provider (production ready)
- [ ] Redeployed app

### Final Verification
- [ ] Tested with real payment (small amount)
- [ ] Payment processed successfully
- [ ] Webhook received
- [ ] Invoice marked as paid
- [ ] Everything working in live mode

### Marketing Setup
- [ ] Added custom domain (optional)
- [ ] Updated DNS records
- [ ] SSL certificate active
- [ ] Updated `NEXT_PUBLIC_APP_URL`
- [ ] Redeployed
- [ ] Verified custom domain works

## ✅ Monitoring Checklist

### Daily Checks
- [ ] Check Vercel function logs
- [ ] Check Stripe dashboard
- [ ] Check Supabase dashboard
- [ ] Check WhatsApp provider dashboard
- [ ] Check for errors

### Weekly Checks
- [ ] Review error rates
- [ ] Check storage usage
- [ ] Review database performance
- [ ] Check subscription metrics
- [ ] Review user feedback

## ✅ Maintenance Checklist

### Monthly
- [ ] Update dependencies
- [ ] Check for security updates
- [ ] Review performance
- [ ] Backup database
- [ ] Review costs

### Quarterly
- [ ] Major dependency updates
- [ ] Feature additions
- [ ] User feedback implementation
- [ ] Performance optimization
- [ ] Security audit

## 🎉 Completion Checklist

- [ ] All setup steps completed
- [ ] All tests passed
- [ ] Deployed to production
- [ ] Live mode activated
- [ ] Monitoring in place
- [ ] Ready for users!

---

**Congratulations! Your PayChase app is live and ready to accept users!** 🚀

Keep this checklist for future reference and maintenance.
