import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import { InputAppContainer } from '../Input/InputAppContainer';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { Loading } from '../Loading';
import { Error } from '../Error/Error';
import { ButtonEditInfo } from '../Button/ButtonEditInfo';
import { formatPhoneNumberVzla } from '../helpers';
import { WhatsApp } from '../Notification/WhatsApp';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';


const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const textInfoTitleStyles = css`
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #9e9e9e;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const inputAppTitleStyles = css`
    font-size: 0.6rem;
    font-weight: 500;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px;
    text-align: center;
`

const loginContentStyles = css`
    display: flex;
    flex-direction: column;
`;

export function Phone() {
  const { useError, useProfile, useUser, useLogin, useSingUp } = useTheme();
  const [phoneConfirmation, setPhoneConfirmation] = React.useState(false);
  const [request, setRequest] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);

  const resetInfo = ():void => {
    useUser.attributes.actions.changePhone('');
    useUser.attributes.actions.changePhoneCode('');
  }

  const returnInit = ():void => {
    resetInfo();
    setRequest(false);
    setCheck(false);
  }

  const returnCodeRequest = ():void => {
    resetInfo();
    setRequest(true);
    setCheck(false);
  }

  const codeRequest = async (): Promise<void> => {
    if(useUser.attributes.actions.validationPhoneBotton1()){
      try{
        setFetching(true);
          const data = await useSingUp.api.actions.requestPhoneCode(useUser.attributes.states.phone);
          // const data = {success: true};
          if(data && data.success){
                setCheck(true);
          } else{
              useError.actions.changeError(['Error al enviar código, intente de nuevo.']);
          }
      } catch (error) {
        useError.actions.changeError(['Error al enviar código, intente de nuevo.']);
      } finally {
          setFetching(false);
      }
    }
  }

  const updatePhone = async (): Promise<void> => {
    if(useUser.attributes.actions.validationPhoneBotton2()){
      try{
        setFetching(true);
          const data = await useUser.api.actions.updatePhone();
          if(data && data.success){
                setCheck(false);
                setRequest(false);
                const response = await useLogin.data.actions.checkLoginToken();
                useLogin.data.actions.onCheckLoginTokenRefresh(response);
          } else{
              useError.actions.changeError(['Error al verificar el teléfono, intente de nuevo.']);
          }
      } catch (error) {
          useError.actions.changeError(['Error al enviar código, intente de nuevo.']);
      } finally {
          setFetching(false);
      }
    }
  }

  useEffect(() => {
    useUser.attributes.actions.validationPhoneBotton1();
    useUser.attributes.actions.validationPhoneBotton2();

    /* eslint-disable */
  }, [
    useUser.attributes.states.phone, 
    useUser.attributes.states.phoneValid,
    useUser.attributes.states.phoneCode,
    useUser.attributes.states.phoneCodeValid,
    request,
    check
  ]); 

  useEffect(() => {
    if(useLogin.data.states.currentUser){

      setPhoneConfirmation(useLogin.data.states.currentUser.phoneConfirmation);
    }
  }, [useLogin.data.states.currentUser]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    
    <>
        {fetching ? <Loading /> : 
          <div
            style = {{
              marginBottom: '200px'
            }}
          >
            <Error 
                error={useError.states.error}
            />
            <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1em 0px',
                  width: '90%',
                  margin: 'auto',
                  borderBottom: '1px solid #e1e1e1',
                  
              }}> 
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Cambiar / Verificar Teléfono</h1>
                  <div style={{
                    textDecoration: 'none',
                    display: 'flex',
                  }}>
                    <Link href="/perfil">
                      <FiChevronLeft 
                          className={arrowStyle}
                          onClick={returnInit}
                      />
                    </Link>
                  </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '90%',
                    margin: '2em auto 0 auto',
                  }}
                >
                  <p className={inputAppTitleStyles}>{phoneConfirmation && formatPhoneNumberVzla(useLogin.data.states.currentUser?.phone || '') ? 'Su número de teléfono ha sido verificado, si desea cambiarlo haga click en "Cambiar"' : 'No tiene número de teléfono registrado, por favor haga click en "Agregar" para registrarlo.'} </p>
                </div>
              <ButtonEditInfo 
                    content={formatPhoneNumberVzla(useLogin.data.states.currentUser?.phone || '') || 'Teléfono no registrado'}
                    buttonProps={{
                        buttonTitle: request ? '' : phoneConfirmation && formatPhoneNumberVzla(useLogin.data.states.currentUser?.phone || '') ? 'Cambiar' : 'Agregar',
                        onClick: request ? () => console.log() : () => setRequest(true),
                    }}
              />
              {request && !check &&
                <>
                  <InputAppContainer 
                      inputProps={{
                          type: 'number',
                          placeholder: '414 123 4567',
                          onChange: (e) => useUser.attributes.actions.changePhone(e.target.value),
                      }}
                      description="Sin el 0 por delante. (Solo télefonos de Venezuela) Ejemplo: 4141234567"
                  />
                  <div className={loginContentStyles}>
                      <ButtonAppMobile title="Solicitar Código" 
                          containerProps={{
                              onClick: () => codeRequest(),
                              id: 'phone-1'
                          }}
                      />
                  </div>
                </>
              }

              { request && check &&
                <>
                  <ButtonEditInfo 
                    content={formatPhoneNumberVzla(useUser.attributes.states.phone) || 'Teléfono no registrado'}
                    buttonProps={{
                        buttonTitle: '',
                    }}
                  />
                </>
              }

              {
                check &&
                <div>
                    <InputAppContainer 
                        inputProps={{
                            type: 'number',
                            placeholder: 'Código de verificación',
                            onChange: (e) => useUser.attributes.actions.changePhoneCode(e.target.value)
                        }}
                        description="Te enviamos un código de verificación"
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '90%',
                        margin: '1em auto',
                      }}
                    >
                      <p className={inputAppTitleStyles}>Si no recibe el mensaje de texto con el código de verificación en unos minutos, puede solicitar uno nuevamente dando click <span onClick={returnCodeRequest} style={{fontWeight: 700, color: '#0ab1e6'}}>aquí</span></p>
                    </div>
                    <div className={loginContentStyles}>
                            <ButtonAppMobile title="Verificar" 
                                containerProps={{
                                    onClick: () => updatePhone(),
                                    id: 'phone-2'
                                }}
                            />
                    </div>
                </div>
              }

              {
                !request && !check && 
               <>
                <Link href='/perfil' className={loginContentStyles} style={{textDecoration: 'none'}}>
                    <ButtonAppMobile title="Regresar" 
                        containerProps={{
                            onClick: () => returnInit(),
                        }}
                        containerStyles={{
                          width: 'fit-content',
                          backgroundColor: '#c12429',
                          borderRadius: '10px'
                        }}
                        contentStyles={{
                          fontSize: '0.8em',
                        }}
                    />
                </Link>
               </>
              }


              </div>
              <WhatsApp />
            
          
          
          </div>
        }
    </>
  );
}