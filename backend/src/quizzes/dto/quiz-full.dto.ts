export class AnswerDto {
  id: string;
  text: string;
  isCorrect: boolean;
}

export class QuestionDto {
  id: string;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  answers: AnswerDto[];
}

export class FullQuizDto {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  questions: QuestionDto[];
}
