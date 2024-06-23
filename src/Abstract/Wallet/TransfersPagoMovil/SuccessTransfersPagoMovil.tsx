import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, formatPhoneNumberVzla } from '../../helpers';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

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


export function SuccessTransfersPagoMovil() {
  const { useWallet, siteOptions } = useTheme();
  const router = useRouter();

  const returnInit = async () => {
    await router.push('/billetera');
    useWallet.pagesTransfersPagoMovil.actions.returnInit();
  }
  

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
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>{'Hemos recibido tu solicitud de transferencia PagoMovil por:'}</h1>
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
                          useWallet.attributesTransfersPagoMovil.states.change || 0,
                          siteOptions.DECIMAL_NUMBERS,
                          useWallet.attributesTransfersPagoMovil.states.currency?.symbol || '',
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
                    }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name.substring(0, 1)}</span>
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
                    }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name}</span>
                    <span style={{
                      fontSize: '0.6em',
                      fontWeight: 400,
                    }}>{formatPhoneNumberVzla(useWallet.attributesTransfersPagoMovil.states.beneficiary?.phone || '')}</span>
                    <span style={{
                      fontSize: '0.6em',
                      fontWeight: 400,
                    }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.bankName}</span>
                    <span style={{
                      fontSize: '0.6em',
                      fontWeight: 400,
                    }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.accountNumber}</span>
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
                            >{useWallet.attributesTransfersPagoMovil.states.note}</span>
                          </div>
                <div
                      style={{
                        margin: '2em auto 0.5em',
                        width: '90%',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>{'Recibirá un correo al ser completada la transferencia.'}</h1>
                </div>
                <div
                      style={{
                        margin: '0.5em auto',
                        width: '90%',
                      }}
                    >
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}><span style={{fontWeight: 600}}>Importante: </span><span style={{textTransform: 'lowercase'}}>{`La transferencia Pago Movil está programada ${useWallet.attributesTransfersPagoMovil.states.instructions}`}</span></h1>
                </div>
                  
                  

              <div 
                  style={{
                    display: 'flex',
                    margin: '3em 1em',
                    textDecoration: 'none',
                }}
              >
                  <ButtonAppMobile 
                      title="Aceptar"
                      containerProps={{
                        onClick: returnInit,
                      }}
                  />
              </div>
          
          </div>
    </>
  );
}