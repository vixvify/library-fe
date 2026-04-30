import { BookService } from "@/core/service/book.service";
import { BookRepository } from "./repositories/book.repository";

const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
