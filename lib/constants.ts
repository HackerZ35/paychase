export const CURRENCIES = [
  { value: "USD", label: "USD - US Dollar", symbol: "$" },
  { value: "INR", label: "INR - Indian Rupee", symbol: "₹" },
  { value: "EUR", label: "EUR - Euro", symbol: "€" },
  { value: "GBP", label: "GBP - British Pound", symbol: "£" },
  { value: "AUD", label: "AUD - Australian Dollar", symbol: "A$" },
  { value: "CAD", label: "CAD - Canadian Dollar", symbol: "C$" },
];

export const INVOICE_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  OVERDUE: "overdue",
} as const;

export const SUBSCRIPTION_STATUS = {
  TRIALING: "trialing",
  ACTIVE: "active",
  CANCELED: "canceled",
  PAST_DUE: "past_due",
} as const;

export const REMINDER_CONFIG = {
  MAX_REMINDERS: 5,
  DAYS_BETWEEN_REMINDERS: 3,
  DAYS_AFTER_DUE_DATE: 1,
};

export const WHATSAPP_TEMPLATES = {
  INVOICE: (clientName: string, amount: string, currency: string, dueDate: string, paymentLink: string) =>
    `Hi ${clientName}, here's your invoice for ${currency} ${amount} due on ${dueDate}. You can pay instantly here: ${paymentLink}`,
  
  REMINDER: (amount: string, currency: string, daysOverdue: number, paymentLink: string) =>
    `Friendly reminder: your invoice of ${currency} ${amount} is now ${daysOverdue} days overdue. Pay here: ${paymentLink} – thank you!`,
};
