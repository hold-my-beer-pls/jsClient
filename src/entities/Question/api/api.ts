import { baseApi } from '@/shared/api';
import { PaginationResponse } from '@/shared/interfaces';
import {
  QuestionCreateRequest,
  QuestionResponse,
  QuestionsAllQuery,
  QuestionUpdateRequest,
  UpdateVisibility,
} from '../model/interfaces.ts';

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuestions: build.query<PaginationResponse<QuestionResponse>, QuestionsAllQuery | void>({
      query: (params) => ({
        url: '/questions/all',
        params: params ?? undefined,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg && currentArg.page !== 0 && previousArg?.page === undefined) {
          currentArg.page = 0;
        }

        return currentArg?.page !== previousArg?.page;
      },
    }),
    createQuestion: build.mutation<QuestionResponse, QuestionCreateRequest>({
      query: (body) => ({
        url: '/questions',
        method: 'POST',
        body,
      }),
    }),
    updateQuestion: build.mutation<QuestionResponse, QuestionUpdateRequest>({
      query: ({ id, ...args }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        body: args,
      }),
    }),
    updateVisibility: build.mutation<void, UpdateVisibility>({
      query: ({ id, visible }) => ({
        url: `/questions/${id}`,
        method: 'PATCH',
        body: { visible },
      }),
    }),
    deleteQuestion: build.mutation<void, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateVisibilityMutation,
  useUpdateQuestionMutation,
} = questionApi;
