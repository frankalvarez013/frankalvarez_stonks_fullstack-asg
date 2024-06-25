"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "./ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user";
import { Imessage, useMessage } from "@/store/messages";
import { usePathname } from "next/navigation";
export default function ChatInput() {
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const pathname = usePathname();
  const sent_from = pathname.substring(pathname.lastIndexOf("/") + 1);
  const supabase = createClient();
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
    <div className="p-5">
      <Input
        placeholder="send message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
