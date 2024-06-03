import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { useTheme } from '../../context/ThemeContext';
import { SelectApp } from '../../Select/SelectApp';
import { Loading } from '../../Loading';
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

const inputAppTitleStyles = css`
    font-size: 0.6rem;
    font-weight: 500;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px;
    text-align: center;
`


export const LegalStep = () => {
    const { useSingUp, useUser } = useTheme();
    const [InputTypeDocumentIdId, setInputTypeDocumentIdId] = React.useState(<></>);
    const [InputIndex, setInputIndex] = React.useState(<></>);

    

    const typeDocumentIdId = useUser.apiTypeDocumentId.states.typeDocumentId || [];
    const typeDocumentIdIdOptions = typeDocumentIdId.map((item) => ({ value: item.id, label: item.name }));
    

    useEffect(() => {

        setInputIndex(() => (
            <SelectApp 
                options={useSingUp.attributes.states.indexOptions}
                value={useSingUp.attributes.states.index}
                onChange={(e) => useSingUp.attributes.actions.changeIndex({ value: e, label: e })}
            />
        ))

        if(typeDocumentIdId.length > 0){
            typeDocumentIdIdOptions.unshift({ value: '', label: 'Tipo de documento' });
            setInputTypeDocumentIdId(() => (
                    <SelectApp 
                        options={typeDocumentIdIdOptions}
                        value={useSingUp.attributes.states.typeDocumentIdId}
                        onChange={(e) => useSingUp.attributes.actions.changeTypeDocumentIdId({ value: e, label: e })}
                    />
                ))
            }
    }, []); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationTypeDocumentIdId(useSingUp.attributes.states.typeDocumentIdId);
        useSingUp.attributes.actions.validationIndex(useSingUp.attributes.states.index);
        useSingUp.attributes.actions.validationDigit(useSingUp.attributes.states.digit);
    }, [ useSingUp.attributes.states.typeDocumentIdId, useSingUp.attributes.states.index, useSingUp.attributes.states.digit ]); // eslint-disable-line

    useEffect(() => {
        useSingUp.attributes.actions.validationButtonStep6();
    }, [ useSingUp.attributes.states.typeDocumentIdId, useSingUp.attributes.states.typeDocumentIdIdValid, useSingUp.attributes.states.index, useSingUp.attributes.states.indexValid, useSingUp.attributes.states.digit, useSingUp.attributes.states.digitValid ]); // eslint-disable-line

    const next = () => {
        if (useSingUp.attributes.actions.validationButtonStep6()) {
            useSingUp.pages.actions.onPhotoLegal();
        }
    }

  return (
    <>
        {useUser.apiTypeDocumentId.states.isReadyTypeDocumentId ? 
        <>
            <div>
                <h1 className={buttonAppMobileContentStyles}>Tu documento Legal</h1>
            </div>
            <p style={{width: '75%', margin: 'auto'}}className={inputAppTitleStyles}>{`Se requiere número de cédula de identidad`} </p>    
                <div className={containerInput}style={{
                    display: 'flex',
                }}>
                    
                    {InputTypeDocumentIdId}
                </div>
                <div className={containerInput} style={{
                    display: 'flex',
                }}>
                    {InputIndex}
                </div>
                    <InputAppContainer 
                        inputProps={{
                            type: 'number',
                            placeholder: 'Numero de documento',
                            onChange: (e) => useSingUp.attributes.actions.changeDigit(e.target.value),
                            defaultValue: useSingUp.attributes.states.digit
                        }}
                    />
                    <WhatsApp />
                
            <div className={loginContainerStyles}>
                <div className={loginContentStyles}>
                    <ButtonAppMobile title="Continuar" 
                        containerProps={{
                            onClick: () => next(),
                            id: 'btn-step-6'
                        }}
                    />
                </div>
            </div>
        </>
        : <Loading />}
    </>
  );
}
