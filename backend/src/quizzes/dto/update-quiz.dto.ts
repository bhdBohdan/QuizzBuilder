export class UpdateAnswerDto {
  id?: string; // optional (if updating existing answer)
  text?: string;
  isCorrect?: boolean;
}

export class UpdateQuestionDto {
  id?: string; // optional (if updating existing question)
  text?: string;
  type?: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  answers?: UpdateAnswerDto[];
}

export class UpdateQuizDto {
  title?: string;
  description?: string;
  questions?: UpdateQuestionDto[];
}
