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
  // const [sendEmail, setSendEmail] = useState(false);
  const userStatusRef = useRef(true);
  const onlineUserRef = useRef(onlineUser);
  const followersRef = useRef(followers);
  const streamerNameRef = useRef(streamerName);
  // const sendEmailRef = useRef(sendEmail);

  useEffect(() => {
    onlineUserRef.current = onlineUser;
    console.log("Updating OnlineUsersRef...", onlineUserRef.current);
  }, [onlineUser]);

  useEffect(() => {
    followersRef.current = followers;
    streamerNameRef.current = streamerName;
  }, [followers, streamerName]);

  // useEffect(() => {
  //   sendEmailRef.current = sendEmail;
  //   send(streamerNameRef.current);
  // }, [sendEmail]);
  const updateUser = async (userId, checkOnline: boolean) => {
    console.log("Fetching Update Command...: into:", checkOnline);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userStatus: checkOnline,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Update response: ", data);
    } catch (error) {
      console.error("User Update Error: ", error);
    }
  };
  // const send = async (streamer) => {
  //   const offlineFollowers = followersRef.current.filter(
  //     (follower) => !onlineUserRef.current.includes(follower)
  //   );

  //   try {
  //     const responseStreamPost = await fetch("/api/sendEmail", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         offlineFollowers,
  //         streamerName: streamerNameRef.current,
  //       }),
  //     });
  //     const res = responseStreamPost.json();
  //   } catch (error) {
  //     console.error("error sending emails", error);
  //   }
  // };
  useEffect(() => {
    if (!user || !user.id) return;
    const channel = supabase.channel("streamer_channel");
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        // console.log("user stat", userStatusRef.current);
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
          // console.log("Synced presence state: ", channel.presenceState());
        }
        setOnlineUser([userIds]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
    channel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("joining!!!");
      console.log("join", key, newPresences);
      console.log("JOINNGINGINgiNgINGing");
      updateUser(newPresences[0].user_id, true);
    });
    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      console.log("Users: ", onlineUserRef.current[0]);
      const checkOffline = onlineUserRef.current[0].filter((onlineUser) => {
        return onlineUser.localeCompare(leftPresences[0].user_id) === 0;
      });

      if (checkOffline.length <= 1) {
        console.log("OFFLINE");
        userStatusRef.current = false;
        console.log("Removing Fool from Online!!", leftPresences[0].user_id);
        updateUser(leftPresences[0].user_id, false);
      } else {
        console.log("ONLINE WITH ITS OWN LINKS - ", checkOffline);
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
      // setSendEmail(!sendEmail);
    });
  }, [user]);

  // useEffect(() => {
  //   console.log("User Status Changed...");
  //   if (!user || !user.id) return;
  //   onlineUserRef.current = onlineUser;
  //   updateUser(userStatusRef.current);
  //   console.log("Online Status Updated!!");
  // }, [user]);
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
    </>
  );
}
