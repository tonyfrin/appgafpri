import React from 'react';
import { LoginStep } from '../Step/Login/LoginStep';
import { useTheme } from '../context/ThemeContext';
import { LayoutLogin } from './LayoutLogin';

export const LoginForm = () => {
  const { useLogin } = useTheme();

  return (
    <>
     <LayoutLogin
        containerStyles={{
            custom: `
                background-color: #f9f9f9;
            `,
        }}
     ><>

     <LoginStep 
      useLogin={useLogin}
     />


     </>
    </LayoutLogin>
    </>
  );
}
