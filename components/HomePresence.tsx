"use client";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/store/user";
import { useCallback, useEffect, useRef, useState } from "react";
import FollowDialog from "./FollowDialog";
export default function HomePresence() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifUser, setNotifUser] = useState("");
  const supabase = createClient();
  const user = useUser((state) => state.user);
  const [streamerName, setStreamerName] = useState("");

  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [sendEmail, setSendEmail] = useState(false);
  const onlineUserRef = useRef(onlineUser);
  const followersRef = useRef(followers);
  const streamerNameRef = useRef(streamerName);
  const sendEmailRef = useRef(sendEmail);

  useEffect(() => {
    onlineUserRef.current = onlineUser;
  }, [onlineUser]);
  useEffect(() => {
    followersRef.current = followers;
    streamerNameRef.current = streamerName;
  }, [followers, streamerName]);
  useEffect(() => {
    sendEmailRef.current = sendEmail;

    send(streamerNameRef.current);
  }, [sendEmail]);

  const send = async (streamer) => {
    const offlineFollowers = followersRef.current.filter(
      (follower) => !onlineUserRef.current.includes(follower)
    );

    try {
      const responseStreamPost = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offlineFollowers,
          streamerName: streamerNameRef.current,
        }),
      });
      const res = responseStreamPost.json();
    } catch (error) {
      console.error("error sending emails", error);
    }
  };
  useEffect(() => {
    const channel = supabase.channel("streamer_channel");
    channel
      .on("presence", { event: "sync" }, () => {
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
      setFollowers(payload.payload.followers);
      const checkFollower = payload.payload.followers.filter(
        (follower) => follower === user?.id
      );
      if (checkFollower.length === 0) {
      } else {
        setIsOpen(true);
        setNotifUser(payload.payload.streamerName);
      }
      setStreamerName(payload.payload.streamerName);
      setSendEmail(!sendEmail);
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
