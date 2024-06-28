import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

//onlineStatus - {online: true/false}
export async function PATCH(request: Request) {
  const supabase = createClient();
  const body = await request.json();

  const userId = body.userId.trim();

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ online: body.userStatus })
      .eq("id", userId);
  } catch (error) {
    console.error("ERROR", error);
  }
  return NextResponse.json({ status: "Emails sent" });
}
