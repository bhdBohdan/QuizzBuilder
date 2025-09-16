import MainHeader from "@/componets/mainHeader";
import QuizItem from "@/componets/quizItem";
import Link from "next/link";
import { Suspense } from "react";

// Define the type for a Quiz
interface Quiz {
  id: string;
  title: string;
  description?: string;
  questionsCount?: number; // optional if your API returns counts
}

// Fetch quizzes from API
async function getQuizzes(): Promise<Quiz[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
    cache: "no-store", // disables caching for server components
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  return res.json();
}

export default async function QuizzesPage() {
  const quizzes = await getQuizzes();

  return (
    <>
      <MainHeader />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching quizzes...
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quizzes.map((quiz) => (
              <QuizItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </Suspense>
      </main>
    </>
  );
}
