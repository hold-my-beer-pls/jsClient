import { Complexity } from '@/shared/constants';

export interface Answer {
  id: string;
  text: string;
}

export interface QuestionCreateRequest {
  question: string;
  code?: string;
  theme?: string;
  answers: string[];
  explanation: string;
  complexity: Complexity;
  correctAnswerNumber: number;
}

export interface QuestionUpdateRequest extends Omit<QuestionCreateRequest, 'answers' | 'correctAnswerNumber'> {
  id: string;
  answers: Answer[];
  correctAnswerId: string;
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

export interface UpdateVisibility {
  id: string;
  visible: boolean;
}
