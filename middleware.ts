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
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", user.id)
      .single();
    // console.log("Username: ", data?.username);
    if (data) {
      if (!data.username) {
        // console.log("changed path to /SetUp");
        reqPath = "/SetUp";
      }
    }
  }
  const isRedirect = req.headers.has("referer");
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", reqPath);
  // Determine if the request is a navigation/link/href call
  // console.log(
  //   "checking... middleware...",
  //   !isRedirect,
  //   req.method === "GET",
  //   !req.url.includes(`code`)
  // );
  const isNavigationRequest = req.method === "GET" && !req.url.includes(`code`);
  if (isNavigationRequest) {
    console.log("LINK OR HREF ENCOUNTERED...");
    let lng;
    if (req.cookies.has(cookieName) && req.cookies.get(cookieName)?.value)
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

    if (!lng) lng = fallbackLng;
    // console.log("..........................");
    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      // console.log(
      //   "Doesn't have language at start of page fixin...",
      //   lng,
      //   reqPath,
      //   req.url
      // );
      return NextResponse.redirect(new URL(`/${lng}${reqPath}`, req.url));
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer"));
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      console.log("Referer...");
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
    // return await updateSession(req);
    console.log("Refresh?");
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    console.log("Not Sure...");
    return await updateSession(req);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
