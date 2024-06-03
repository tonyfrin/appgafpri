import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { useTheme } from '../../context/ThemeContext';
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

const containerInput = css`
    margin: 20px auto;
`

export const NameStep = () => {
    const { useSingUp } = useTheme();

    useEffect(() => {
        useSingUp.attributes.actions.validationName(useSingUp.attributes.states.name);
        useSingUp.attributes.actions.validationLastName(useSingUp.attributes.states.lastName);
    }, [useSingUp.attributes.states.name, useSingUp.attributes.states.lastName]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep5();
    }, [ useSingUp.attributes.states.name, useSingUp.attributes.states.nameValid, useSingUp.attributes.states.lastName, useSingUp.attributes.states.lastNameValid ]); // eslint-disable-line

    const next = () => {
        if (useSingUp.attributes.actions.validationButtonStep5()) {
            useSingUp.pages.actions.onLegal();
        }
    }

  return (
    <>
        <div>
            <h1 className={buttonAppMobileContentStyles}>Ahora vamos con tu nombre</h1>
        </div>
            <div className={containerInput}>
                <InputAppContainer 
                    inputProps={{
                        type: 'name',
                        placeholder: 'Nombre',
                        onChange: (e) => useSingUp.attributes.actions.changeName(e.target.value)
                    }}
                />
            </div>
            <div className={containerInput}>
                <InputAppContainer 
                    inputProps={{
                        type: 'name',
                        placeholder: 'Apellido',
                        onChange: (e) => useSingUp.attributes.actions.changeLastName(e.target.value)
                    }}
                />
            </div>
            <WhatsApp />
        <div className={loginContainerStyles}>
            <div className={loginContentStyles}>
                <ButtonAppMobile title="Continuar" 
                    containerProps={{
                        onClick: () => next(),
                        id: 'btn-step-5'
                    }}
                />
            </div>
        </div>
     </>
  );
}
