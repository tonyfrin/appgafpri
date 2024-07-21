import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { useTheme } from '../../context/ThemeContext';
import { LayoutLogin } from '../../Component/LayoutLogin';
import { useRouter } from 'next/router';

const buttonAppMobileContentStyles = css`
    font-size: 1.3em;
    padding: 0.9em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const subTitle = css`
    font-size: 1em;
    color: #5c5c5c;
    font-weight: 400;
    padding: 0.9em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const loginContainerStyles = css`
    position: fixed;
    bottom: 10%;
    left: 0;
    right: 0;
    z-index: 996;
`;

const loginContentStyles = css`
    display: flex;
    flex-direction: column;
    text-decoration: none;
`;

export type FinalStepProps = {
    nextStep: () => void;
}


export const InitStep = () => {
    const { useSingUp } = useTheme();
    const router = useRouter();

    const returnInit = async () => {
        await router.push('/');
        useSingUp.pages.actions.returnInit();
    }

  return (
        <>
            <div>
                <p className={subTitle}>
                    {'Antes de continuar, asegurate de tener tu documento de identidad original a la mano.'}
                </p>
            </div>
            <div>
                <h1 className={buttonAppMobileContentStyles}>¿Ya tienes tu documento de identidad ORIGINAL a la mano?</h1>
            </div>
                
            <div className={loginContainerStyles}>
                <div className={loginContentStyles}>
                    <ButtonAppMobile title="Si, continuar" 
                        containerProps={{
                            onClick: useSingUp.pages.actions.onEmail,
                        }}
                    />
                </div>
                
          
                <Link href="/" className={loginContentStyles}>
                    <ButtonAppMobile title="No, volver" 
                        containerProps={{
                            onClick: returnInit,
                        }}
                        containerStyles={{
                            backgroundColor: '#C12429'
                        }}
                    />
                </Link>
            </div>
        </>
  );
}
