"use client";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/store/user";
import { useEffect, useState } from "react";
import FollowDialog from "./FollowDialog";
import { Resend } from "resend";
export default function HomePresence() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifUser, setNotifUser] = useState("");
  const supabase = createClient();
  const user = useUser((state) => state.user);
  console.log("In Presence");
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  useEffect(() => {
    const send = async (streamer) => {
      const offlineFollowers = followers.filter(
        (follower) => !onlineUser.includes(follower)
      );
      console.log("bout to call....");
      try {
        const responseStreamPost = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offlineFollowers,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    };
    const channel = supabase.channel("streamer_channel");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUser([...new Set(userIds)]);
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
      setFollowers(payload.payload.followers);
      const checkFollower = payload.payload.followers.filter(
        (follower) => follower === user?.id
      );
      if (checkFollower.length === 0) {
      } else {
        setIsOpen(true);
        setNotifUser(payload.payload.streamerName);
      }
      send(payload.payload.streamerName);
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
