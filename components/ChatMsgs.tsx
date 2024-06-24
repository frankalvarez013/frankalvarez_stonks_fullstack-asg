"use client";
import { Imessage, useMessage } from "@/store/messages";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { createClient } from "../utils/supabase/client";
import { usePathname } from "next/navigation";
export default function ChatMsgs() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = createClient();
  const pathnameList = usePathname();
  const pathname = pathnameList!.substring(pathnameList!.lastIndexOf("/") + 1);

  console.log("Listing Channel Name: |" + pathname);

  useEffect(() => {
    const channel = supabase
      .channel(`${pathname} stream`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },

        async (payload) => {
          console.log("checking?");
          if (
            !optimisticIds.includes(payload.new.id) &&
            payload.new.sent_from === pathname
          ) {
            console.log("Change received!", payload);
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();
            if (error) {
              console.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage as Imessage);
            }
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      className="flex-1 flex flex-col p-5 h-full overflow-y-auto"
      ref={scrollRef}
    >
      <div className="flex-1"></div>
      <div className=" text-black space-y-7">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
    </div>
  );
}
