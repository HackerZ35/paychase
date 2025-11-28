import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Invoice = {
  id: string;
  user_id: string;
  client_name: string;
  client_whatsapp: string;
  client_email?: string;
  amount: number;
  currency: string;
  due_date: string;
  description?: string;
  status: 'pending' | 'paid' | 'overdue';
  payment_link?: string;
  pdf_url?: string;
  reminder_count: number;
  last_reminder_sent?: string;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: 'trialing' | 'active' | 'canceled' | 'past_due';
  trial_ends_at?: string;
  current_period_end?: string;
  created_at: string;
};
