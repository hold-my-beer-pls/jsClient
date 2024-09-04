export interface QuestionResponse {
  id: string;
  question: string;
  code: string | null;
  theme: string | null;
  answers: Answer[];
}

interface Answer {
  id: string;
  text: string;
}

export interface QuizAnswer {
  questionId: string;
  answerId: string | null;
}

export interface AnswersResponse extends QuestionResponse {
  correctAnswerId: string;
  explanation: string;
}

export interface AnswerRequest {
  answers: { questionId: string; selectedAnswerId: string | null }[];
}
