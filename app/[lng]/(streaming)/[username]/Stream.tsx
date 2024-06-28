"use client";
import Switch from "@/components/ui/Switch";
import { useUser } from "@/store/user";
import React, { useEffect, useState, useRef } from "react";
import defAvatar from "../../../../public/defAvatar.svg";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import FollowDialog from "@/components/FollowDialog";
import EmojiSelection from "./EmojiSelection";

export default function Stream({ StreamerInfo, stream }) {
  const [follow, setFollow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser((state) => state.user);
  const supabase = createClient();
  const isInitialMount = useRef(true);
  let isStreamer = false;

  useEffect(() => {
    if (stream.followers && user) {
      const checkFollow = stream.followers.some(
        (follower) => follower === user.id
      );
      setFollow(checkFollow);
    }
  }, [stream.followers, user]);

  useEffect(() => {
    const followAdd = async () => {
      try {
        const { data, error } = await supabase
          .from("stream")
          .select("followers")
          .eq("username", StreamerInfo.username)
          .single();

        if (error) {
          throw error;
        }

        const currentFollowers = data.followers || [];
        let updatedFollowers = [];

        if (follow) {
          updatedFollowers = [...currentFollowers, user.id];
        } else {
          updatedFollowers = currentFollowers.filter(
            (followerId) => followerId !== user.id
          );
        }

        await supabase
          .from("stream")
          .update({ followers: updatedFollowers })
          .eq("username", StreamerInfo.username);
      } catch (e) {
        console.error(e);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      followAdd();
    }
  }, [follow, user, supabase, StreamerInfo.username]);

  if (user?.email?.localeCompare(StreamerInfo.email) === 0) {
    isStreamer = true;
  }

  return (
    <div className="flex flex-col w-full h-1/2 items-end justify-between gap-10 mt-2">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex gap-2">
          <div className="w-14">
            <Image alt="Avatar" src={defAvatar} />
          </div>
          <div>
            <div className="font-bold">{StreamerInfo.title || "My Stream"}</div>
            <div className="text-sm">{StreamerInfo.username}</div>
          </div>
        </div>

        {isStreamer ? (
          <>
            <Switch StreamerInfo={StreamerInfo} />
          </>
        ) : (
          <div>
            <button
              className="py-2 px-2 rounded-3xl hover:cursor-pointer bg-orange-400 hover:bg-orange-200 hover:text-orange-400 text-orange-50"
              onClick={() => {
                if (!user || user === undefined) {
                  setIsOpen(true);
                } else {
                  setFollow((prevFollow) => !prevFollow);
                }
              }}
            >
              {follow ? <h1>Unfollow</h1> : <h1>Follow</h1>}
            </button>
          </div>
        )}
      </div>
      {isStreamer ? (
        <div className="w-1/2 h-full">
          <EmojiSelection initialStream={stream}></EmojiSelection>
        </div>
      ) : (
        ""
      )}
      <FollowDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        info={{
          title: "Hold On!",
          description: `Please login to follow your favorite Streamer!`,
          link: "/login",
          button: "Login",
          streamCheck: false,
        }}
      ></FollowDialog>
    </div>
  );
}
