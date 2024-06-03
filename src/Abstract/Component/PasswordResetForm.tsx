import React from 'react';
import { PasswordReset } from '../Step/Login/PasswordReset';
import { LayoutLogin } from './LayoutLogin';
import { useTheme } from '../context/ThemeContext';
import { FadeIn } from '../Fade/FadeIn';
import { Loading } from '../Loading';
import { SuccessPasswordReset } from '../Step/Login/SuccessPasswordReset';

export const PasswordResetForm = () => {
  const { useUser } = useTheme();

  return (
    <>
     <LayoutLogin
        containerStyles={{
            custom: `
                background-color: #f9f9f9;
            `,
        }}
     ><>

        <div>

        {
          useUser.pagesPasswordReset.states.isInit &&
          <FadeIn keyName='isInit' isVisible={useUser.pagesPasswordReset.states.isInit}>
            <PasswordReset />
          </FadeIn>
        }

        {
          useUser.pagesPasswordReset.states.isFetching &&
          <FadeIn keyName='isFetching' isVisible={useUser.pagesPasswordReset.states.isFetching}>
            <Loading />
          </FadeIn>
        }

        {
          useUser.pagesPasswordReset.states.isSuccess &&
          <FadeIn keyName='isSuccess' isVisible={useUser.pagesPasswordReset.states.isSuccess}>
            <SuccessPasswordReset />
          </FadeIn>
        }

      </div>


     </>
    </LayoutLogin>
    </>
  );
}
