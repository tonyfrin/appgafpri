import React, { use, useEffect } from 'react';
import moment, { Moment } from 'moment-timezone';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { SelectApp } from '../../Select/SelectApp';
import { decimalFormatPriceConverter, formatPhoneNumberVzla, scrollToTop } from '../../helpers';
import { InputAppAmount } from '../../Input/InputAppAmount';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoPagoMovil from '../../assets/img/logo-pago-movil.png';
import { Loading } from '@/Abstract/Loading';
import { describe } from 'node:test';
moment.locale('es');

const textResumeStyles = css`
  font-size: 0.7em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
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

const fila3 = css`
  border: 2px solid rgb(234, 234, 234);
  border-radius: 10px;
  padding: 1em 2%;
  display: flex;
  width: 80%;
  margin: auto;
  align-items: center;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
    z-index: 996;
    display: flex;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
`

const textInfoTitleStyles = css`
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #9e9e9e;
`

const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
`

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

type account = {
  id: string;
  name: string;
  balance: string;
}

export function AmountTransfertPagoMovil() {
  const { useWallet, siteOptions } = useTheme();

  function addDay(date: Moment, day: number) {
    // Sumar un día
    date.add(day, 'day');

    return date;
}


  useEffect(() => {
    const currentTime = new Date();
    const dateMoment = moment(currentTime);
    const datePlusOneHour = moment(currentTime);
    const dateVenezuela = dateMoment.tz('America/Caracas');
    const dateVenezuelaPlusOneHour = datePlusOneHour.tz('America/Caracas');
    let descriptionOptions1 = '';
    let dateOptions1 = '';

    if (dateVenezuela.hour() >= 8 && dateVenezuela.hour() <= 18){
      dateVenezuelaPlusOneHour.add(1, 'hour');
      descriptionOptions1 = `Para procesar hoy entre ${dateVenezuela.format('h:mm A')} y las ${dateVenezuelaPlusOneHour.format('h:mm A')}`;
      dateOptions1 = dateVenezuela.toDate().toString();

    } else if(dateVenezuela.hour() < 8){
      descriptionOptions1 = `Para procesar hoy entre las 8:00 AM y las 9:00 AM`;
      dateOptions1 = dateVenezuela.toDate().toString();
      
    } else if(dateVenezuela.hour() > 18){
      const dateVenezuelaPlusOneDay: Moment = addDay(dateVenezuela.clone(), 1);
      descriptionOptions1 = `Para procesar ${dateVenezuelaPlusOneDay.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 9:00 AM`;
      dateOptions1 = dateVenezuelaPlusOneDay.toDate().toString();
    }

    useWallet.attributesTransfersPagoMovil.actions.setDate(dateOptions1);
    useWallet.attributesTransfersPagoMovil.actions.setInstructions(descriptionOptions1);
  }, []); // eslint-disable-line
  
  const accounts: account[] = [];

  useWallet.attributes.states.walletAccount.forEach((account) => {
    accounts.push({
      id: account.postsId,
      name: account.name,
      balance: account.available,
    });
  });

  const accountOptions = accounts.map((account) => {
    return { value: account.id, label: account.name };
  });

  accountOptions.unshift({ value: '', label: 'Selecciona una cuenta' });

  const labelAccount = accountOptions.find(option => option.value === useWallet.attributesTransfers.states.account?.id)?.label || 'Selecciona una cuenta';

  const changeAccount = (id: string): void => {
    const newAccount = accounts.find((account) => `${account.id}` === `${id}`);
    if (newAccount) {
        useWallet.attributesTransfersPagoMovil.actions.setAccount(newAccount);
    } else{
        useWallet.attributesTransfersPagoMovil.actions.setAccount(null);
    }
  };

  const returnToBeneficiary = () => {
    useWallet.pagesTransfersPagoMovil.actions.onBeneficiary();
    useWallet.attributesTransfersPagoMovil.actions.setBeneficiary(null);
    useWallet.attributesTransfersPagoMovil.actions.setFindValue('');
    useWallet.attributesTransfersPagoMovil.actions.setAmount('');
    useWallet.attributesTransfersPagoMovil.actions.setChange('');
  }

  useEffect(() => {
    useWallet.attributesTransfersPagoMovil.actions.validationButtonAmount();
  }, [useWallet.attributesTransfersPagoMovil.states.amount, useWallet.attributesTransfersPagoMovil.states.account]); // eslint-disable-line

  const next = (): void => {
    if (useWallet.attributesTransfersPagoMovil.actions.validationButtonAmount()) {
      useWallet.pagesTransfersPagoMovil.actions.onCheck();
      scrollToTop();
    }
  }

  if(!useWallet.attributesTransfersPagoMovil.states.currency) return <Loading />;

  const exchangeRate = parseFloat(useWallet.attributesTransfersPagoMovil.states.currency.exchangeRate);
  const commissionRate = parseFloat(useWallet.attributesTransfersPagoMovil.states.currency.commissionRate);
  const totalRate = exchangeRate + commissionRate;
  const saleCommissionRate = (totalRate * 0.03).toFixed(2);
  const totalCommissionRate = (commissionRate - parseFloat(saleCommissionRate)).toFixed(2);
  const saleTotalRate = exchangeRate + parseFloat(totalCommissionRate);


  

  const changeAmount = (value: string): void => {
    useWallet.attributesTransfersPagoMovil.actions.setAmount(value);
    const totalTransfer = parseFloat(value) * saleTotalRate;
    useWallet.attributesTransfersPagoMovil.actions.setChange(totalTransfer.toFixed(2));
  }

  return (
    <>
        
                <HeaderPageReturn 
                  title={'Indique el monto'}
                  onClick={returnToBeneficiary}
                  image={{
                    src: LogoPagoMovil.src,
                    backgroundColor: '#ebebeb',
                  }}
                />
                  
                 
          <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1em 0px 400px 0px',
          }}
        >
          <div
            style={{
              margin: '0.5em auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>Enviar:</h1>
          </div>
          <InputAppAmount
              inputProps={{
                placeholder: '0.00',
                type: 'text',
                functionChange: changeAmount,
              }}
              amountMax={20000}
              symbol={siteOptions.CURRENCY_SYMBOL}
              title='Monto a Transferir'
          />
          <div>


                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '1em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles}>{`Tasa de Cambio: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                              exchangeRate || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesTransfersPagoMovil.states.currency?.symbol || siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '1em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles}>{`Retorno de Gastos Administrativo: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                              totalCommissionRate || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesTransfersPagoMovil.states.currency?.symbol || siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '1em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles}>{`Total tasa de $ USD a Bs.: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{
                        decimalFormatPriceConverter(
                          saleTotalRate || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesTransfersPagoMovil.states.currency?.symbol || siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                        )
                    }</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '2em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles} style={{fontWeight: '600', fontSize: '1em'}}>{`Total transferencia: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600', fontSize: '1em'}}>{
                        decimalFormatPriceConverter(
                          useWallet.attributesTransfersPagoMovil.states.change || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesTransfersPagoMovil.states.currency?.symbol || siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                        )
                    }</span>
                  </div>
          </div>
          {useWallet.attributesTransfersPagoMovil.states.instructions !== '' &&
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
                  <span className={priceTotalStyles}>{useWallet.attributesTransfersPagoMovil.states.instructions}</span>
                  
                </div>
            </div>
          }
          <InputAppContainer 
                inputProps={{
                  placeholder: 'Nota interna (opcional)',
                  type: 'text',
                  value: useWallet.attributesTransfersPagoMovil.states.note,
                  onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.changeNote(e.target.value)
                }}
                containerStyles={{
                  customStyles: `
                  width: 95%; 
                  margin: 1em auto;`
                }}
          />
          <div
            style={{
              margin: '0.5em auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>a</h1>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', 
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '100%',
              background: '#324d7f',
              margin: '0 auto',
              display: 'flex',
            }}>
              <span style={{
                color: '#FFF',
                fontSize: '1.5em',
                margin: 'auto',
                textTransform: 'uppercase',
              }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name.substring(0, 1)}</span>
            </div>
          </div>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '1em', fontWeight: 600}} className={title1AppStyles}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name}</h1>
          </div>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 600}} className={title1AppStyles}>
              {useWallet.attributesTransfersPagoMovil.states.beneficiary?.phone && formatPhoneNumberVzla(useWallet.attributesTransfersPagoMovil.states.beneficiary.phone)}
            </h1>
          </div>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 600}} className={title1AppStyles}>
              {useWallet.attributesTransfersPagoMovil.states.beneficiary?.bankName}
            </h1>
          </div>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 600}} className={title1AppStyles}>
              {useWallet.attributesTransfersPagoMovil.states.beneficiary?.accountNumber}
            </h1>
          </div>
          <div style={{
                margin: 'auto',
                padding: '0px',
                display: 'flex',
                flexDirection: 'column',
                width: '95%'
              }}>
                <div style={{
                  width: '85%',
                  margin: 'auto',
                  textAlign: 'center'
                }}>
                  <span className={textInfoTitleStyles}>desde:</span>
                </div>
                <SelectApp
                  options={accountOptions}
                  value={labelAccount}
                  onChange={(e) => changeAccount(e)}
                />
                <div style={{
                  width: '85%',
                  margin: 'auto',
                  textAlign: 'center'
                }}>
                  {useWallet.attributesTransfersPagoMovil.states.account && 
                    <span className={textInfoTitleStyles} style={{
                      textAlign: 'center',
                      color: '#000'
                    }}>Saldo disponible: {decimalFormatPriceConverter(
                      useWallet.attributesTransfersPagoMovil.states.account?.balance || 0,
                      siteOptions.DECIMAL_NUMBERS,
                      siteOptions.CURRENCY_SYMBOL,
                      siteOptions.CURRENCY_LOCATION
                    )}</span>
                  }
                </div>
            </div>
        </div>
        <div className={containerButtonCheckOutStyle}>
            <ButtonAppMobile 
                title="Cancelar"
                containerStyles={{
                    width: '45%',
                    backgroundColor: '#c12429'
                }}
                contentStyles={{
                    fontSize: '1.2em',
                    padding: '0.9em',
                }}
                containerProps={{
                  onClick: () => useWallet.pagesTransfersPagoMovil.actions.returnInit()
                
                }}
            />
            <ButtonAppMobile 
                title="Enviar"
                containerStyles={{
                    width: '45%'
                }}
                contentStyles={{
                    fontSize: '1.2em',
                    padding: '0.9em',
                }}
                containerProps={{
                  onClick: () => next(),
                  id: 'amount-button'
                }}
            />
        </div>
    </>
  );
}