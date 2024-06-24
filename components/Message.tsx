import { Imessage } from "@/store/messages";
import React from "react";
import Image from "next/image";
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
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-nowrap">{message.users?.name}</h1>
          <br />
          <h1 className="text-sm text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className=" text-sm text-slate-800">{message.text}</p>
      </div>
    </div>
  );
}
