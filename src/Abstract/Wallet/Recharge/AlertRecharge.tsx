import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { WhatsApp } from '@/Abstract/Notification/WhatsApp';

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

const textResumeStyles = css`
  font-size: 1em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`
const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const subTitle = css`
    font-size: 1em;
    color: #5c5c5c;
    font-weight: 400;
    padding: 0.9em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const buttonAppMobileContentStyles = css`
    font-size: 1.3em;
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


const textInfoStyles = css`
  font-size: 0.7em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

export function AlertRecharge() {
  const { useWallet, siteOptions, useError } = useTheme();

  const next = () => {
    if(useWallet.attributesRecharge.actions.validationInfoButton()){
      useWallet.pagesRecharge.actions.onConfirmation();
    }
  }

  useEffect(() => {
    useWallet.attributesRecharge.actions.validationInfoButton();
  }, [useWallet.attributesRecharge.states.nameSend, useWallet.attributesRecharge.states.number]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
          <div
            style={{
              marginBottom: '400px'
            }}
          >
            <div>
                <p className={subTitle}>
                    {'Antes de continuar, asegurate de que la persona de su confianza o usted haya hecho la transferecia a la cuenta de la billetera.'}
                </p>
            </div>

            {useWallet.attributesRecharge.states.paymentType === 'zelle' &&
                <div
                  style={{
                    border: '1px solid #ebebeb',
                    width: '90%',
                    margin: '1em auto',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1em',
                  }}>
                    <span className={textInfoStyles}>Los datos para transferencia Zelle son:</span>
                    <span className={textInfoStyles}>A nombre de: <span style={{fontWeight: 600}}>Gafpri Corp</span></span>
                    <span className={textInfoStyles}>Correo: <span style={{fontWeight: 600}}>pagos@gafpri.com</span></span>
                  </div>
                </div>
              }

              {useWallet.attributesRecharge.states.paymentType === 'paypal' &&
                <div
                  style={{
                    border: '1px solid #ebebeb',
                    width: '90%',
                    margin: '1em auto',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1em',
                  }}>
                    <span className={textInfoStyles}>Los datos para transferencia PayPal son:</span>
                    <span className={textInfoStyles}>A nombre de: <span style={{fontWeight: 600}}>Gafpri Corp</span></span>
                    <span className={textInfoStyles}>Correo: <span style={{fontWeight: 600}}>info@gafpri.com</span></span>
                  </div>
                </div>
              }
            <div>
                <h1 className={buttonAppMobileContentStyles}>{`¿Ya realizaste o realizaron la transferencia ${useWallet.attributesRecharge.states.paymentType} a la cuenta de la billetera?`}</h1>
            </div>

            <div>
                <h1 className={buttonAppMobileContentStyles}>{`¿Tienes el nombre de la persona que realizó la transferencia y el número de confirmación o referencia?`}</h1>
            </div>

            <div>
                <p 
                  style={{
                    width: '90%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '0.75em',
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: 'center',
                  }}
                >{`Recuerda que el numero de confirmación es único y obligatorio`}</p>
            </div>
              <div
              >
                <WhatsApp />
              </div>
                
            <div className={loginContainerStyles}>
                <div className={loginContentStyles}>
                    <ButtonAppMobile title="Si, continuar" 
                        containerProps={{
                            onClick: () => useWallet.pagesRecharge.actions.onInfo(),
                        }}
                    />
                </div>
                
          
                <div className={loginContentStyles}>
                    <ButtonAppMobile title="No, volver" 
                        containerProps={{
                            onClick: () => useWallet.pagesRecharge.actions.returnInit(),
                        }}
                        containerStyles={{
                            backgroundColor: '#C12429'
                        }}
                    />
                </div>
            </div>
          </div>
    </>
  );
}