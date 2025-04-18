'use client';
import { signWithKaKao } from '../services/auth-client-service';

const KaKaoLoginButton = () => {
  return <button onClick={signWithKaKao}>카카오 로그인</button>;
};

export default KaKaoLoginButton;
