import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: overdueInvoices, error } = await supabaseAdmin
      .from("invoices")
      .select("*")
      .eq("status", "pending")
      .lt("due_date", today.toISOString())
      .lt("reminder_count", 5);

    if (error) throw error;

    const results = [];

    for (const invoice of overdueInvoices || []) {
      const lastReminder = invoice.last_reminder_sent
        ? new Date(invoice.last_reminder_sent)
        : new Date(invoice.due_date);

      const daysSinceLastReminder = Math.floor(
        (today.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastReminder >= 3) {
        const daysOverdue = Math.floor(
          (today.getTime() - new Date(invoice.due_date).getTime()) / (1000 * 60 * 60 * 24)
        );

        const message = `Friendly reminder: your invoice of ${invoice.currency} ${invoice.amount} is now ${daysOverdue} days overdue. Pay here: ${invoice.payment_link} – thank you!`;

        try {
          await sendWhatsAppMessage(invoice.client_whatsapp, message);

          await supabaseAdmin
            .from("invoices")
            .update({
              reminder_count: invoice.reminder_count + 1,
              last_reminder_sent: new Date().toISOString(),
              status: "overdue",
              updated_at: new Date().toISOString(),
            })
            .eq("id", invoice.id);

          results.push({ id: invoice.id, success: true });
        } catch (error) {
          results.push({ id: invoice.id, success: false, error });
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
