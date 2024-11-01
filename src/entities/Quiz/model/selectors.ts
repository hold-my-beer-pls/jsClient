export const selectQuizQuestions = (state: RootState) => ({
  currentQuestion: state.quiz.currentQuestion,
  questions: state.quiz.questions,
  options: state.quiz.setting,
  hasTimer: state.quiz.hasTimer,
});

export const selectOptions = (state: RootState) => ({
  options: state.quiz.setting,
  hasTimer: state.quiz.hasTimer,
});

export const selectAnswers = (state: RootState) => ({
  isLastQuestion: state.quiz.isLastQuestion,
  userAnswers: state.quiz.userAnswers,
  rightAnswers: state.quiz.rightAnswers,
  quizResult: state.quiz.quizResult,
  currentAnswer: state.quiz.currentAnswer,
});

export const selectStage = (state: RootState) => state.quiz.stage;
