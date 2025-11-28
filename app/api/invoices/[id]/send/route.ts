import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { generateSimpleInvoicePDF } from "@/lib/generate-pdf-simple";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { data: invoice, error } = await supabaseAdmin
      .from("invoices")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Generate PDF using PDFKit
    let publicUrl = null;
    try {
      console.log('Starting PDF generation for invoice:', invoice.id);
      const pdfBuffer = await generateSimpleInvoicePDF(invoice);
      console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');
      
      const fileName = `invoice-${invoice.id}.pdf`;
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from("invoices")
        .upload(fileName, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (uploadError) {
        console.error('PDF upload error:', uploadError);
      } else {
        const { data: { publicUrl: url } } = supabaseAdmin
          .storage
          .from("invoices")
          .getPublicUrl(fileName);
        publicUrl = url;
        console.log('PDF uploaded successfully, URL:', publicUrl);
      }
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
      // Continue without PDF - WhatsApp message will still send
    }

    // Payment instructions (customize with your details)
    const paymentInstructions = `
Payment Options:
💳 bKash: 01XXXXXXXXX
💳 Nagad: 01XXXXXXXXX
🏦 Bank: [Your Bank Details]
💰 Payoneer: [Your Email]
    `.trim();

    const message = `Hi ${invoice.client_name},

📄 Invoice #${invoice.id.slice(0, 8).toUpperCase()}
💵 Amount: ${invoice.currency} ${invoice.amount}
📅 Due Date: ${new Date(invoice.due_date).toLocaleDateString()}

${invoice.description ? `📝 ${invoice.description}\n\n` : ''}${paymentInstructions}

Thank you for your business! 🙏`;

    await sendWhatsAppMessage(invoice.client_whatsapp, message, publicUrl);

    await supabaseAdmin
      .from("invoices")
      .update({
        pdf_url: publicUrl || undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Send invoice error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
