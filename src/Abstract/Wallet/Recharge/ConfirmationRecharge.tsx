import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import moment, { Moment } from 'moment-timezone';
import 'moment/locale/es';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, scrollToTop } from '../../helpers';
import { Error } from '../../Error';
import { Loading } from '@/Abstract/Loading';

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


const fila3 = css`
  border: 2px solid rgb(234, 234, 234);
  border-radius: 10px;
  padding: 1em 2%;
  display: flex;
  width: 80%;
  margin: auto;
  align-items: center;
`
const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
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

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

export function ConfirmationRecharge() {
  const { useWallet, siteOptions, useError } = useTheme();
 

  const add = async () => {
    if(useWallet.attributesRecharge.actions.validationResponsabilitytButton()){
      try{
        useWallet.pagesRecharge.actions.onFetching();
        const data = await useWallet.account.actions.addRecharge();
        if(data && data.success){
          scrollToTop();
          await useWallet.attributes.actions.getWalletAccount();
          await useWallet.attributes.actions.getEntities();
          useWallet.pagesRecharge.actions.onSuccess();
        } else{
          useWallet.pagesRecharge.actions.returnInit();
          useError.actions.changeError(['Lo sentimos! No se pudo realizar la recarga de saldo. Intente nuevamente.']);
        }
      } catch (error) {
        useWallet.pagesRecharge.actions.returnInit();
        useError.actions.changeError(['Lo sentimos! No se pudo realizar la recarga de saldo. Intente nuevamente.']);
      }
    }
  }

  function addDay(date: Moment, day: number) {
    // Sumar un día
    date.add(day, 'day');

    return date;
  }

  useEffect(() => {
    moment.locale('es');
    const currentTime = new Date();
    const dateMoment = moment(currentTime);
    const datePlusOneHour = moment(currentTime);
    const dateVenezuela = dateMoment.tz('America/Caracas');
    const dateVenezuelaPlusOneHour = datePlusOneHour.tz('America/Caracas');
    let descriptionOptions1 = '';
    let dateOptions1 = '';

    if (dateVenezuela.hour() >= 8 && dateVenezuela.hour() <= 20){
      dateVenezuelaPlusOneHour.add(30, 'minutes');
      descriptionOptions1 = `El sistema verificará la recarga hoy entre ${dateVenezuela.format('h:mm A')} y las ${dateVenezuelaPlusOneHour.format('h:mm A')}`;
      dateOptions1 = dateVenezuela.toDate().toString();

    } else if(dateVenezuela.hour() < 8){
      descriptionOptions1 = `El sistema verificará la recarga hoy entre las 8:00 AM y las 8:30 AM`;
      dateOptions1 = dateVenezuela.toDate().toString();
      
    } else if(dateVenezuela.hour() > 20){
      const dateVenezuelaPlusOneDay: Moment = addDay(dateVenezuela.clone(), 1);
      descriptionOptions1 = `El sistema verificará la recarga el ${dateVenezuelaPlusOneDay.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 8:30 AM`;
      dateOptions1 = dateVenezuelaPlusOneDay.toDate().toString();
      
    }

    useWallet.attributesRecharge.actions.setDate(dateOptions1);
    useWallet.attributesRecharge.actions.setInstructions(descriptionOptions1);
  }, []); // eslint-disable-line

  useEffect(() => {
    useWallet.attributesRecharge.actions.validationResponsabilitytButton();
  }, [useWallet.attributesRecharge.states.responsability]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentAccount = useWallet.attributes.states.walletAccount.find((item) => `${item.postsId}` === `${useWallet.attributesRecharge.states.walletAccountPostsId}`);

  return (
    <>
        {useWallet.attributesRecharge.states.currency === null ? <Loading /> :
          <div
            style={{
              marginBottom: '200px'
            }}
          >
            
            <>
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
                    onClick={useWallet.pagesRecharge.actions.onInfo}
                />
            </div>
            <div><h1 className={title1AppStyles}>Confirmación</h1></div>
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
                  <span className={textResumeStyles}>Tipo de transferencia:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'uppercase'}}>{useWallet.attributesRecharge.states.paymentType}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Persona que envía:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize'}}>{useWallet.attributesRecharge.states.nameSend}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Confirmación:</span>
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'lowercase'}}>{useWallet.attributesRecharge.states.number}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    margin: '2em auto',

                  
                  }}
                >
                  <span className={textResumeStyles}>Monto de transferencia: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                            useWallet.attributesRecharge.states.amount || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            useWallet.attributesRecharge.states.currency.symbol,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                </div>
                {useWallet.attributesRecharge.states.paymentType === 'pagoMovil' &&
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '2em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles}>{`Tasa de cambio: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                      useWallet.attributesRecharge.states.currency.exchangeRate || 0,
                      siteOptions.DECIMAL_NUMBERS,
                      useWallet.attributesRecharge.states.currency.symbol,
                      siteOptions.CURRENCY_LOCATION
                    )}</span>
                  </div>

                }
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
                            useWallet.attributesRecharge.states.commission || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            useWallet.attributesRecharge.states.currency.symbol,
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
                  <span className={textResumeStyles}>Recarga en billetera: </span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                      useWallet.attributesRecharge.states.total || 0,
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
                  <span className={textResumeStyles}>Cuenta a recargar: </span>
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
              {useWallet.attributesRecharge.states.instructions !== '' &&
                  <div className={fila3}>
                      <div style={{
                        width: '10%',
                      }}>
                        <input
                            type="checkbox"
                            className={checkboxStyles}
                            checked={true}
                          />
                      </div>
                      <div style={{
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                      }} className={containerColumnCenterStyles}>
                        <span className={priceTotalStyles}>{useWallet.attributesRecharge.states.instructions}</span>
                        
                      </div>
                  </div>
                }
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
                      checked={useWallet.attributesRecharge.states.responsability}
                      onChange={() => useWallet.attributesRecharge.actions.setResponsability(!useWallet.attributesRecharge.states.responsability)}
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
                    >{'Al marcar esta casilla, declaro que conozco a la persona que realiza la transferencia y asumo total responsabilidad sobre la procedencia de los fondos transferidos. Entiendo que al reclamar esta transferencia, estoy garantizando que los fondos no provienen de actividades ilegales o fraudulentas, y me comprometo a responder por cualquier implicación legal o financiera derivada de esta transacción.'}</span>
                  </div>
                </div>
              <div style={{
                  display: 'flex',
                  margin: '1em',
                  textDecoration: 'none',
              }}>
                  <ButtonAppMobile 
                      title="Recargar"
                      containerProps={{
                        id: 'responsability-recharge-button',
                      }}
                      contentProps={{
                        onClick: add
                      }}
                  />
              </div>
              </>

          </div>
        }
      
    </>
  );
}