import { baseApi } from '@/shared/api';
import { AnswerRequest, AnswersResponse, QuestionRequest, QuestionResponse } from '../model/interfaces.ts';

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionResponse[], QuestionRequest>({
      query: (params) => ({
        url: '/questions',
        params,
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
