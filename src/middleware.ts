import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

// Define authentication and protected routes
const AuthRoutes = ["/login", "/register"];
const protectedRoutes = [
  "/profile",
  "/profile/:page*",
  "/product",
  "/product/:page",
  "/admin",
  "/cart"
];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  CUSTOMER: [/^\/customer/],
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated

  const user = await getCurrentUser();

  // If user is not authenticated
  if (!user) {
    // Allow access to authentication routes
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (protectedRoutes.some((route) => pathname.match(route))) {
      // Redirect to login if trying to access a protected route
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  } else {
    // If user is authenticated, allow access to protected routes directly
    if (protectedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    // If user role is defined, check for role-based access
    if (user?.role && roleBasedRoutes[user?.role as Role]) {
      const routes = roleBasedRoutes[user?.role as Role];

      // Allow access to routes based on user role
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }
    // Redirect to home if user role does not match any routes
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to any other routes
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: [
    "/login",
    "/register",
    "/customer/:page*",
    "/admin/:page*",
    "/profile",
    "/profile/:page*",
    "/product",
    "/product/:page",
    "/cart"
  ],
};
