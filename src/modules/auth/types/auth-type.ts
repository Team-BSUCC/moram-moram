export type User = {
  email: string;
  password: string;
  nickname: string;
};

export type SignInDTO = Omit<User, 'nickname'>;

export type SignUpDTO = User & { confirmPassword: string };
