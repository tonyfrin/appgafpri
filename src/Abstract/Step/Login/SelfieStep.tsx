import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { PhotoForm } from '../../Form/PhotoForm';
import { useTheme } from '../../context/ThemeContext';
import { Error } from '../../Error';
import Image from 'next/image';
import { WhatsApp } from '../../Notification/WhatsApp';
import { useRouter } from 'next/router';
import { Loading } from '../../Loading';

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
    display: flex;
`
const inputAppTitleStyles = css`
    font-size: 0.6rem;
    font-weight: 500;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px 1em 0px;
    text-align: center;
`

const imageStyle = css`
    color: transparent;
    width: 10%;
    height: 10%;
    border-radius: 15px;

    @media (max-width: 768px) {
        width: 30%;
        height: 30%;
    }
`

export const SelfieStep = () => {
    const { useSingUp, useError } = useTheme();
    const [fetching, setFetching] = React.useState(false);
    const router = useRouter();


    useEffect(() => {
        useSingUp.attributes.actions.validationUserPhoto(useSingUp.attributes.states.userPhoto);
    }, [ useSingUp.attributes.states.userPhoto ]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep8();
    }, [ useSingUp.attributes.states.userPhoto, useSingUp.attributes.states.userPhotoValid ]); // eslint-disable-line

    const next = async () => {

        if (useSingUp.attributes.actions.validationButtonStep8()) {
            try {
                setFetching(true);
                const data = await useSingUp.api.actions.addUser();
                if(data && data.success){
                    useSingUp.attributes.actions.setSuccessRegister(true);
                    await router.push('/login/crear/exito');
                } else {
                    const error = []
                    error.push(data.message);
                    error.push('Por favor, inténtalo de nuevo.');
                    useError.actions.changeError(error);
                }
            } catch (error) {
                useError.actions.changeError(['Lo sentimos, ocurrió un error inesperado. Por favor, inténtalo de nuevo.']);
                
            } finally {
                setFetching(false);
            }
        }
    }
  return (
    <>
    {fetching ? <Loading /> :
    <div
        style={{
            marginBottom: '300px'
        }}
    >
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '20px 0'
            }}
        >
            <h1 className={buttonAppMobileContentStyles}>Tómate una foto de frente</h1>
            <p className={inputAppTitleStyles}>{`Se requiere una selfie ( foto retrato ) del momento y sin accesorios o filtros.`} </p>
            <Image 
                className={imageStyle}
                src="https://categorygafpri.s3.us-east-2.amazonaws.com/Captura+de+pantalla+2024-05-28+a+la(s)+7.42.37%E2%80%AFp.m..png"
                alt="step 7"
                width={375}
                height={375}
            />
        </div>
            <Error 
                error={useError.states.error}
            />
            <div className={containerInput}>
                <PhotoForm
                    photo = {useSingUp.attributes.states.userPhoto}
                    changePhoto = {useSingUp.attributes.actions.changeUserPhoto}
                    changeError = {useError.actions.changeError}
                    setSubmitting = {useSingUp.attributes.actions.setSubmittingUser}
                    submitting = {useSingUp.attributes.states.submittingUser}
                    formId='userPhoto'
                />
            </div>
            <WhatsApp />
            
        <div className={loginContainerStyles}>
            <div className={loginContentStyles}>
                <ButtonAppMobile title="Continuar" 
                    containerProps={{
                        onClick: () => next(),
                        id: 'btn-step-8'
                    }}
                />
            </div>
        </div>
     </div>
    }
     </>
  );
}
