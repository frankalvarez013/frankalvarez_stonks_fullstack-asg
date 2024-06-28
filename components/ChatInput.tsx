"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "./ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user";
import { Imessage, useMessage } from "@/store/messages";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EmojiBar from "./EmojiBar";
const supabase = createClient();

export default function ChatInput() {
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const user = useUser((state) => state.user);

  const pathname = usePathname();
  const sent_from = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [chatDisable, setChatDisable] = useState(true);
  const [EmojiDisable, setEmojiDisable] = useState(true);
  const [message, setMessage] = useState("");

  let chat = true;
  useEffect(() => {
    const verifyName = async () => {
      const { data: dataName, error } = await supabase
        .from("stream")
        .select("*")
        .eq("username", sent_from)
        .single();

      if (dataName !== null && user !== undefined) {
        setChatDisable(false);
        chat = false;
        const checkFollowing = dataName.followers?.filter(
          (elem) => elem.localeCompare(user.id) === 0
        );
        if (
          checkFollowing != undefined &&
          (checkFollowing[0] || dataName.id.localeCompare(user.id) === 0)
        ) {
          setEmojiDisable(false);
        }
      } else {
      }
    };
    verifyName();
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

  return (
    <div>
      <div className="py-5 flex gap-2">
        <Input
          placeholder="send message"
          value={message}
          className=""
          disabled={chatDisable}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (chatDisable) {
                console.log("no!");
              } else {
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
              handleSendMessage(message);
            }
          }}
        >
          Send
        </button>
      </div>
      {EmojiDisable ? (
        ""
      ) : (
        <EmojiBar message={message} setMessage={setMessage}></EmojiBar>
      )}
    </div>
  );
}
