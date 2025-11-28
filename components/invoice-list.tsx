"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, Download } from "lucide-react";
import { useState } from "react";

export function InvoiceList({ invoices, onUpdate }: any) {
  const { toast } = useToast();
  const [sending, setSending] = useState<string | null>(null);

  const sendInvoice = async (invoiceId: string) => {
    setSending(invoiceId);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/send`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "Sent!",
        description: "Invoice sent via WhatsApp",
      });

      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive",
      });
    } finally {
      setSending(null);
    }
  };

  const markAsPaid = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/mark-paid`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to update");

      toast({
        title: "Updated!",
        description: "Invoice marked as paid",
      });

      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive",
      });
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No invoices yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice: any) => (
        <div
          key={invoice.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{invoice.client_name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "overdue"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{invoice.client_whatsapp}</p>
              <p className="text-lg font-bold mt-2">
                {invoice.currency} {invoice.amount}
              </p>
              <p className="text-sm text-gray-500">
                Due: {new Date(invoice.due_date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              {invoice.status !== "paid" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => sendInvoice(invoice.id)}
                    disabled={sending === invoice.id}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    {sending === invoice.id ? "Sending..." : "Send"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsPaid(invoice.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Paid
                  </Button>
                </>
              )}
              {invoice.pdf_url && (
                <Button size="sm" variant="ghost" asChild>
                  <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
