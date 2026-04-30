"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ICreateBook } from "@/core/domain/book";
import { bookService } from "@/infrastructure/container";

export default function AdminPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateBook>({
    defaultValues: {
      title: "",
      type: "EBOOK",
    },
  });

  const onSubmit = async (data: ICreateBook) => {
    await bookService.createBook(data);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white flex items-center justify-center">
      <div className="w-full max-w-lg p-8 rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Add Book</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new book entry</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Title</label>
            <input
              type="text"
              placeholder="e.g. Atomic Habits"
              {...register("title", { required: "Title is required" })}
              className="
                px-4 py-2.5 rounded-xl
                bg-white/5 text-white
                ring-1 ring-white/10
                placeholder:text-gray-500
                outline-none
                focus:ring-white/20
              "
            />
            {errors.title && (
              <span className="text-xs text-red-400">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Type</label>
            <select
              {...register("type")}
              className="
                px-4 py-2.5 rounded-xl
                bg-white/5 text-white
                ring-1 ring-white/10
                outline-none
                focus:ring-white/20
              "
            >
              <option value="EBOOK" className="bg-black">
                E-Book
              </option>
              <option value="PRINTED" className="bg-black">
                Printed
              </option>
            </select>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="
                w-full py-2.5 rounded-xl cursor-pointer
                bg-white/10 text-gray-300
                hover:bg-white/20
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                w-full py-2.5 rounded-xl cursor-pointer
                bg-white text-black
                font-medium
                transition
                hover:bg-gray-200
                active:scale-[0.98]
              "
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
