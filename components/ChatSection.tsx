import GetChatMsgs from "./getChatMsg";
import ChatInput from "./ChatInput";
import { createClient } from "../utils/supabase/server";
import InitUser from "@/store/initUser";
import { headers } from "next/headers";
export default async function ChatSection() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const headersList = headers();
  // console.log("header?", Array.from(headersList.entries()));
  const pathname = headersList.get("x-pathname");
  // console.log("hello?", pathname);
  let userVerified = true;
  const sent_from = pathname!.substring(pathname!.lastIndexOf("/") + 1);
  // console.log(sent_from);
  const { data: dataName, error } = await supabase
    .from("stream")
    .select("username")
    .eq("username", sent_from);
  if (dataName === undefined || error) {
    userVerified = false;
  }
  // console.log("works?", dataName, data.session?.user);
  return (
    <>
      <div
        className="fixed lg:top-12 sm:right-0 z-40 sm:w-80 w-full h-1/2 bottom-0 sm:h-screen transition-transform  translate-x-0"
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
