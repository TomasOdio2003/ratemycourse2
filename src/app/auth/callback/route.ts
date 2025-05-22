import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Resolve the cookie store once (this is now async)
  const cookieStore = await cookies();

  // 2. Pass a function that returns that store to Supabase
  const supabase = createRouteHandlerClient({
    // @ts-expect-error  Temporary: upstream type mismatch, runtime is correct
    cookies: () => cookieStore,
  });

  // 3. Pull the ?code=... param out of the callback URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // 4. Swap the auth code for a session cookie
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 5. Send the user home
  return NextResponse.redirect(new URL("/", request.url));
}
