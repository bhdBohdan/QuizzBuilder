"use client";
import { useRouter } from "next/navigation";

export default function DeleteQuizButton({ quizId }: { quizId: string }) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`, {
      method: "DELETE",
    });
    router.push("/quizzes");
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
    >
      Delete Quiz
    </button>
  );
}
