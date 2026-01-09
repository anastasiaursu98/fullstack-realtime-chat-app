import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";

const protectedRoutes = [ROUTES.CHAT];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt");
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|\\.well-known|TemplateData|Build|css|js).*)",
    ],
};
