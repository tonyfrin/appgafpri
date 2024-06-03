import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import { InputAppContainer } from '../Input/InputAppContainer';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { Loading } from '../Loading';
import { Error } from '../Error/Error';
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

export function Password() {
  const { useError, useProfile, useUser } = useTheme();

  const returnInit = ():void => {
    useUser.attributes.actions.setCurrentPassword('');
    useUser.attributes.actions.setNewPassword('');
    useProfile.pages.actions.infoReset();
  }

  const change = async (): Promise<void> => {
    try{
        useProfile.pages.actions.onFetching();
        const data = await useUser.api.actions.changePassword();
        if(data && data.success){
            useUser.attributes.actions.setCurrentPassword('');
            useUser.attributes.actions.setNewPassword('');
            useProfile.pages.actions.onSuccessPassword();
        } else{
            useError.actions.changeError(['Error al cambiar contraseña, intente de nuevo.']);
            useProfile.pages.actions.onPassword();
        }
    } catch (error) {
        useError.actions.changeError(['Error al cambiar contraseña, intente de nuevo.']);
        useProfile.pages.actions.onPassword();
    }
  }

  useEffect(() => {
    useUser.attributes.actions.validationPasswordBotton();
  }, [useUser.attributes.states.currentPassword, useUser.attributes.states.newPassword]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    
    <>
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
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Cambiar Contraseña</h1>
                  <div style={{
                    textDecoration: 'none',
                    display: 'flex',
                  }}>
                    <FiChevronLeft 
                        className={arrowStyle}
                        onClick={returnInit}
                    />
                  </div>
              </div>
              <div>

                <div style={{
                    margin: 'auto',
                    padding: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    }}>
                        <div style={{
                        width: '81%',
                        margin: 'auto',
                        }}>
                        <span className={textInfoTitleStyles}>Contraseña Actual</span>
                        </div>
                        <InputAppContainer 
                            inputProps={{
                                placeholder: 'Contraseña Actual',
                                type: 'password',
                                onChange: (e) => useUser.attributes.actions.setCurrentPassword(e.target.value)
                                
                            }}
                            containerStyles={{
                            customStyles: 'width: 95%; margin: auto;'
                            }}
                        />
                </div>
                <div style={{
                    margin: 'auto',
                    padding: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    }}>
                        <div style={{
                        width: '81%',
                        margin: 'auto',
                        }}>
                        <span className={textInfoTitleStyles}>Nueva contraseña</span>
                        </div>
                        <InputAppContainer 
                            inputProps={{
                                placeholder: 'Nueva contraseña',
                                type: 'password',
                                onChange: (e) => useUser.attributes.actions.setNewPassword(e.target.value),
                            }}
                            containerStyles={{
                            customStyles: 'width: 95%; margin: auto;'
                            }}
                        />
                </div>

                <div 
                    style={{
                        display: 'flex',
                        margin: '1em',
                        textDecoration: 'none',
                    }}
                >
                    <ButtonAppMobile 
                        title="Cambiar"
                        containerProps={{
                            id: 'password',
                            onClick: change,
                        }}
                    />
                </div>

              </div>
             
          
          
          </div>
    </>
  );
}