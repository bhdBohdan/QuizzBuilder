export type QuizDetailsProps = {
  params: {
    slug: string;
  };
};

export interface Answer {
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  text: string;
  answers?: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questionsCount?: number;
  questions?: Question[];
}
