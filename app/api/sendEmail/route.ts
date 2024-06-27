import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import SendEmail from "@/components/sendEmail";
import { Resend } from "resend";

const supabase = createClient();

export async function POST(request: Request) {
  console.log("CALLED");
  const body = await request.json();
  console.log("offline followers:", body.offlineFollowers);
  console.log("key", process.env.NEXT_PUBLIC_RESEND_KEY);
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
  try {
    await Promise.all(
      body.offlineFollowers.map(async (followerId: string) => {
        console.log("Inside:", followerId);
        const { data: follower, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", followerId)
          .single();

        if (error || !follower) {
          console.error("Error fetching follower:", error);
          return;
        }

        await resend.emails.send({
          from: "frankalvarez475@gmail.com",
          to: follower.email,
          subject: "hello world",
          text: "it works",
        });
      })
    );
  } catch (error) {
    console.error(error);
  }

  try {
    await resend.emails.send({
      from: "frankalvarez475@gmail.com",
      to: "frankalvarez475@gmail.com",
      subject: "hello world",
      text: "it works",
    });
  } catch (e) {
    console.error("rip", e);
  }

  return NextResponse.json({ status: "Emails sent" });
}
