"use client";
import Switch from "@/components/ui/Switch";
import { useUser } from "@/store/user";
import React, { useEffect } from "react";
import defAvatar from "../../../../public/defAvatar.svg";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
export default function Stream({ StreamerInfo }) {
  const user = useUser((state) => state.user);
  let isStreamer = false;
  let stream = null;

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
          <div className="font-bold">TITLE </div>
          <div className="text-sm">{StreamerInfo.username}</div>
        </div>
      </div>
      {isStreamer ? (
        <Switch StreamerInfo={StreamerInfo} />
      ) : (
        <div>
          <button
            onClick={() => {
              console.log("BLEH");
            }}
          >
            Follow
          </button>
        </div>
      )}
    </div>
  );
}
