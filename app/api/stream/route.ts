import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const supabase = createClient();

async function notifyUsers() {}
export async function POST(request, res) {
  try {
    const channel = supabase.channel("streamer_channel");
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const sendStatus = await channel.send({
          type: "broadcast",
          event: "streamer_online",
          payload: { message: "Streamer is online" },
        });

        if (sendStatus !== "ok") {
          console.error("Error notifying users");
          return NextResponse.json({ message: "failed" }, { status: 500 });
        }

        return NextResponse.json({ message: "yay" }, { status: 201 });
      }
    });
  } catch (error) {
    console.error("Server error", error);
  }
  return NextResponse.json({ message: "yay" }, { status: 201 });
}
