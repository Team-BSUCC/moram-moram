export const isRegisteredUser = (name: string) => {
  return !name.startsWith('게스트');
};
