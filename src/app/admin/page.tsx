"use client";

import { useState, type SyntheticEvent } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ICreateBook } from "@/core/domain/book";
import { bookService } from "@/infrastructure/container";

export default function AdminPage() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreateBook>({
    defaultValues: {
      title: "",
      type: "EBOOK",
    },
  });

  const onSubmit = async (data: ICreateBook) => {
    await bookService.createBook(data);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    router.push("/");
  };

  return (
    <>
      <main className="min-h-screen bg-[#0b0b0c] text-white flex items-center justify-center">
        <div className="w-full max-w-lg p-8 rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Add Book</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a new book entry
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
                disabled={isSubmitting}
                className="
                w-full py-2.5 rounded-xl cursor-pointer
                bg-white text-black
                font-medium
                transition
                hover:bg-gray-200
                active:scale-[0.98]
                disabled:cursor-wait
                disabled:bg-gray-300
              "
              >
                {isSubmitting ? "Adding..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1800}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Book created successfully
        </Alert>
      </Snackbar>
    </>
  );
}
