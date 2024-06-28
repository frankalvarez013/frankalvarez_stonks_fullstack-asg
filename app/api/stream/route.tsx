import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Email from "@/components/SendEmail";

const supabase = createClient();

export async function POST(request) {
  try {
    console.error("lemme see");
    const channel = supabase.channel("streamer_channel");
    const body = await request.json();
    const { error: subscribeError } = await channel.subscribe();

    if (subscribeError) {
      console.error("Subscription error", subscribeError);
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }

    const { error: sendError } = await channel.send({
      type: "broadcast",
      event: "streamer_online",
      payload: { followers: body.followers, streamerName: body.streamerName },
    });
    const { data: offlineFollowers, error } = await supabase
      .from("users")
      .select(`*`)
      .contains("following", [body.streamerName])
      .neq("online", true);
    //also add followers that are online
    console.log(offlineFollowers);
    if (error) {
      console.error("Error fetching offline followers:", error);
    } else {
      try {
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
        await Promise.all(
          offlineFollowers.map(async (follower) => {
            const data = await resend.emails.send({
              from: "frankalvarez@fsalvarez.com",
              to: follower.email,
              subject: `STONKS Assignment: ${body.streamerName} is Live!`,
              react: <Email name={follower.name} link={body.streamerName} />,
            });
          })
        );
      } catch (error) {
        console.error("error sending emails", error);
      }
    }

    if (sendError) {
      console.error("Error notifying users", sendError);
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "yay" }, { status: 201 });
  } catch (error) {
    console.error("Server error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
