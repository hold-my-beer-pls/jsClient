import { Complexity } from '@/shared/constants';

export interface QuestionResponse {
  id: string;
  question: string;
  code: string | null;
  theme: string | null;
  answers: Answer[];
}

export interface QuestionRequest {
  complexity?: Complexity;
  visible?: boolean;
  theme?: string;
  question?: string;
  limit?: number;
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
  correct: boolean;
}

export interface AnswerRequest {
  answers: { questionId: string; selectedAnswerId: string | null }[];
}
