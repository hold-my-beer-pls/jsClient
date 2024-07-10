export const generateId = () => {
  // eslint-disable-next-line no-bitwise
  return (~~(Math.random() * 1e8)).toString(16);
};
