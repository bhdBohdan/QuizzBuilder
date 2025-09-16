"use server";

export async function deleteQuiz(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`, {
    method: "DELETE",
  });
}
