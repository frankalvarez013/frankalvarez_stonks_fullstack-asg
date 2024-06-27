import { Suspense } from "react";
import ChatMsg from "./ChatMsgs";
import InitMessages from "@/store/InitMessages";
import { createClient } from "../utils/supabase/server";
import { headers } from "next/headers";
export default async function getChatMsg() {
  const supabase = createClient();
  const heads = headers();
  const pathnameList = heads.get("x-pathname");
  const pathname = pathnameList!.substring(pathnameList!.lastIndexOf("/") + 1);
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*,users(*)")
      .eq("sent_from", pathname);
    return (
      <Suspense fallback={"loading..."}>
        <ChatMsg></ChatMsg>
        <InitMessages messages={data || []} />
      </Suspense>
    );
  } catch (error) {
    console.log("bozo", error);
  }
}
