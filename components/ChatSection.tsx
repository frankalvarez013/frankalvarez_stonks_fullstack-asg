import GetChatMsgs from "./getChatMsg";
import ChatInput from "./ChatInput";
import { createClient } from "../utils/supabase/server";
import InitUser from "@/store/initUser";
import { headers } from "next/headers";
export default async function ChatSection() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const headersList = headers();

  const pathname = headersList.get("x-pathname");

  let userVerified = true;
  const sent_from = pathname!.substring(pathname!.lastIndexOf("/") + 1);

  const { data: dataName, error } = await supabase
    .from("stream")
    .select("username")
    .eq("username", sent_from);
  if (dataName === undefined || error) {
    userVerified = false;
  }

  return (
    <>
      <div
        className="fixed sm:top-12 sm:right-0 z-40 sm:w-80 w-full h-1/3 bottom-0 sm:h-screen transition-transform  translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full w-full px-3 py-4 overflow-y-auto  bg-[#FF9B0F]">
          <div className="flex w-full h-full flex-col ">
            <div className="w-full">Stream Chat</div>
            <div className="flex w-full h-[75%] bg-orange-200 border border-orange-200 rounded-t-md">
              <GetChatMsgs></GetChatMsgs>
            </div>
            <ChatInput></ChatInput>
          </div>
        </div>
      </div>
      <InitUser user={data.session?.user}></InitUser>
    </>
  );
}
