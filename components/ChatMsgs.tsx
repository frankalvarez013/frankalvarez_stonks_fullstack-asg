"use client";
import { Imessage, useMessage } from "@/store/messages";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { usePathname } from "next/navigation";
import { useUser } from "@/store/user";
export default function ChatMsgs() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  // console.log("AAAAAAAAAAAAA", messages);
  const supabase = createClient();
  const pathnameList = usePathname();
  const pathname = pathnameList!.substring(pathnameList!.lastIndexOf("/") + 1);
  const user = useUser((state) => state.user);
  let chatEnabled = true;
  const [noMsgChat, setNoMsgChat] = useState(false);
  // console.log("my messages should", messages);
  if (messages.length === 0 && user === null) {
    chatEnabled = false;
  }
  useEffect(() => {
    if (messages.length === 0) {
      setNoMsgChat(true);
    } else {
      setNoMsgChat(false);
    }
  }, [messages]);
  console.log("Path" + pathname);
  // console.log("messages: |" + messages);

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
          // console.log("checking?");
          if (
            !optimisticIds.includes(payload.new.id) &&
            payload.new.sent_from === pathname
          ) {
            // console.log("Change received!", payload);
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
        {chatEnabled ? (
          noMsgChat ? (
            <p className=" text-sm  text-gray-500">Be the first to chat!</p>
          ) : (
            <></>
          )
        ) : (
          <h1 className="text-gray-500">
            Seems like there is no chat or streamer!
          </h1>
        )}
      </div>
    </div>
  );
}
