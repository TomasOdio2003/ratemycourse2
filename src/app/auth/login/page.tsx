"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
export default function LoginPage() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) console.error("Google sign-in error:", error.message);
    // Supabase will redirect automatically; no need to router.push here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4">
      <h1 className="text-3xl font-bold">Log in / Sign up</h1>

      <button
        onClick={handleGoogle}
        className="flex w-60 items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50"
      >
        <FaGoogle className="h-5 w-5 text-blue-600" />
        Continue with Google
      </button>
    </main>
  );
}
