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

const subTitle = css`
    font-size: 1em;
    color: #5c5c5c;
    font-weight: 400;
    padding: 0.9em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

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
                <p className={subTitle}>
                    {'¡Listo! Revisaremos tu información para activar tu cuenta, y te enviaremos un correo con la aprobación y tus credenciales de acceso.'}
                </p>
            </div>
            <div>
                <h1 className={buttonAppMobileContentStyles}>
                    {'El sistema puede tardar hasta 24 horas en aprobar tu cuenta.'}
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
