import { importSPKI, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// -------------------------------- HELPER FUNCTION -----------------------------------

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/orders"];
const authRoutes = ["/login", "/signup", "/verification"];

const PUBLIC_KEY_PEM = process.env.JWT_PUBLIC_KEY!;

async function verifyJWT(token: string): Promise<boolean> {
    try {
        const pem = PUBLIC_KEY_PEM.replace(/\\n/g, "\n");
        const publicKey = await importSPKI(pem, "RS256");
        console.log("isValidToken:", publicKey);
        await jwtVerify(token, publicKey, { algorithms: ["RS256"] });
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

// -------------------------------- PROXY (MIDDLEWARE) -----------------------------------

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const token = request.cookies.get("auth")?.value;
    const isValidToken = token ? await verifyJWT(token) : false
    console.log("isValidToken:", isValidToken);

    if (isProtectedRoute && !isValidToken) {
        const loginUrl = new URL("/login", request.url);

        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && isValidToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
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