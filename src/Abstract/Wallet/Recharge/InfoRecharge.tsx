import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter } from '../../helpers';
import { FiChevronLeft } from 'react-icons/fi';
import { Error } from '../../Error/Error';

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

export function InfoRecharge() {
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
              marginBottom: '100px'
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
                  borderBottom: '1px solid #e1e1e1'
              }}> 
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Recarga de Saldo</h1>
                  <FiChevronLeft 
                      className={arrowStyle}
                      onClick={useWallet.pagesRecharge.actions.returnInit}
                  />
              </div>
                
              <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '1em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles} style={{fontWeight: '600', textAlign: 'center'}}>{`Esta recargando con una Transferencia ${useWallet.attributesRecharge.states.paymentType} por un monto de ${decimalFormatPriceConverter(
                              useWallet.attributesRecharge.states.amount || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}`}</span>
                  </div>
                  <div style={{
                    margin: 'auto',
                    padding: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                      <div style={{
                        width: '80%',
                        margin: 'auto',
                      }}>
                        <span className={textInfoTitleStyles}>Persona que realizó la transferencia</span>
                      </div>
                      <InputAppContainer 
                          inputProps={{
                            placeholder: 'Nombre y Apellido',
                            type: 'Text',
                            onChange: (e) => useWallet.attributesRecharge.actions.setNameSend(e.target.value),
                            value: useWallet.attributesRecharge.states.nameSend
                          }}
                          containerStyles={{
                            customStyles: 'width: 95%; margin: auto;'
                          }}
                        />
                  </div>
                  <div style={{
                    margin: '1em auto',
                    padding: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                      <div style={{
                        width: '80%',
                        margin: 'auto',
                      }}>
                        <span className={textInfoTitleStyles}>Número de confirmación</span>
                      </div>
                      <InputAppContainer 
                          inputProps={{
                            placeholder: 'Confirmación',
                            type: 'Text',
                            onChange: (e) => useWallet.attributesRecharge.actions.setNumber(e.target.value),
                            value: useWallet.attributesRecharge.states.number
                          }}
                          containerStyles={{
                            customStyles: 'width: 95%; margin: auto;'
                          }}
                        />
                  </div>
                  <div style={{
                      display: 'flex',
                      margin: '1em',
                      textDecoration: 'none',
                  }}>
                      <ButtonAppMobile 
                          title="Siguiente"
                          containerProps={{
                            id: 'info-recharge-button',
                            onClick: next
                          }}
                      />
                  </div>
            
          
          </div>
    </>
  );
}