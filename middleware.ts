import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

acceptLanguage.languages(languages);

export async function middleware(req: NextRequest) {
  const elm = await updateSession(req);
  const supabase = createClient();
  let reqPath = req.nextUrl.pathname;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("id", user.id)
      .single();
    if (data && !data.username) {
      reqPath = "/SetUp";
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", reqPath);

  const isNavigationRequest = req.method === "GET" && !req.url.includes(`code`);
  if (isNavigationRequest) {
    console.log("LINK OR HREF ENCOUNTERED...");

    let lng =
      req.cookies.has(cookieName) && req.cookies.get(cookieName)?.value
        ? acceptLanguage.get(req.cookies.get(cookieName)?.value)
        : acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;

    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      return NextResponse.redirect(new URL(`/${lng}${reqPath}`, req.url));
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer"));
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      console.log("Referer detected:", refererUrl.pathname);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      if (lngInReferer) {
        response.cookies.set(cookieName, lngInReferer);
      }
      return response;
    } else {
      console.log("No referer header present.");
    }

    console.log("Refresh?");
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  } else {
    console.log("Not a navigation request.");
    return await updateSession(req);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
