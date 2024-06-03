import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter } from '../../helpers';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const textResumeStyles = css`
  font-size: 1em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`


export function SuccessTransfersZelle() {
  const { useWallet, siteOptions } = useTheme();
  

  return (
    <>
          <div
            style={{
              marginBottom: '100px'
            }}
          >
            <div
              style={{
                textAlign: 'center',
              }}
            ><h1 className={title1AppStyles} style={{
              textAlign: 'center',
            }}>Confirmación</h1></div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1em',
                textDecoration: 'none',
              }}
            >
              <FaCheckCircle style={{
                fontSize: '3em',
                color: '#324375'
                }}/>
            </div>
                  <div
                      style={{
                        margin: '0.5em auto',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>{'Hemos recibido tu solicitud de transferencia Zelle por:'}</h1>
                  </div>
                  <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '85%',
                        margin: 'auto',
                        textAlign: 'center'
                      
                      }}
                  >
                      <span className={textResumeStyles} style={{fontWeight: '600', fontSize: '2em', textAlign: 'center'}}>{decimalFormatPriceConverter(
                          useWallet.attributesTransfersZelle.states.amount || 0,
                          siteOptions.DECIMAL_NUMBERS,
                          siteOptions.CURRENCY_SYMBOL,
                          siteOptions.CURRENCY_LOCATION
                        )}</span>
                  </div>
                  <div
                      style={{
                        margin: '0.5em auto',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>para: </h1>
                </div>
                 <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#ebebeb',
                  padding: '5px',
                  borderRadius: '10px',
                  margin: '5px auto',
                  cursor: 'pointer',
                  width: '70%',
                }}
                
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '100%',
                    background: '#324d7f',
                    margin: '0 10px',
                    display: 'flex',
                  }}>
                    <span style={{
                      color: '#FFF',
                      fontSize: '1.5em',
                      margin: 'auto',
                      textTransform: 'uppercase',
                    }}>{useWallet.attributesTransfersZelle.states.beneficiary?.name.substring(0, 1)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    width: '80%',
                    overflow: 'hidden',
                  }}>
                    <span style={{
                      fontSize: '0.8em',
                      fontWeight: 600,
                    }}>{useWallet.attributesTransfersZelle.states.beneficiary?.name}</span>
                    <span style={{
                      fontSize: '0.6em',
                      fontWeight: 400,
                    }}>{useWallet.attributesTransfersZelle.states.beneficiary?.email}</span>
                  </div>
                </div>
                <div
                            style={{
                              margin: '2em auto 0px auto',
                              display: 'flex',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >Nota Interna:</span>
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >{useWallet.attributesTransfersZelle.states.note}</span>
                          </div>
                <div
                      style={{
                        margin: '2em auto 0.5em',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>{'Recibirá un correo al ser completada la transferencia.'}</h1>
                </div>
                <div
                      style={{
                        margin: '0.5em auto',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}><span style={{fontWeight: 600}}>Importante: </span>Las transferencias Zelle se completan en el horario comprendido de 8:00am a 6:00pm de lunes a sabado.</h1>
                </div>
                  
                  

              <Link 
                  href='/billetera'
                  style={{
                    display: 'flex',
                    margin: '3em 1em',
                    textDecoration: 'none',
                }}
              >
                  <ButtonAppMobile 
                      title="Aceptar"
                      containerProps={{
                        id: 'amount-recharge-button',
                        onClick: useWallet.pagesTransfersZelle.actions.returnInit,
                      }}
                  />
              </Link>
          
          </div>
    </>
  );
}