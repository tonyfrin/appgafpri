import React from 'react';
import { css } from '@emotion/css';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, formatPhoneNumber } from '../../helpers';

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

export function SuccessTransfers() {
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
                      <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>{`${useWallet.attributesTransfers.states.beneficiary?.entity.name} a recibido tu dinero.`}</h1>
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
                          useWallet.attributesTransfers.states.amount || 0,
                          siteOptions.DECIMAL_NUMBERS,
                          siteOptions.CURRENCY_SYMBOL,
                          siteOptions.CURRENCY_LOCATION
                        )}</span>
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
                    }}>{useWallet.attributesTransfers.states.beneficiary?.entity.name.substring(0, 1)}</span>
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
                    }}>{useWallet.attributesTransfers.states.beneficiary?.entity.name}</span>
                    <span style={{
                      fontSize: '0.6em',
                      fontWeight: 400,
                    }}>{useWallet.attributesTransfers.states.beneficiary?.email ? useWallet.attributesTransfers.states.beneficiary.email : useWallet.attributesTransfers.states.beneficiary?.phone ? formatPhoneNumber(useWallet.attributesTransfers.states.beneficiary.phone) : useWallet.attributesTransfers.states.beneficiary?.id ? useWallet.attributesTransfers.states.beneficiary?.id : ''}</span>
                  </div>
                </div>
                <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '85%',
                        margin: '2em auto',
                        textAlign: 'center'
                      
                      }}
                  >
                      <span className={textResumeStyles} style={{fontWeight: '600', fontSize: '1em', textAlign: 'center'}}>{`Confirmación #${useWallet.attributesTransfers.states.number}`}</span>
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
                    >Nota:</span>
                    <span
                      style={{
                        textAlign: 'center',
                        color: '#000',
                        fontSize: '0.7em',
                        fontWeight: 400,
                      }}
                    >{useWallet.attributesTransfers.states.note}</span>
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
                        onClick: useWallet.pagesTransfers.actions.returnInit,
                      }}
                  />
              </Link>
          
          </div>
    </>
  );
}