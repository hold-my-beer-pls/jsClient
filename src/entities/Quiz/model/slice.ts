import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswersResponse, QuestionResponse, QuizAnswer } from './interfaces.ts';
import { quizStage } from './constants.ts';
import { quizApi } from '@/entities/Quiz';

interface QuizState {
  userAnswers: { [key: string]: string | null };
  rightAnswers: AnswersResponse[];
  questions: QuestionResponse[];
  currentQuestion: QuestionResponse | null;
  currentAnswer: AnswersResponse | null;
  stage: quizStage;
  quizResult: number;
  isLastQuestion: boolean;
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
      } else if (currentQuestionNumber === state.questions.length - 1) {
        state.currentQuestion = null;
      } else if (currentQuestionNumber !== -1) {
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
      } else if (currentAnswerNumber === state.rightAnswers.length - 1) {
        state.currentAnswer = null;
      } else if (currentAnswerNumber !== -1) {
        state.currentAnswer = state.rightAnswers[currentAnswerNumber + payload];
      }
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

export const { setAnswer, setNextQuestion, setNextAnswer, setStage, reset } = quizSlice.actions;
