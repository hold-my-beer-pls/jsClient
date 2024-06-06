export const selectUserForHeader = (state: RootState) => ({
  name: state.user.name,
  email: state.user.email,
  isAuthenticated: state.user.isAuthenticated,
});
