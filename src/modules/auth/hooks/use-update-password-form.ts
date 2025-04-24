import FormSchema from '@/shared/constants/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updatePassword } from '../services/auth-server-service';
import { errorAlert, successAlert } from '@/shared/utils/sweet-alert';
import * as Sentry from '@sentry/nextjs';

const updatePasswordSchema = z
  .object({
    currentPassword: FormSchema.PASSWORD,
    newPassword: FormSchema.PASSWORD,
    confirmPassword: FormSchema.CONFIRM_PASSWORD,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

const useUpdatePasswordForm = (email: string) => {
  const {
    register,
    handleSubmit: withValidation,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onBlur',
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = withValidation((data) => {
    startTransition(async () => {
      try {
        await updatePassword({ email, ...data });
        successAlert('비밀번호가 변경되었습니다.');
      } catch (error) {
        Sentry.withScope((scope) => {
          scope.setTag('page', 'mypage');
          scope.setTag('feature', 'updatePassword');

          Sentry.captureException(new Error(`[updatePassword] ${error}`));
        });

        errorAlert(
          `${error instanceof Error ? error.message : '오류가 발생했습니다.'}`
        );
      }
    });
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending,
  };
};

export default useUpdatePasswordForm;
