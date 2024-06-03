import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { ButtonEditInfo } from '../../Button/ButtonEditInfo';
import { useTheme } from '../../context/ThemeContext';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { WhatsApp } from '@/Abstract/Notification/WhatsApp';

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




export const EmailCheckStep = () => {
    const { useSingUp, useError } = useTheme();
    const [fetching, setFetching] = React.useState(false);

    const returnEmail = () => {
        useSingUp.attributes.actions.changeEmail('');
        useSingUp.pages.actions.onEmail();
    }

    useEffect(() => {
        useSingUp.attributes.actions.validationCheckEmail(useSingUp.attributes.states.checkEmail);
    }, [useSingUp.attributes.states.checkEmail]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep2();
    }, [ useSingUp.attributes.states.checkEmail, useSingUp.attributes.states.checkEmailValid ]); // eslint-disable-line

    const next = async () => {
        if (useSingUp.attributes.actions.validationButtonStep2()) {
            try{
                setFetching(true);
                const data = await useSingUp.api.actions.checkEmailCode();
                if(data && data.success){
                    useSingUp.pages.actions.onPhone();
                } else {
                    useError.actions.changeError(['Código incorrecto, vuelva a intentarlo.']);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setFetching(false);
            }
        }
    }

  return (
    <>
        {fetching ? <Loading /> :
        <>
            <Error 
                error={useError.states.error}
            />
            <div>
                <h1 className={buttonAppMobileContentStyles}>Revisa tu bandeja de correo electrónico</h1>
            </div>
            <ButtonEditInfo 
                content={useSingUp.attributes.states.email}
                buttonProps={{
                    buttonTitle: 'Editar',
                    onClick: () => returnEmail()
                }}
            />
            <InputAppContainer 
                inputProps={{
                    type: 'number',
                    placeholder: 'Código de verificación',
                    onChange: (e) => useSingUp.attributes.actions.changeCheckEmail(e.target.value)
                }}
                description="Te enviamos un código de verificación"
            />
            <WhatsApp />
            <div className={loginContainerStyles}>
                <div className={loginContentStyles}>
                    <ButtonAppMobile title="Continuar" 
                        containerProps={{
                            onClick: () => next(),
                            id: 'btn-step-2',
                        }}
                    />
                </div>
            </div>
            </>
        }
     </>
  );
}
