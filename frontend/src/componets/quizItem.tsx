import Link from "next/link";

interface Quiz {
  id: string;
  title: string;
  description?: string;
  questionsCount?: number;
}

export default function QuizItem({ quiz }: { quiz: Quiz }) {
  return (
    <Link href={`/quizzes/${quiz.id}`}>
      <div className="bg-blue-100 shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
        <p className="text-2xl font-bold">{quiz.title}</p>
        {quiz.description && (
          <p className="text-gray-700 mt-2">{quiz.description}</p>
        )}
        {quiz.questionsCount !== undefined && (
          <p className="text-sm text-gray-500 mt-1">
            {quiz.questionsCount} questions
          </p>
        )}
      </div>
    </Link>
  );
}
