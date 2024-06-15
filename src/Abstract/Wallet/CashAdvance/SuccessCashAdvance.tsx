import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, scrollToTop } from '../../helpers';
import { Error } from '../../Error';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoCash from '../../assets/img/logo-cash.png';
import { RiCheckboxCircleLine } from 'react-icons/ri';

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

const checkboxStyles = css`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #aaa;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:checked {
    border-color: #000;
    background-color: #000;
  }

  &:checked::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 2px;
  }
`;

export function SuccessCashAdvance() {
  const { useWallet, siteOptions, useError } = useTheme();

  const add = () => {
    scrollToTop();
  }
 

  useEffect(() => {
    useWallet.attributesRecharge.actions.validationResponsabilitytButton();
  }, [useWallet.attributesRecharge.states.responsability]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentAccount = useWallet.attributesCashAdvance.states.account;

  return (
    <>
       
          <div
            style={{
              marginBottom: '200px'
            }}
          >
            
            <>
            <Error 
              error={useError.states.error}
            />
            <HeaderPageReturn 
              title={'Confirmación'}
              onClick={useWallet.pagesCashAdvance.actions.returnInit}
              image={{
                src: LogoCash.src,
                backgroundColor: '#008000',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '2em auto',
                width: '90%'
              }}
            >
              <div>   
                  <RiCheckboxCircleLine
                      style={{
                          fontSize: '3em'
                      }}
                  />
              </div>
              <p
                  style={{
                      margin: '10px 0px 10px 0px',
                      padding: '0px',
                      fontSize: '0.7em',
                      fontFamily: 'Poppins, sans-serif',
                      textAlign: 'center',
                      fontWeight: '600'
                  }}
              >Solicitud recibida.</p>
              <p
                  style={{
                      margin: '0px',
                      padding: '0px',
                      fontSize: '0.7em',
                      fontFamily: 'Poppins, sans-serif',
                      textAlign: 'center'
                  }}
              >En breve reciirá un correo con la aprobación e instrucciones para el retiro del efectivo.</p>
            </div>
            
              <div 
                style={{
                  backgroundColor: '#ececec',
                  padding: '1em',
                  margin: '1em',
                  borderRadius: '15px',
                  fontSize: '0.6em'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Confirmación #:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'uppercase'}}>{useWallet.attributesCashAdvance.states.number}</span>
                </div>
                 <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Tipo de Retiro:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'uppercase'}}>{'Avance de efectivo'}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Tienda a Retirar:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize'}}>{useWallet.attributesCashAdvance.states.store?.tradename}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',
                  }}
                >
                  <span className={textResumeStyles} style={{width: '30%'}}>Dirección:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize', width: '70%', textAlign: 'right'}}>{`${useWallet.attributesCashAdvance.states.store?.address1 || ''} ${useWallet.attributesCashAdvance.states.store?.address2 || ''}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Ciudad:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize', textAlign: 'right'}}>{`${useWallet.attributesCashAdvance.states.store?.city || ''}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',
                  }}
                >
                  <span className={textResumeStyles} style={{width: '30%'}}>Disponibilidad:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize', width: '70%', textAlign: 'right'}}>{useWallet.attributesCashAdvance.states.instructions}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Monto a retirar: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                            useWallet.attributesCashAdvance.states.amount || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            siteOptions.CURRENCY_SYMBOL,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                </div>
                </div>
              <div style={{
                  display: 'flex',
                  margin: '1em',
                  textDecoration: 'none',
              }}>
                  <ButtonAppMobile 
                      title="Aceptar"
                      contentProps={{
                        onClick: add
                      }}
                  />
              </div>
              </>

          </div>
      
    </>
  );
}