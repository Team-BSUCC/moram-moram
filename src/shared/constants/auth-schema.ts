import { z } from 'zod';

const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;

const FormSchema = {
  NON_EMPTY: z.string().nonempty('필수 입력 항목입니다.'),
  EMAIL: z
    .string()
    .nonempty('이메일을 입력해주세요')
    .email({ message: '유효한 이메일 형식이 아닙니다' }),
  NICKNAME: z
    .string()
    .nonempty('닉네임을 입력해주세요')
    .min(2, {
      message: '2글자 이상 10글자 이하의 한글 / 영어 / 숫자만 가능합니다',
    })
    .max(10, {
      message: '2글자 이상 10글자 이하의 한글 / 영어 / 숫자만 가능합니다',
    })
    .regex(nicknameRegex, { message: '공백, 특수문자는 포함 될 수 없습니다' }),
  PASSWORD: z
    .string()
    .nonempty('비밀번호를 입력해주세요')
    .min(8, { message: '비밀번호는 최소 8자 이상 입력해주세요' })
    .max(16, { message: '비밀번호는 최대 16자 이하 입력해주세요' })
    .regex(passwordRegex, {
      message: '영문, 숫자, 특수기호(!@#$%^&*)를 포함하여 작성해주세요',
    }),
  CONFIRM_PASSWORD: z.string().nonempty('비밀번호를 다시 입력해주세요'),
};

export default FormSchema;
