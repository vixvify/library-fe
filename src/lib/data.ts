import { IBook } from "@/core/domain/book";

export const books: IBook[] = [
  {
    id: "1",
    title: "Clean Code",
    type: "PRINTED",
    borrow_days: 14,
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Atomic Habits",
    type: "EBOOK",
    borrow_days: 7,
    available: false,
    created_at: "2023-02-01T00:00:00Z",
  },
];
