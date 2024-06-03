import React, { useEffect } from 'react';
import { MainLogin } from '../Abstract/Component/MainLogin';
import { useTheme } from '../Abstract/context/ThemeContext';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { useLogin } = useTheme();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (useLogin.data.states.isLogin) {
        router.push('/billetera');
      }
    }
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      <MainLogin />
    </>
  );
}
