"use client";
import React, { useState } from "react";

type Answer = {
  text: string;
  isCorrect?: boolean; // optional, default false
};

type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

type Question = {
  text: string;
  type: QuestionType;
  answers: Answer[];
};

type QuizFormProps = {
  onSubmit?: (quiz: {
    title: string;
    description?: string;
    questions: Question[];
  }) => void;
};

const defaultQuestion: Question = {
  text: "",
  type: "BOOLEAN",
  answers: [
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
  ],
};

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { ...defaultQuestion },
  ]);

  const handleQuestionChange = (
    idx: number,
    field: keyof Question,
    value: any
  ) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quizData = { title, description, questions };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (res.ok) {
        alert("Quiz saved!");
      } else {
        alert("Failed to save quiz.");
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleAnswerChange = (
    qIdx: number,
    aIdx: number,
    field: keyof Answer,
    value: any
  ) => {
    const updated = [...questions];
    updated[qIdx].answers = updated[qIdx].answers.map((ans, idx) =>
      idx === aIdx ? { ...ans, [field]: value } : ans
    );
    setQuestions(updated);
  };

  const addQuestion = () =>
    setQuestions([
      ...questions,
      {
        text: "",
        type: "BOOLEAN",
        answers: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  const removeQuestion = (idx: number) =>
    setQuestions(questions.filter((_, i) => i !== idx));

  const addAnswer = (qIdx: number) => {
    const updated = [...questions];
    updated[qIdx].answers.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };
  const removeAnswer = (qIdx: number, aIdx: number) => {
    const updated = [...questions];
    updated[qIdx].answers = updated[qIdx].answers.filter((_, i) => i !== aIdx);
    setQuestions(updated);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-4 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Description (optional)
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {questions.map((q, qIdx) => (
        <div key={qIdx} className="mb-8 border p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Question {qIdx + 1}</label>
            {questions.length > 1 && (
              <button
                type="button"
                className="text-red-500 text-xs"
                onClick={() => removeQuestion(qIdx)}
              >
                Remove
              </button>
            )}
          </div>
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            placeholder="Question text"
            value={q.text}
            onChange={(e) => handleQuestionChange(qIdx, "text", e.target.value)}
            required
          />
          <div className="mb-2">
            <label className="block font-semibold mb-1">Type</label>
            <select
              className="border rounded px-2 py-1"
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(
                  qIdx,
                  "type",
                  e.target.value as QuestionType
                )
              }
            >
              <option value="BOOLEAN">Boolean</option>
              <option value="INPUT">Input</option>
              <option value="CHECKBOX">Checkbox</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Answers</label>
            {q.answers.map((a, aIdx) => (
              <div key={aIdx} className="flex items-center gap-2 mb-2">
                <input
                  className="border rounded px-2 py-1 w-48"
                  placeholder={`Answer ${aIdx + 1}`}
                  value={a.text}
                  onChange={(e) =>
                    handleAnswerChange(qIdx, aIdx, "text", e.target.value)
                  }
                  required
                />
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type={q.type === "BOOLEAN" ? "radio" : "checkbox"}
                    name={`correct-${qIdx}`}
                    checked={!!a.isCorrect}
                    onChange={(e) =>
                      handleAnswerChange(
                        qIdx,
                        aIdx,
                        "isCorrect",
                        q.type === "BOOLEAN" ? true : e.target.checked
                      )
                    }
                    onClick={() => {
                      if (q.type === "BOOLEAN") {
                        // Only one correct answer for BOOLEAN
                        const updated = [...questions];
                        updated[qIdx].answers = updated[qIdx].answers.map(
                          (ans, idx) => ({
                            ...ans,
                            isCorrect: idx === aIdx,
                          })
                        );
                        setQuestions(updated);
                      }
                    }}
                  />
                  Correct
                </label>
                {q.answers.length > 1 && (
                  <button
                    type="button"
                    className="text-red-400 text-xs"
                    onClick={() => removeAnswer(qIdx, aIdx)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-xs mt-2"
              onClick={() => addAnswer(qIdx)}
            >
              + Add Answer
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="bg-gray-200 px-3 py-1 rounded mr-2"
        onClick={addQuestion}
      >
        + Add Question
      </button>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Quiz
      </button>
    </form>
  );
};

export default QuizForm;
