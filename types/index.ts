export type InvoiceStatus = "pending" | "paid" | "overdue";

export type SubscriptionStatus = "trialing" | "active" | "canceled" | "past_due";

export interface Invoice {
  id: string;
  user_id: string;
  client_name: string;
  client_whatsapp: string;
  client_email?: string;
  amount: number;
  currency: string;
  due_date: string;
  description?: string;
  status: InvoiceStatus;
  payment_link?: string;
  pdf_url?: string;
  reminder_count: number;
  last_reminder_sent?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: SubscriptionStatus;
  trial_ends_at?: string;
  current_period_end?: string;
  created_at: string;
}

export interface CreateInvoiceInput {
  client_name: string;
  client_whatsapp: string;
  client_email?: string;
  amount: number;
  currency: string;
  due_date: string;
  description?: string;
}

export interface WhatsAppProvider {
  name: string;
  sendMessage: (phone: string, message: string, pdfUrl?: string) => Promise<any>;
}
