"use client";
import Switch from "@/components/ui/Switch";
import { useUser } from "@/store/user";
import React, { useEffect, useState } from "react";
import defAvatar from "../../../../public/defAvatar.svg";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import FollowDialog from "@/components/FollowDialog";
export default function Stream({ StreamerInfo }) {
  const user = useUser((state) => state.user);
  const supabase = createClient();
  let isStreamer = false;
  let [isOpen, setIsOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    const followAdd = async () => {
      try {
        const data = await supabase
          .from("stream")
          .select("followers")
          .eq("username", [StreamerInfo.username])
          .single();
        console.log({ data });
        const currentFollowers = data!.data!.followers || [];

        let updatedFollowers = [];
        // Now you can use updatedFollowers as needed
        if (follow) {
          console.log("adding...", user!.id);

          updatedFollowers = [...currentFollowers, user!.id];
        } else {
          console.log("deleting...");

          updatedFollowers = currentFollowers.filter(
            (followerId) => followerId !== user!.id
          );
        }
        await supabase
          .from("stream")
          .update({ followers: updatedFollowers })
          .eq("username", [StreamerInfo.username]);
      } catch (e) {
        console.error(e);
      }
    };
    followAdd();
  }, [follow]);

  if (user?.email?.localeCompare(StreamerInfo.email) === 0) {
    isStreamer = true;
    console.log("bet");
  }
  //   console.log(StreamerInfo);
  return (
    <div className="flex w-full items-center justify-between gap-2 mt-2">
      <div className="flex gap-2">
        <div className="w-14">
          <Image alt="Avatar" src={defAvatar} />
        </div>
        <div>
          <div className="font-bold">{StreamerInfo.title || "My Title"}</div>
          <div className="text-sm">{StreamerInfo.username}</div>
        </div>
      </div>

      {isStreamer ? (
        <Switch StreamerInfo={StreamerInfo} />
      ) : (
        <div>
          <button
            className="py-2 px-2 rounded-3xl hover:cursor-pointer bg-orange-400 hover:bg-orange-200 hover:text-orange-400 text-orange-50"
            onClick={() => {
              if (!user || user === undefined) {
                setIsOpen(true);
              } else {
                setFollow(!follow);
              }
            }}
          >
            {follow ? <h1>Unfollow</h1> : <h1>Follow</h1>}
          </button>
        </div>
      )}
      <FollowDialog isOpen={isOpen} setIsOpen={setIsOpen}></FollowDialog>
    </div>
  );
}
