import { Complexity } from '@/shared/constants';

interface Answer {
  id: string;
  text: string;
}

export interface QuestionRequest {
  question: string;
  code?: string;
  theme?: string;
  answers: string[];
  explanation: string;
  complexity: Complexity;
  correctAnswerNumber: number;
}

export interface QuestionResponse {
  id: string;
  question: string;
  code: string | null;
  theme: string | null;
  explanation: string;
  complexity: Complexity;
  visible: boolean; // ?
  correctAnswerId: string; // ?
  createAt: string; // ?
  updateAt: string; // ?
  answers: Answer[];
}

export interface QuestionQuery {
  complexity?: Complexity;
  visible?: boolean;
  theme?: string;
  question?: string;
  limit?: number;
}

export interface QuestionsAllQuery extends QuestionQuery {
  page?: number;
}
