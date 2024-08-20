import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalMode } from '@/shared/constants/modal.ts';
import { QuestionResponse } from './interfaces.ts';
import { questionApi } from '@/entities/Question';
import { PaginationResponse } from '@/shared/interfaces';

interface QuestionState {
  modalIsShown: boolean;
  modalMode: ModalMode;
  currentQuestion: QuestionResponse | null;
  questions: PaginationResponse<QuestionResponse> | null;
}

const initialState: QuestionState = {
  modalIsShown: false,
  modalMode: ModalMode.nothing,
  currentQuestion: null,
  questions: null,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setModalIsShown: (state, { payload }: PayloadAction<boolean>) => {
      state.modalIsShown = payload;
    },
    setModalMode: (state, { payload }: PayloadAction<ModalMode>) => {
      state.modalMode = payload;
    },
    setCurrentQuestion: (state, { payload }: PayloadAction<string>) => {
      const question = state.questions?.data.find(({ id }) => payload === id);

      if (question) {
        state.currentQuestion = question;
      }
    },
    resetCurrentQuestion: (state) => {
      state.currentQuestion = null;
    },
    addQuestion: (state, { payload }: PayloadAction<QuestionResponse>) => {
      if (state.questions) {
        state.questions.data = [payload, ...state.questions.data];
      }
    },
    editQuestion: (state, { payload }: PayloadAction<QuestionResponse>) => {
      if (state.questions) {
        state.questions.data = state.questions.data.map((question) => {
          if (question.id === payload.id) {
            return payload;
          }
          return question;
        });
      }
    },
    removeQuestion: (state, { payload }: PayloadAction<string>) => {
      if (state.questions) {
        state.questions.data = state.questions.data.filter(({ id }) => id !== payload);
      }
    },
    reset: (state) => {
      state.modalIsShown = false;
      state.modalMode = ModalMode.nothing;
      state.currentQuestion = null;
      state.questions = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(questionApi.endpoints.getAllQuestions.matchFulfilled, (state, { payload }) => {
      if (payload.currentPage === 0) {
        state.questions = payload;
      } else if (state.questions !== null) {
        state.questions = {
          ...payload,
          data: [...state.questions.data, ...payload.data],
        };
      }
    });
  },
});

export const {
  addQuestion,
  removeQuestion,
  editQuestion,
  setModalIsShown,
  resetCurrentQuestion,
  reset,
  setModalMode,
  setCurrentQuestion,
} = questionSlice.actions;
