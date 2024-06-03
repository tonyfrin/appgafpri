import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { ButtonEditInfo } from '../../Button/ButtonEditInfo';
import { formatPhoneNumberVzla } from '../../helpers';
import { Loading } from '../../Loading';
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


export const PhoneCheckStep = () => {
    const { useSingUp, useError } = useTheme();
    const [fetching, setFetching] = React.useState(false);

    const returnPhone = () => {
        useSingUp.attributes.actions.changePhone('');
        useSingUp.pages.actions.onPhone();
    }

    useEffect(() => {
        useSingUp.attributes.actions.validationCheckPhone(useSingUp.attributes.states.checkPhone);
    }, [useSingUp.attributes.states.checkPhone]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep4();
    }, [ useSingUp.attributes.states.checkPhone, useSingUp.attributes.states.checkPhoneValid ]); // eslint-disable-line

    const next = async () => {
        if (useSingUp.attributes.actions.validationButtonStep4()) {
            try{
                setFetching(true);
                const data = await useSingUp.api.actions.checkPhoneCode();
                if(data && data.success){
                    useSingUp.pages.actions.onName();
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
                    <h1 className={buttonAppMobileContentStyles}>Revisa la bandeja de texto en tu teléfono</h1>
                </div>
                <ButtonEditInfo 
                    content={formatPhoneNumberVzla(useSingUp.attributes.states.phone) || 'Número invalido'}
                    buttonProps={{
                        buttonTitle: 'Editar',
                        onClick: () => returnPhone()
                    }}
                />
                <InputAppContainer 
                    inputProps={{
                        type: 'number',
                        placeholder: 'Código de verificación',
                        onChange: (e) => useSingUp.attributes.actions.changeCheckPhone(e.target.value)
                    }}
                    description="Te enviamos un código de verificación"
                />
                <WhatsApp />
                <div className={loginContainerStyles}>
                    <div className={loginContentStyles}>
                        <ButtonAppMobile title="Continuar" 
                            containerProps={{
                                onClick: () => next(),
                                id: 'btn-step-4'
                            }}
                        />
                    </div>
                </div>
            </>
        }
     </>
  );
}
