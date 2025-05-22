import Link from "next/link";
import { Search } from "lucide-react"; // run: pnpm add lucide-react

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* ── Top Bar ─────────────────────────────────────── */}
      <header className="flex items-center justify-end gap-4 px-6 py-4">
        <Link
          href="/auth/login"
          className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Log&nbsp;in
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sign&nbsp;up
        </Link>
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
