import { Answer, QuestionUpdateRequest } from '@/entities/Question';
import { Complexity } from '@/shared/constants';
import { QuestionCreateData, QuestionUpdateData } from '../model/interfaces.ts';
import { QuestionCreateRequest } from '@/entities/Question/model/interfaces.ts';

export const getDataForCreate = (data: QuestionCreateData): QuestionCreateRequest => ({
  ...(data.code && { code: data.code }),
  ...(data.theme && { theme: data.theme }),
  question: data.questionText,
  answers: [data.answer1, data.answer2, data.answer3, data.answer4],
  explanation: data.explanation,
  complexity: data.complexity as Complexity,
  correctAnswerNumber: Number(data.radioAnswer),
});

export const getDataForUpdate = ({
  code,
  theme,
  questionText,
  explanation,
  complexity,
  radioAnswer,
  ...args
}: Omit<QuestionUpdateData, 'id'>): Omit<QuestionUpdateRequest, 'id'> => {
  return {
    ...(code && { code }),
    ...(theme && { theme }),
    question: questionText,
    explanation,
    complexity: complexity as Complexity,
    correctAnswerId: radioAnswer,
    answers: Object.entries(args).map((item): Answer => ({ id: item[0], text: item[1] })),
  };
};
