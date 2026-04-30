import http from "@/lib/http";
import { ApiResponse } from "../interface/response";
import { IBookRepository } from "@/core/ports/book.repository";
import { ICreateBook, IBook } from "@/core/domain/book";

export class BookRepository implements IBookRepository {
  async getAllBooks(): Promise<ApiResponse<IBook[]>> {
    const response = await http.get<ApiResponse<IBook[]>>("/books");
    return response.data;
  }
  async createBook(book: ICreateBook): Promise<ApiResponse<IBook>> {
    const response = await http.post<ApiResponse<IBook>>("/books", book);
    return response.data;
  }
  async borrowBook(bookId: string): Promise<ApiResponse<IBook>> {
    const response = await http.post<ApiResponse<IBook>>(
      `/books/${bookId}/borrow`,
    );
    return response.data;
  }
  async returnBook(bookId: string): Promise<ApiResponse<IBook>> {
    const response = await http.post<ApiResponse<IBook>>(
      `/books/${bookId}/return`,
    );
    return response.data;
  }
  async deleteBook(bookId: string): Promise<ApiResponse<void>> {
    const response = await http.delete<ApiResponse<void>>(`/books/${bookId}`);
    return response.data;
  }
}
