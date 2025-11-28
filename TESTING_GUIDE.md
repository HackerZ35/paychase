# PayChase - Testing Guide

## Local Testing Checklist

### 1. Authentication Testing

**Sign Up:**
- [ ] Visit `/sign-up`
- [ ] Enter email and password
- [ ] Verify account creation
- [ ] Check redirect to dashboard
- [ ] Verify user appears in Clerk dashboard

**Sign In:**
- [ ] Visit `/sign-in`
- [ ] Enter credentials
- [ ] Verify successful login
- [ ] Check redirect to dashboard

**Sign Out:**
- [ ] Click sign out button
- [ ] Verify redirect to home page
- [ ] Try accessing `/dashboard` (should redirect to sign-in)

### 2. Dashboard Testing

**Initial Load:**
- [ ] Dashboard displays correctly
- [ ] Stats show 0 invoices initially
- [ ] "Create Invoice" button visible
- [ ] User email displayed in navbar

**Responsive Design:**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] All elements properly aligned

### 3. Invoice Creation Testing

**Valid Invoice:**
- [ ] Click "Create Invoice"
- [ ] Fill all required fields:
  - Client Name: "Test Client"
  - WhatsApp: "+1234567890" (use your real number)
  - Email: "test@example.com"
  - Amount: 100
  - Currency: USD
  - Due Date: Tomorrow's date
  - Description: "Test invoice"
- [ ] Click "Create Invoice"
- [ ] Verify success toast
- [ ] Check invoice appears in list
- [ ] Verify status is "pending"

**Validation Testing:**
- [ ] Try submitting without client name (should fail)
- [ ] Try submitting without WhatsApp (should fail)
- [ ] Try submitting with invalid amount (should fail)
- [ ] Try submitting without due date (should fail)

**Database Verification:**
- [ ] Check Supabase dashboard
- [ ] Verify invoice record created
- [ ] Check all fields are correct
- [ ] Verify user_id matches Clerk user

### 4. PDF Generation Testing

**Generate PDF:**
- [ ] Create an invoice
- [ ] Click "Send Invoice"
- [ ] Wait for processing
- [ ] Check Supabase Storage bucket
- [ ] Verify PDF file exists
- [ ] Download and open PDF
- [ ] Verify all invoice details are correct
- [ ] Check formatting and layout

### 5. WhatsApp Sending Testing

**Send Invoice:**
- [ ] Create invoice with YOUR WhatsApp number
- [ ] Click "Send Invoice"
- [ ] Wait for success toast
- [ ] Check your WhatsApp
- [ ] Verify message received
- [ ] Verify PDF attachment received
- [ ] Verify payment link is included
- [ ] Click payment link (should open Stripe)

**Provider Testing:**
- [ ] Test with UltraMsg
- [ ] Check UltraMsg dashboard for delivery status
- [ ] Verify message format is correct
- [ ] Test with different phone number formats

### 6. Payment Flow Testing

**Stripe Checkout:**
- [ ] Click payment link from WhatsApp
- [ ] Verify Stripe checkout page loads
- [ ] Check invoice details are correct
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Expiry: Any future date
- [ ] CVC: Any 3 digits
- [ ] Complete payment
- [ ] Verify redirect to success page

**Webhook Testing:**
- [ ] Install Stripe CLI: `stripe login`
- [ ] Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Complete a test payment
- [ ] Check webhook received
- [ ] Verify invoice marked as paid
- [ ] Check dashboard updates

**Manual Mark as Paid:**
- [ ] Create an invoice
- [ ] Click "Mark Paid" button
- [ ] Verify status changes to "paid"
- [ ] Verify button disappears
- [ ] Check database updated

### 7. Subscription Testing

**Free Trial:**
- [ ] Sign up new account
- [ ] Check subscription status API
- [ ] Verify status is "trialing"
- [ ] Verify trial_ends_at is 7 days from now
- [ ] Access dashboard (should work)

**Subscription Checkout:**
- [ ] Visit `/pricing`
- [ ] Click "Start Free Trial"
- [ ] Complete Stripe checkout (use test card)
- [ ] Verify redirect to dashboard
- [ ] Check subscription status is "active"
- [ ] Verify in Stripe dashboard

**Expired Trial:**
- [ ] Manually update trial_ends_at to past date in database
- [ ] Try accessing dashboard
- [ ] Verify redirect to pricing page

### 8. Reminder System Testing

**Manual Cron Test:**
- [ ] Create invoice with due date in the past
- [ ] Call API: `curl http://localhost:3000/api/cron/check-reminders`
- [ ] Check response JSON
- [ ] Verify WhatsApp reminder sent
- [ ] Check reminder_count incremented
- [ ] Check last_reminder_sent updated
- [ ] Verify status changed to "overdue"

**Reminder Logic:**
- [ ] Create overdue invoice (due date 4 days ago)
- [ ] Run cron job
- [ ] Verify reminder sent
- [ ] Run cron job again immediately
- [ ] Verify NO reminder sent (too soon)
- [ ] Manually update last_reminder_sent to 4 days ago
- [ ] Run cron job
- [ ] Verify reminder sent again

**Max Reminders:**
- [ ] Create invoice with reminder_count = 4
- [ ] Make it overdue
- [ ] Run cron job
- [ ] Verify reminder sent (5th reminder)
- [ ] Run cron job again
- [ ] Verify NO reminder sent (max reached)

### 9. Demo Page Testing

**Public Access:**
- [ ] Visit `/demo` (no login required)
- [ ] Verify sample invoices display
- [ ] Verify stats show correct numbers
- [ ] Verify buttons are disabled
- [ ] Click "Sign Up" button
- [ ] Verify redirect to sign-up page

### 10. Error Handling Testing

**Network Errors:**
- [ ] Disconnect internet
- [ ] Try creating invoice
- [ ] Verify error toast displays
- [ ] Reconnect internet
- [ ] Verify app recovers

**Invalid Data:**
- [ ] Try sending invoice with invalid WhatsApp number
- [ ] Verify error handling
- [ ] Try creating invoice with negative amount
- [ ] Verify validation

**API Errors:**
- [ ] Temporarily break Supabase connection
- [ ] Try loading dashboard
- [ ] Verify error message
- [ ] Fix connection
- [ ] Verify recovery

### 11. Security Testing

**Protected Routes:**
- [ ] Sign out
- [ ] Try accessing `/dashboard` directly
- [ ] Verify redirect to sign-in
- [ ] Try accessing `/api/invoices`
- [ ] Verify 401 Unauthorized

**User Isolation:**
- [ ] Create invoice with User A
- [ ] Sign out
- [ ] Sign in as User B
- [ ] Verify User B cannot see User A's invoices
- [ ] Try accessing User A's invoice via API
- [ ] Verify 404 or 401

**Webhook Security:**
- [ ] Send POST to `/api/webhooks/stripe` without signature
- [ ] Verify request rejected
- [ ] Send with invalid signature
- [ ] Verify request rejected

### 12. Performance Testing

**Load Time:**
- [ ] Measure dashboard load time (should be < 2s)
- [ ] Measure invoice creation time (should be < 1s)
- [ ] Measure PDF generation time (should be < 3s)
- [ ] Measure WhatsApp send time (should be < 5s)

**Concurrent Users:**
- [ ] Open multiple browser tabs
- [ ] Sign in with different accounts
- [ ] Create invoices simultaneously
- [ ] Verify no conflicts

## Production Testing Checklist

### Pre-Deployment

- [ ] All environment variables set in Vercel
- [ ] Database tables created
- [ ] Storage bucket created and public
- [ ] Stripe webhook configured
- [ ] WhatsApp provider verified
- [ ] Cron job configured in vercel.json

### Post-Deployment

**Basic Functionality:**
- [ ] Visit production URL
- [ ] Sign up works
- [ ] Sign in works
- [ ] Dashboard loads
- [ ] Create invoice works
- [ ] Send invoice works (test with real WhatsApp)
- [ ] Payment works (use test card)
- [ ] Webhook receives events

**Stripe Webhook:**
- [ ] Check Stripe dashboard → Webhooks
- [ ] Verify endpoint is active
- [ ] Complete test payment
- [ ] Check webhook delivery status
- [ ] Verify invoice marked as paid

**Cron Job:**
- [ ] Check Vercel dashboard → Cron Jobs
- [ ] Verify job is scheduled
- [ ] Wait for next run or trigger manually
- [ ] Check function logs
- [ ] Verify reminders sent

**Performance:**
- [ ] Test from different locations
- [ ] Check page load times
- [ ] Verify images load quickly
- [ ] Test on mobile device
- [ ] Check Vercel analytics

### Monitoring

**Daily Checks:**
- [ ] Check Vercel function logs for errors
- [ ] Check Stripe dashboard for payments
- [ ] Check Supabase for database issues
- [ ] Check WhatsApp provider for delivery status

**Weekly Checks:**
- [ ] Review error rates
- [ ] Check storage usage
- [ ] Review database performance
- [ ] Check subscription metrics

## Test Data

### Test Credit Cards (Stripe)

**Success:**
- 4242 4242 4242 4242 (Visa)
- 5555 5555 5555 4444 (Mastercard)

**Decline:**
- 4000 0000 0000 0002 (Card declined)

**3D Secure:**
- 4000 0027 6000 3184 (Requires authentication)

### Test Phone Numbers

Use your real WhatsApp number for testing, but format correctly:
- US: +1234567890
- India: +919876543210
- UK: +447123456789

### Test Invoices

**Standard Invoice:**
- Client: "John Doe"
- WhatsApp: Your number
- Amount: 100
- Currency: USD
- Due Date: Tomorrow

**Overdue Invoice:**
- Client: "Jane Smith"
- WhatsApp: Your number
- Amount: 500
- Currency: USD
- Due Date: 5 days ago

## Debugging Tips

### Check Logs

**Vercel:**
```bash
vercel logs
```

**Stripe CLI:**
```bash
stripe logs tail
```

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### Common Issues

**WhatsApp not sending:**
- Check provider credentials
- Verify phone number format
- Check provider dashboard
- View function logs

**PDF not generating:**
- Check Supabase storage bucket exists
- Verify bucket is public
- Check service role key
- View function logs

**Webhook not working:**
- Verify webhook secret
- Check Stripe dashboard for delivery attempts
- Test with Stripe CLI
- View function logs

**Database errors:**
- Verify tables exist
- Check connection string
- Verify service role key
- Check Supabase logs

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- Playwright for E2E tests
- Stripe test fixtures
- Mock WhatsApp provider
- Database seeding scripts

## Test Coverage Goals

- [ ] 100% of API routes tested
- [ ] All user flows tested
- [ ] Error scenarios covered
- [ ] Security vulnerabilities checked
- [ ] Performance benchmarks met
- [ ] Mobile responsiveness verified

---

Complete this testing checklist before going live to ensure a smooth launch! 🚀
