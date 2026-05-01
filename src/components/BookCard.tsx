"use client";

import { useState } from "react";
import { IBook } from "@/core/domain/book";

export default function BookCard({
  book,
  handleBorrow,
}: {
  book: IBook;
  handleBorrow: (bookId: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const onBorrow = async () => {
    try {
      setLoading(true);
      await handleBorrow(book.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      group relative rounded-3xl 
      bg-white/5 backdrop-blur-xl
      p-6
      ring-1 ring-white/10
      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
    "
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100 bg-linear-to-br from-white/5 to-transparent" />

      <div className="flex items-start justify-between">
        <span className="text-xs tracking-wide text-gray-500">
          {book.type === "EBOOK" ? "E-BOOK" : "PRINTED"}
        </span>

        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            book.available
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-white/10 text-gray-500"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white leading-snug">
        {book.title}
      </h2>

      <div className="my-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <button
        onClick={onBorrow}
        disabled={!book.available || loading}
        className={`
          w-full rounded-xl py-2.5 text-sm font-medium transition-all cursor-pointer
          ${
            book.available && !loading
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {loading
          ? "Processing..."
          : book.available
            ? "Borrow Book"
            : "Not Available"}
      </button>
    </div>
  );
}
