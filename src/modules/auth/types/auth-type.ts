export type UserType = {
  email: string;
  password: string;
  nickname: string;
};

export type SignInDTO = Omit<UserType, 'nickname'>;

export type SignUpDTO = UserType & { confirmPassword: string };

export type UpdatePasswordDTO = Pick<UserType, 'email'> & {
  currentPassword: string;
  newPassword: string;
};
