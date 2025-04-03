import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요.'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지 입력할 수 있습니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
        '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야합니다.'
      ),
    confirmPassword: z.string(),
    nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
