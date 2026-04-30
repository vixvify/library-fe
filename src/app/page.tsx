import BookCard from "@/components/BookCard";
import { books } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Library</h1>
            <p className="mt-1 text-sm text-gray-500">
              Discover and borrow books
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 px-4 py-1 text-sm text-gray-400">
              {books.length} books
            </span>

            <Link
              href="/admin"
              className="
        px-4 py-1.5 rounded-full
        bg-white text-black text-sm font-medium
        hover:bg-gray-200 transition
      "
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  );
}
