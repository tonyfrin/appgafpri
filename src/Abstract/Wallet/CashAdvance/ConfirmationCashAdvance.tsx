import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, scrollToTop } from '../../helpers';
import { Error } from '../../Error';
import { Loading } from '@/Abstract/Loading';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoCash from '../../assets/img/logo-cash.png';

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

export function ConfirmationCashAdvance() {
  const { useWallet, siteOptions, useError } = useTheme();

  const add =  async (): Promise<void> => {
    try{
      useWallet.pagesCashAdvance.actions.onFetching();
      const data = await useWallet.account.actions.addCashAdvance();
      if(data && data.success){
        scrollToTop();
        useWallet.attributesCashAdvance.actions.setNumber(data.item.postsId);
        useWallet.pagesCashAdvance.actions.onSuccess();
      } else{
        useWallet.pagesCashAdvance.actions.onError();
        useError.actions.changeError([data.message]);
      }
    } catch (error) {
      console.log(error);
      useError.actions.changeError(['Error al realizar la solicitud de avance de efectivo']);
      useWallet.pagesCashAdvance.actions.onError();
    } 
  }
 

  useEffect(() => {
    useWallet.attributesCashAdvance.actions.validationResponsabilitytButton();
  }, [useWallet.attributesCashAdvance.states.responsability]); // eslint-disable-line react-hooks/exhaustive-deps

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
              title={'Verificación'}
              onClick={useWallet.pagesCashAdvance.actions.returnInit}
              image={{
                src: LogoCash.src,
                backgroundColor: '#008000',
              }}
            />
            
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
                  <span className={textResumeStyles} style={{fontWeight: '600', width: '70%', textAlign: 'right'}}>{useWallet.attributesCashAdvance.states.instructions}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Monto de avance: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                            useWallet.attributesCashAdvance.states.amount || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            siteOptions.CURRENCY_SYMBOL,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>{`Gastos administrativos: `}</span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                            useWallet.attributesCashAdvance.states.commission || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            siteOptions.CURRENCY_SYMBOL,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Total retiro: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                      useWallet.attributesCashAdvance.states.total || 0,
                      siteOptions.DECIMAL_NUMBERS,
                      siteOptions.CURRENCY_SYMBOL,
                      siteOptions.CURRENCY_LOCATION
                    )}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Cuenta a retirar: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{currentAccount?.name}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles} style={{width: '30%'}}>Nota interna: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600', width: '70%'}}>{useWallet.attributesRecharge.states.note}</span>
                </div>
              </div>
              <div><h1 className={title1AppStyles} style={{textAlign: 'center'}}>¿La información es correcta?</h1></div>

                <div
                  style={{
                    display: 'flex',
                    width: '85%',
                    margin: 'auto',
                    border: '2px solid #eaeaea',
                    borderRadius: '15px',
                    padding: '2%',
                  }}
                >
                  <div style={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                  }}>
                    <input 
                      type="checkbox"
                      className={checkboxStyles}
                      checked={useWallet.attributesCashAdvance.states.responsability}
                      onChange={() => useWallet.attributesCashAdvance.actions.setResponsability(!useWallet.attributesCashAdvance.states.responsability)}
                    />
                  </div>
                  <div style={{
                    width: '90%',
                    display: 'flex',
                  }}>
                    <span
                      style={{
                        textAlign: 'justify',
                        fontSize: '0.6em',
                        fontFamily: 'Poppins',
                        lineHeight: '1.3',
                        padding: '10px'
                      }}
                    >{'Al marcar esta casilla, declaro que acepto la información proporcionada sobre el avance de efectivo y me comprometo a presentarme en la fecha, horario y lugar arriba acordados, de manera personal y portando mi cédula de identidad. Entiendo que la no presentación de mi documento de identidad resultará en la imposibilidad de entrega del efectivo.'}</span>
                  </div>
                </div>
              <div style={{
                  display: 'flex',
                  margin: '1em',
                  textDecoration: 'none',
              }}>
                  <ButtonAppMobile 
                      title="Solicitar Efectivo"
                      containerProps={{
                        id: 'responsability-cash-button',
                      }}
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