import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // 1. Resolve the dynamic cookie store (async)
  const cookieStore = await cookies();

  // 2. Hand it to Supabase without calling cookies() again
  const supabase = createRouteHandlerClient({
    // @ts-expect-error  Temporary: upstream type mismatch, runtime is correct
    cookies: () => cookieStore,
  });

  // 3. Sign the user out (this will invalidate the auth cookies)
  await supabase.auth.signOut();

  // 4. Respond
  return NextResponse.json({ success: true });
}
