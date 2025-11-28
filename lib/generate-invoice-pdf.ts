import { renderToBuffer } from '@react-pdf/renderer';
import { InvoicePDF } from './pdf-generator';
import { Invoice } from './supabase';
import React from 'react';

export async function generateInvoicePDF(invoice: Invoice): Promise<Buffer> {
  try {
    console.log('Creating PDF element...');
    // Create the PDF document element
    const pdfElement = React.createElement(InvoicePDF, { invoice });
    console.log('PDF element created, rendering to buffer...');
    
    // Render to buffer
    const buffer = await renderToBuffer(pdfElement);
    console.log('PDF buffer created successfully');
    
    return buffer;
  } catch (error) {
    console.error('PDF generation error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}
