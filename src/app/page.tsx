"use client"; // this file is a client component — needed for hooks

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";      // run once: pnpm add lucide-react
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* ── Top Bar ─────────────────────────────────────── */}
      <header className="flex items-center justify-end gap-4 px-6 py-4">
        <AuthButtons />
      </header>

      {/* ── Center Section ─────────────────────────────── */}
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        {/* Logo */}
        <h1 className="select-none text-5xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-blue-600">rate</span>
          <span className="text-gray-700">My</span>
          <span className="text-blue-600">Course</span>
        </h1>

        {/* Search Bar */}
        <form
          action="/search"
          className="mt-10 flex w-full max-w-xl items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 sm:max-w-2xl"
        >
          <Search className="h-5 w-5 shrink-0 text-gray-500" />
          <input
            type="search"
            name="q"
            placeholder="Search for a course (e.g., CS 3114)…"
            className="flex-1 bg-transparent text-base placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </main>

      {/* ── Footer (optional) ──────────────────────────── */}
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RateMyCourse • Virginia Tech
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Helper component that shows Log in / Sign up OR Log out button */
/* ────────────────────────────────────────────────────────────── */
function AuthButtons() {
  const [user, setUser] = useState<null | { email?: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check initial session on load
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      }

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();

    // 2. Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
    );
  }

  if (user) {
    return (
      <button
        onClick={() =>
          fetch("/api/logout", { method: "POST" }).then(() => {
            setUser(null);
            location.reload();
          })
        }
        className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
      >
        Log&nbsp;out
      </button>
    );
  }

  return (
    <>
      <Link
        href="/auth/login"
        className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
      >
        Log&nbsp;in
      </Link>
      <Link
        href="/auth/login"
        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign&nbsp;up
      </Link>
    </>
  );
}
