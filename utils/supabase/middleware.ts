// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(request: NextRequest) {
  // Prepare a response we can modify cookies on
  let response = NextResponse.next();

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      // read all cookies from the incoming request
      getAll() {
        // request.cookies.getAll() returns an array of {name, value}
        return request.cookies.getAll();
      },
      // apply any cookies Supabase asks us to set to the outgoing response
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Trigger a token refresh / user validation — recommended pattern
  // We don't always need the returned user; calling getUser will
  // allow supabase to refresh tokens and set cookies via setAll above.
  await supabase.auth.getUser();

  return response;
}

// Optional matcher: run middleware only for app routes (adjust to your needs)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
