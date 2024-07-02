import { baseApi } from '@/shared/api';
import { PaginationResponse } from '@/shared/interfaces';
import { QuestionRequest, QuestionResponse, QuestionsAllQuery } from '../model/interfaces.ts';

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuestions: build.query<PaginationResponse<QuestionResponse>, QuestionsAllQuery | void>({
      query: (params) => ({
        url: '/questions/all',
        params: params ?? undefined,
      }),
    }),
    createQuestions: build.mutation<QuestionResponse, QuestionRequest>({
      query: (body) => ({
        url: '/questions',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetAllQuestionsQuery, useCreateQuestionsMutation } = questionApi;
