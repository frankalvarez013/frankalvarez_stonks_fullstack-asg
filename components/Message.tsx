import { Imessage } from "@/store/messages";
import React from "react";
import Image from "next/image";
import * as emoji from "node-emoji";

export default function Message({ message }: { message: Imessage }) {
  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.name!}
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex-1">
        <div className="flex flex-col ">
          <h1 className="font-bold text-nowrap">{message.users?.name}</h1>
          <h1 className="text-xs font-light text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className=" text-sm text-slate-800">{emoji.emojify(message.text)}</p>
      </div>
    </div>
  );
}
