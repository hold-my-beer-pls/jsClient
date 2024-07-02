import { QuestionRequest } from '@/entities/Question';
import { Complexity } from '@/shared/constants';
import { FormData } from '../model/interfaces.ts';

export const getDataForRequest = (data: FormData): QuestionRequest => ({
  ...(data.code && { code: data.code }),
  ...(data.theme && { theme: data.theme }),
  question: data.questionText,
  answers: [data.answer1, data.answer2, data.answer3, data.answer4],
  explanation: data.explanation,
  complexity: data.complexity as Complexity,
  correctAnswerNumber: Number(data.radioAnswer),
});
