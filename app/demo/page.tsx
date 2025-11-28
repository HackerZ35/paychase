"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

const demoInvoices = [
  {
    id: "1",
    client_name: "John Smith",
    client_whatsapp: "+1234567890",
    amount: 1500,
    currency: "USD",
    due_date: "2024-12-15",
    status: "pending",
    description: "Website development services",
  },
  {
    id: "2",
    client_name: "Sarah Johnson",
    client_whatsapp: "+9876543210",
    amount: 750,
    currency: "USD",
    due_date: "2024-11-20",
    status: "overdue",
    description: "Logo design project",
  },
  {
    id: "3",
    client_name: "Mike Wilson",
    client_whatsapp: "+1122334455",
    amount: 2500,
    currency: "USD",
    due_date: "2024-11-10",
    status: "paid",
    description: "Mobile app development",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">PayChase Demo</h1>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-center">
            This is a demo with sample data. Sign up to create real invoices!
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-gray-600 mt-1">Manage your invoices and payments</p>
          </div>
          <Link href="/sign-up">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">1</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">1</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoInvoices.map((invoice) => (
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
                          <Button size="sm" disabled>
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </Button>
                          <Button size="sm" variant="outline" disabled>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Paid
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/sign-up">
            <Button size="lg">
              Sign Up to Create Real Invoices
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
