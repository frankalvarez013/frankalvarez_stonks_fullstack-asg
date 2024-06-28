import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

//onlineStatus - {online: true/false}
export async function PATCH(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  console.log("route body :", body.userId, body.userStatus);
  const userId = body.userId.trim();
  console.log("Static ID :", "da396d0f-a674-4a2e-954a-4a9200d9b697");
  console.log("Dynamic ID:", body.userId);
  console.log(
    "Type of Static ID:",
    typeof "da396d0f-a674-4a2e-954a-4a9200d9b697"
  );
  console.log("Type of Dynamic ID:", typeof body.userId);
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ online: body.userStatus })
      .eq("id", userId);
    console.log(data, error);
  } catch (error) {
    console.error("ERROR", error);
  }
  return NextResponse.json({ status: "Emails sent" });
}
