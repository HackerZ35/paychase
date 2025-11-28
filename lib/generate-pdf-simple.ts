import PDFDocument from 'pdfkit';
import { Invoice } from './supabase';

export async function generateSimpleInvoicePDF(invoice: Invoice): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      // Collect PDF data
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc
        .fontSize(28)
        .fillColor('#2563eb')
        .text('INVOICE', { align: 'left' });

      doc
        .fontSize(10)
        .fillColor('#666666')
        .text(`Invoice #${invoice.id.slice(0, 8).toUpperCase()}`, { align: 'left' });

      doc.moveDown(2);

      // Bill To Section
      doc
        .fontSize(10)
        .fillColor('#666666')
        .text('BILL TO:', { continued: false });

      doc
        .fontSize(12)
        .fillColor('#000000')
        .text(invoice.client_name)
        .text(invoice.client_whatsapp);

      if (invoice.client_email) {
        doc.text(invoice.client_email);
      }

      doc.moveDown(1.5);

      // Invoice Details
      doc
        .fontSize(10)
        .fillColor('#666666')
        .text('INVOICE DATE:', { continued: false });

      doc
        .fontSize(12)
        .fillColor('#000000')
        .text(new Date(invoice.created_at).toLocaleDateString());

      doc.moveDown(0.5);

      doc
        .fontSize(10)
        .fillColor('#666666')
        .text('DUE DATE:', { continued: false });

      doc
        .fontSize(12)
        .fillColor('#000000')
        .text(new Date(invoice.due_date).toLocaleDateString());

      doc.moveDown(1.5);

      // Description
      if (invoice.description) {
        doc
          .fontSize(10)
          .fillColor('#666666')
          .text('DESCRIPTION:', { continued: false });

        doc
          .fontSize(12)
          .fillColor('#000000')
          .text(invoice.description, { width: 500 });

        doc.moveDown(1.5);
      }

      // Total Amount Section
      doc.moveDown(2);
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor('#2563eb')
        .lineWidth(2)
        .stroke();

      doc.moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text('TOTAL AMOUNT DUE:', { continued: false });

      doc
        .fontSize(24)
        .fillColor('#2563eb')
        .text(`${invoice.currency} ${invoice.amount.toFixed(2)}`);

      // Footer
      doc.moveDown(3);
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .stroke();

      doc.moveDown(1);

      doc
        .fontSize(10)
        .fillColor('#666666')
        .text('Thank you for your business!', { align: 'center' });

      doc
        .fontSize(10)
        .fillColor('#666666')
        .text(`Please make payment by ${new Date(invoice.due_date).toLocaleDateString()}`, { 
          align: 'center' 
        });

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
