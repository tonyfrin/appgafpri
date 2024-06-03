import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { useTheme } from '../../context/ThemeContext'
import { PhotoForm } from '@/Abstract/Form/PhotoForm';
import { Error } from '@/Abstract/Error';
import Image from 'next/image';
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
    display: flex;
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

const inputAppTitleStyles = css`
    font-size: 0.6rem;
    font-weight: 500;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px 1em 0px;
    text-align: center;
`

export const LegalPhotoStep = () => {
    const { useSingUp, useError } = useTheme();

    useEffect(() => {
        useSingUp.attributes.actions.validationDocumentIdPhoto(useSingUp.attributes.states.documentIdPhoto);
    }, [useSingUp.attributes.states.documentIdPhoto]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep7();
    }, [ // eslint-disable-line
        useSingUp.attributes.states.documentIdPhoto,
        useSingUp.attributes.states.documentIdPhotoValid,
    ]);

    const next = () => {
        if (useSingUp.attributes.actions.validationButtonStep7()) {
            useSingUp.pages.actions.onSelfie();
        }
    }

  return (
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
            <h1 className={buttonAppMobileContentStyles}>Sube una foto de tu documento de identidad</h1>
            <p style={{width: '75%'}}className={inputAppTitleStyles}>{`Se requiere cédula de identidad o licencia de conducir`} </p>
            <Image 
                className={imageStyle}
                src="https://categorygafpri.s3.us-east-2.amazonaws.com/document-ejemplo.jpg"
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
                    photo = {useSingUp.attributes.states.documentIdPhoto}
                    changePhoto = {useSingUp.attributes.actions.changeDocumentIdPhoto}
                    changeError = {useError.actions.changeError}
                    setSubmitting = {useSingUp.attributes.actions.setSubmittingDocumentId}
                    submitting = {useSingUp.attributes.states.submittingDocumentId}
                    formId='documentId'
                />
            </div>
            <WhatsApp />
            
        <div className={loginContainerStyles}>
            <div className={loginContentStyles}>
                <ButtonAppMobile title="Continuar" 
                    containerProps={{
                        onClick: next,
                        id: 'btn-step-7'
                    }}
                />
            </div>
        </div>
     </div>
  );
}
