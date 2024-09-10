import { Complexity } from '@/shared/constants';

export interface HardestStatistic {
  correctAnswers: number;
  totalAnswers: number;
  questionId: string;
  question: {
    id: string;
    question: string;
    theme: string;
    complexity: Complexity;
    code: string;
  };
}
