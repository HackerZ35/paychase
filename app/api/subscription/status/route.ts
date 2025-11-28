import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!subscription) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);

      const { data: newSub } = await supabaseAdmin
        .from("subscriptions")
        .insert({
          user_id: userId,
          status: "trialing",
          trial_ends_at: trialEndsAt.toISOString(),
        })
        .select()
        .single();

      return NextResponse.json({ status: "trialing", subscription: newSub });
    }

    const now = new Date();
    const trialEnds = subscription.trial_ends_at ? new Date(subscription.trial_ends_at) : null;

    if (subscription.status === "trialing" && trialEnds && now > trialEnds) {
      return NextResponse.json({ status: "inactive", subscription });
    }

    return NextResponse.json({ status: subscription.status, subscription });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
