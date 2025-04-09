import { signWithGoogle } from '../services/auth-client-service';

const GoogleLoginButton = () => {
  return <button onClick={signWithGoogle}>구글 로그인</button>;
};

export default GoogleLoginButton;
