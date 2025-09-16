import { Quiz, QuizDetailsProps } from "@/common/interfaces";
import DeleteQuizButton from "@/componets/deleteButton";
import QuizDetails from "@/componets/quizDetails";
import React from "react";

async function getQuizz(slug: string): Promise<Quiz> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch quiz details");
  }
  return res.json();
}

export default async function QuizDetailsPage({ params }: QuizDetailsProps) {
  const quiz = await getQuizz(params.slug);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <QuizDetails {...quiz} />
      <DeleteQuizButton quizId={quiz.id} />
    </div>
  );
}
