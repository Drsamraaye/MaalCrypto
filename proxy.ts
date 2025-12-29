import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "so"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Early return for paths that should never be processed by locale middleware
    if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/favicon.ico")
    ) {
        return;
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, admin, images, favicon)
        "/((?!_next|favicon.ico|api|admin|images).*)",
    ],
};
