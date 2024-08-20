import { Roles } from './interfaces.ts';

export const selectUser = (state: RootState) => ({
  name: state.user.name,
  email: state.user.email,
  isAdmin: state.user.roles.includes(Roles.admin),
  isAuthenticated: state.user.isAuthenticated,
});
