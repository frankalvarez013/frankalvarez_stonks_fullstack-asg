"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "./ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user";
import { Imessage, useMessage } from "@/store/messages";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const supabase = createClient();

export default function ChatInput() {
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const user = useUser((state) => state.user);
  console.log("User:", user);
  const pathname = usePathname();
  const sent_from = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [chatDisable, setChatDisable] = useState(true);
  const [message, setMessage] = useState("");

  let chat = true;
  useEffect(() => {
    const verifyName = async () => {
      const { data: dataName, error } = await supabase
        .from("stream")
        .select("username")
        .eq("username", sent_from)
        .single();
      console.log("stream bruh", dataName);
      console.log("rip", user);
      if (dataName !== null && user !== undefined) {
        console.log("yes!");
        setChatDisable(false);
        chat = false;
      } else {
        // console.log(dataName, user, chatDisable);
      }
    };
    verifyName();
    console.log("chat in effect", chatDisable);
  }, [user, sent_from, supabase]);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const id = uuidv4();
      const newMessage = {
        id,
        text,
        send_by: user?.id,
        sent_from: pathname,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.user_name,
        },
      };
      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      const { error } = await supabase
        .from("messages")
        .insert({ text, id, sent_from });
      if (error) {
        console.error(error.message);
      }
    } else {
      console.error("Message can not be empty!!");
    }
  };
  console.log("chat outside", chatDisable, chat);
  return (
    <div className="py-5 flex gap-2">
      <Input
        placeholder="send message"
        className=""
        disabled={chatDisable}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (chatDisable) {
              console.log("no!");
            } else {
              console.log("?", chat);
              handleSendMessage(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }
        }}
      />
      <button
        className={`p-2 rounded-full bg-white hover:bg-orange-600 ${
          chatDisable ? "hover:bg-gray-400 bg-gray-400" : ""
        }`}
        disabled={chatDisable}
        onClick={() => {
          if (chatDisable) {
            console.log("no!");
          } else {
            console.log("?", chat);
            handleSendMessage(message);
          }
        }}
      >
        Send
      </button>
    </div>
  );
}
