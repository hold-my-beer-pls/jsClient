export const selectModal = (state: RootState) => ({
  modalIsShown: state.question.modalIsShown,
  currentQuestion: state.question.currentQuestion,
  modalMode: state.question.modalMode,
});

export const selectQuestions = (state: RootState) => state.question.questions;
