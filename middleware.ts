import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { updateSession } from "@/utils/supabase/middleware";
acceptLanguage.languages(languages);

export async function middleware(req) {
  let lng;
  if (req.cookies.has(cookieName) && req.cookies.get(cookieName).value)
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  // console.log("cookie: ",acceptLanguage.get(req.cookies.get(cookieName).value))
  // console.log("FIRST lng:",lng)

  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  // console.log("accept-lang: ",acceptLanguage.get(req.headers.get('Accept-Language')))
  // console.log("MIDDLE lng: ",lng)

  if (!lng) lng = fallbackLng;
  // console.log("LAST lng: ",lng)
  // console.log('..........................')
  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    console.log("brooo", lng, req.nextUrl.pathname, req.url);
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  // return await updateSession(req);

  return NextResponse.next();
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
