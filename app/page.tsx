import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Bell, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">PayChase</h1>
        <div className="space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            Get Paid Faster with <span className="text-blue-600">WhatsApp</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Send invoices via WhatsApp and get automatic payment reminders. 
            No more chasing clients manually.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">7-day free trial • No credit card required</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-blue-600" size={32} />
            </div>
            <h3 className="font-semibold mb-2">Instant Delivery</h3>
            <p className="text-gray-600 text-sm">Send invoices via WhatsApp in one click</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-green-600" size={32} />
            </div>
            <h3 className="font-semibold mb-2">Auto Reminders</h3>
            <p className="text-gray-600 text-sm">Automatic follow-ups every 3 days</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-600 text-sm">Stripe & Razorpay integration</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-orange-600" size={32} />
            </div>
            <h3 className="font-semibold mb-2">Track Status</h3>
            <p className="text-gray-600 text-sm">Know when invoices are paid</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/pricing">
            <Button variant="link" className="text-blue-600">
              View Pricing →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
