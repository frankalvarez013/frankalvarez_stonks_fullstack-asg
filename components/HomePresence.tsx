"use client";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/store/user";
import { useEffect, useState } from "react";
import FollowDialog from "./FollowDialog";
export default function HomePresence() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifUser, setNotifUser] = useState("");
  const supabase = createClient();
  const user = useUser((state) => state.user);
  console.log("In Presence");
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
      console.log("This should hit!!!");
      console.log(payload.payload.filter);
      const checkFollower = payload.payload.followers.filter(
        (follower) => follower === user?.id
      );
      if (checkFollower.length === 0) {
      } else {
        setIsOpen(true);
        setNotifUser(payload.payload.streamerName);
      }
    });
  }, [user]);
  if (!user) {
    return <></>;
  }
  return (
    <>
      {" "}
      <FollowDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        info={{
          title: "Look!",
          description: `${notifUser} is Streaming!`,
          link: notifUser,
          button: "View Stream!",
          streamCheck: true,
        }}
      />
      ;
    </>
  );
}
