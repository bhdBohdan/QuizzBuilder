import { Quiz } from "@/common/interfaces";

export default function QuizDetails(quiz: Quiz) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
      {quiz.description && (
        <p className="text-gray-700 mb-4">{quiz.description}</p>
      )}
      {quiz.questionsCount !== undefined && (
        <p className="text-sm text-gray-500 mb-4">
          {quiz.questionsCount} questions
        </p>
      )}

      {quiz.questions && (
        <ul className="list-disc pl-5">
          {quiz.questions.map((q, idx) => (
            <li key={idx} className="mb-4">
              <span className="font-semibold">{q.text}</span>
              {q.answers && (
                <ul className="list-none pl-4 mt-2">
                  {q.answers.map((a, aIdx) => (
                    <li key={aIdx} className="mb-1 flex items-center gap-2">
                      <span>{a.text}</span>
                      {a.isCorrect && (
                        <span className="text-green-600 text-xs font-semibold">
                          (Correct)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
