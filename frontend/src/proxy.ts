import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

// -------------------------------- HELPER FUNCTION -----------------------------------

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/orders"];
const authRoutes = ["/login", "/signup", "/verification"];

// -------------------------------- PROXY (MIDDLEWARE) -----------------------------------

// This is the proxy (middleware) function. 
// It will check the route and get payload from siged JWT
// from cookies checks the validity and the route.
// if JWT is valid with auth route ---> Go to dashboard brother
// if JWT is invalud with protected route --> Got to auth with redirect url
// if nothing above then proceed.
// it sets `x-user-id` in headers so other pages can get it whenever they want to.

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");

    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const token = request.cookies.get("auth")?.value;

    const payload = token ? await verifyJWT(token) : null;
    const isValidToken = !!payload

    if (isProtectedRoute && !isValidToken) {
        const loginUrl = new URL("/login", request.url);

        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && isValidToken) {
        return NextResponse.redirect(new URL(redirectTo ?? "/dashboard", request.url));
    }

    const response = NextResponse.next();
    if (payload) {
        response.headers.set("x-user-id", payload.userId);
    }

    return response;
}

// -------------------------------- ROUTE MATCHER -----------------------------------

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         * - public folder files
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};