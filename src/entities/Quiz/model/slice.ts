import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswersResponse, QuestionRequest, QuestionResponse, QuizAnswer } from './interfaces.ts';
import { quizStage } from './constants.ts';
import { quizApi } from '@/entities/Quiz';

interface QuizState {
  userAnswers: Record<string, string | null>;
  rightAnswers: AnswersResponse[];
  questions: QuestionResponse[];
  currentQuestion: QuestionResponse | null;
  currentAnswer: AnswersResponse | null;
  stage: quizStage;
  quizResult: number;
  isLastQuestion: boolean;
  setting: QuestionRequest;
  hasTimer: boolean;
}

const initialState: QuizState = {
  userAnswers: {},
  rightAnswers: [],
  questions: [],
  stage: quizStage.quiz,
  quizResult: 0,
  currentQuestion: null,
  currentAnswer: null,
  isLastQuestion: false,
  hasTimer: false,
  setting: {},
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAnswer: (state, { payload }: PayloadAction<QuizAnswer>) => {
      state.userAnswers = { ...state.userAnswers, [payload.questionId]: payload.answerId };
    },
    setStage(state, { payload }: PayloadAction<quizStage>) {
      state.stage = payload;
    },
    setNextQuestion: (state) => {
      const currentQuestionNumber = state.questions.findIndex(({ id }) => id === state.currentQuestion?.id);

      if (currentQuestionNumber === -1) {
        state.currentQuestion = null;
      } else {
        state.currentQuestion = state.questions[currentQuestionNumber + 1];

        if (currentQuestionNumber === state.questions.length - 2) {
          state.isLastQuestion = true;
        }
      }
    },
    setNextAnswer: (state, { payload }: PayloadAction<number>) => {
      const currentAnswerNumber = state.rightAnswers.findIndex(({ id }) => id === state.currentAnswer?.id);

      if (currentAnswerNumber === -1) {
        state.currentAnswer = null;
      } else {
        state.currentAnswer = state.rightAnswers[currentAnswerNumber + payload];
      }
    },
    addSettingOption(state, { payload }: PayloadAction<QuestionRequest>) {
      state.setting = { ...state.setting, ...payload };
    },
    removeSettingOption(state, { payload }: PayloadAction<keyof QuestionRequest>) {
      const options = { ...state.setting };
      delete options[payload];
      state.setting = { ...options };
    },
    setHasTimer(state, { payload }: PayloadAction<boolean>) {
      state.hasTimer = payload;
    },
    reset: (state) => {
      state.userAnswers = {};
      state.questions = [];
      state.rightAnswers = [];
      state.stage = quizStage.quiz;
      state.quizResult = 0;
      state.currentQuestion = null;
      state.currentAnswer = null;
      state.isLastQuestion = false;
      state.setting = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(quizApi.endpoints.getQuestions.matchFulfilled, (state, { payload }) => {
        state.currentQuestion = payload[0];
        state.questions = payload;
      })
      .addMatcher(quizApi.endpoints.completeQuiz.matchFulfilled, (state, { payload }) => {
        state.rightAnswers = payload;
        state.currentAnswer = payload[0];
        state.stage = quizStage.result;

        state.quizResult = payload.reduce((count, question) => {
          if (state.userAnswers[question.id] === question.correctAnswerId) {
            return count + 1;
          }

          return count;
        }, 0);
      });
  },
});

export const {
  setHasTimer,
  removeSettingOption,
  setAnswer,
  setNextQuestion,
  setNextAnswer,
  setStage,
  reset,
  addSettingOption,
} = quizSlice.actions;
