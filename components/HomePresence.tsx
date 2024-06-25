"use client";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/store/user";
import { useEffect, useState } from "react";
export default function HomePresence() {
  const supabase = createClient();
  const user = useUser((state) => state.user);
  console.log("Exqueze me");
  const [onlineUser, setOnlineUser] = useState(0);
  useEffect(() => {
    const channel = supabase.channel("streamer_channel");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUser([...new Set(userIds)].length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
    channel.on("broadcast", { event: "streamer_online" }, (payload) => {
      alert("Whats up");
    });
  }, [user]);
  if (!user) {
    console.log("hi");
    return <></>;
  }
  return <div>HI</div>;
}
