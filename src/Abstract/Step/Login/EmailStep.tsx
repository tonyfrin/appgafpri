import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { useTheme } from '../../context/ThemeContext';
import { Error } from '../../Error';
import { WhatsApp } from '../../Notification/WhatsApp';



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
`;

type EmailStepProps = {
    nextStep: () => void;
}



export const EmailStep = ({
    nextStep,
}: EmailStepProps) => {
    const { useSingUp, useError } = useTheme();

    useEffect(() => {
        useSingUp.attributes.actions.validationEmail(useSingUp.attributes.states.email);
    }, [useSingUp.attributes.states.email]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep1();
    }, [ // eslint-disable-line
        useSingUp.attributes.states.email,
        useSingUp.attributes.states.emailValid,
    ]);

    const next = async () => {
        if (useSingUp.attributes.actions.validationButtonStep1()) {
            try{
                await useSingUp.api.actions.requestEmailCode();
            } catch (error) {
                console.error(error);
            } finally {
                nextStep();
            }
        }
    }


  return (
    <>
        <Error 
            error={useError.states.error}
        />
        <div>
            <h1 className={buttonAppMobileContentStyles}>Iniciemos con tu email</h1>
        </div>
            <InputAppContainer 
                inputProps={{
                    type: 'email',
                    placeholder: 'ejemplo@ejemplo.com',
                    onChange: (e) => useSingUp.attributes.actions.changeEmail(e.target.value.toLowerCase())
                }}
                description="Te enviaremos un codigo de verificación"
            />
            <WhatsApp />
        <div className={loginContainerStyles}>
            <div className={loginContentStyles}>
                <ButtonAppMobile title="Continuar" 
                    containerProps={{
                        onClick: () => next(),
                        id: 'btn-step-1'
                    }}
                />
            </div>
        </div>
     </>
  );
}
