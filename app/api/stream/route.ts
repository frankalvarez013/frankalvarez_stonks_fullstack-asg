import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

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
