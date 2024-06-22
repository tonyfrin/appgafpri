import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { useTheme } from '../../context/ThemeContext';
import { LayoutLogin } from '../../Component/LayoutLogin';
import { useRouter } from 'next/router';

const buttonAppMobileContentStyles = css`
    font-size: 1.5em;
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


export const FinalStep = () => {
    const { useSingUp } = useTheme();
    const router = useRouter();

    const returnInit = async () => {
        await router.push('/');
        useSingUp.pages.actions.returnInit();
    }

  return (
   
     <LayoutLogin
        containerStyles={{
            custom: `
                background-color: #f9f9f9;
            `,
        }}
     >
        <>
            <div>
                <h1 className={buttonAppMobileContentStyles}>
                    {useSingUp.attributes.states.successRegister ? 
                    '¡Listo! Revisaremos tu información para activar tu cuenta, y te enviaremos un correo con la aprobación.' :
                    '¡Ups! Algo salió mal, inténtalo de nuevo.'}
                </h1>
            </div>
            <div>
                <h1 className={buttonAppMobileContentStyles}>¡Muchas Gracias!</h1>
            </div>
                
            <div className={loginContainerStyles}>
                <Link href="/" className={loginContentStyles}>
                    <ButtonAppMobile title="Volver al Inicio" 
                        containerProps={{
                            onClick: returnInit,
                        }}
                    />
                </Link>
            </div>
        </>
    </LayoutLogin>
  );
}
