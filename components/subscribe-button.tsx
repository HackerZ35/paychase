"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription/create-checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start subscription",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="w-full text-lg"
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading ? "Loading..." : "Start Free Trial"}
    </Button>
  );
}
