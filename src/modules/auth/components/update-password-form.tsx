'use client';

import useUpdatePasswordForm from '../hooks/use-update-password-form';
import Input from '@/components/commons/input';
import Button from '@/components/commons/button';

const UpdatePasswordForm = ({ email }: { email: string }) => {
  const { register, handleSubmit, errors, isPending } =
    useUpdatePasswordForm(email);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='currentPassword'>현재 비밀번호</label>
      <Input
        id='currentPassword'
        type='password'
        {...register('currentPassword')}
        onBlur={(e) => e.target.blur()}
      />
      {errors.currentPassword && <p>{errors.currentPassword.message}</p>}

      <label htmlFor='newPassword'>새 비밀번호</label>
      <Input
        id='newPassword'
        type='password'
        {...register('newPassword')}
        onBlur={(e) => e.target.blur()}
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}

      <label htmlFor='confirmPassword'>새 비밀번호 확인</label>
      <Input
        id='confirmPassword'
        type='password'
        {...register('confirmPassword')}
        onBlur={(e) => e.target.blur()}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <Button type='submit' disabled={isPending}>
        {isPending ? '변경 중...' : '비밀번호 변경'}
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
