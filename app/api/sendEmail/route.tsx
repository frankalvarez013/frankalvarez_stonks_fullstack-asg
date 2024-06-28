import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import Email from "@/components/SendEmail";
import { Resend } from "resend";

const supabase = createClient();

export async function POST(request: Request) {
  const body = await request.json();

  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

  try {
    await Promise.all(
      body.offlineFollowers.map(async (followerId: string) => {
        const { data: follower, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", followerId)
          .single();

        if (error || !follower) {
          console.error("Error fetching follower:", error);
          return;
        }

        const data = await resend.emails.send({
          from: "frankalvarez@fsalvarez.com",
          to: follower.email,
          subject: `STONKS Assignment: ${body.streamerName} is Live!`,
          react: <Email name={follower.name} link={body.streamerName} />,
        });
      })
    );
  } catch (error) {
    console.error("ERROR", error);
  }
  return NextResponse.json({ status: "Emails sent" });
}
