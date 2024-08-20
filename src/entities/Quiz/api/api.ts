import { baseApi } from '@/shared/api';
import { AnswersResponse, QuestionResponse } from '../model/interfaces.ts';

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionResponse[], void>({
      query: () => ({
        url: '/questions',
      }),
      keepUnusedDataFor: 0,
    }),
    getAnswers: build.query<AnswersResponse[], string[]>({
      query: (params) => ({
        url: '/questions/answers',
        params: { ids: params.join(',') },
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetAnswersQuery } = quizApi;
