import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { SubscribeButton } from "@/components/subscribe-button";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600">PayChase</h1>
        </Link>
        <div className="space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">One plan. Unlimited invoices.</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-2 border-blue-500 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-2">PayChase Pro</CardTitle>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                $5<span className="text-2xl text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">or ₹399/month</p>
              <p className="text-sm text-green-600 font-semibold mt-2">7-day free trial</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Unlimited invoices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>WhatsApp delivery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Automatic payment reminders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Beautiful PDF invoices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Stripe & Razorpay integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Payment tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Email support</span>
                </li>
              </ul>

              <SubscribeButton />

              <p className="text-xs text-center text-gray-500 mt-4">
                Cancel anytime. No questions asked.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/demo">
            <Button variant="link" className="text-blue-600">
              Try the demo first →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
