"use client";

import { useState } from "react";
import { IBook } from "@/core/domain/book";
import BookCard from "@/components/BookCard";
import { bookService } from "@/infrastructure/container";
import { useRouter } from "next/navigation";

export default function Home({ books }: { books: IBook[] }) {
  const [localBooks, setLocalBooks] = useState(books);
  const router = useRouter();

  const handleBorrow = async (bookId: string) => {
    setLocalBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, available: false } : b)),
    );

    try {
      await bookService.borrowBook(bookId);
      router.refresh();
    } catch {
      setLocalBooks(books);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {localBooks.map((book) => (
        <BookCard key={book.id} book={book} handleBorrow={handleBorrow} />
      ))}
    </div>
  );
}
