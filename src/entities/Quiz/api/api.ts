import { baseApi } from '@/shared/api';
import { AnswerRequest, AnswersResponse, QuestionResponse } from '../model/interfaces.ts';

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionResponse[], void>({
      query: () => ({
        url: '/questions',
        params: { limit: 4 },
      }),
      keepUnusedDataFor: 0,
    }),
    completeQuiz: build.mutation<AnswersResponse[], AnswerRequest>({
      query: (body) => ({
        url: '/questions/answers',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useCompleteQuizMutation } = quizApi;
