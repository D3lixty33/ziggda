// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a server-side Supabase client for Server Components / Server Actions.
 * IMPORTANT: cookies() is async in Next 15+ / 16 — await it.
 */
export async function createServerSupabaseClient() {
  // MUST await cookies() in Next 15/16
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      // return an array of { name, value, options? } as supabase expects
      getAll() {
        // Read incoming request cookies
        return cookieStore.getAll();
      },
      // Supabase will call setAll to update cookies (e.g., refresh tokens)
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // In some Server Component contexts, setting cookies may be ignored.
          // That's expected when code executes outside a modifiable response.
        }
      },
    },
  });
}
