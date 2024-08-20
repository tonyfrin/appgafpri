import React from 'react';
import moment, { Moment } from 'moment-timezone';
import 'moment/locale/es';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { decimalFormatPriceConverter } from '../../helpers';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoZelle from '../../assets/img/logo-zelle.png';
moment.locale('es');


type options = {
  title: string;
  amount: number;
  date: string;
}


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

const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const fila3 = css`
  display: flex;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #e1e1e1;
  padding: 1em 0px;
  align-items: center;
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

const priceStyles = css`
  font-size: 0.8em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif; 
`

export function TimeZelle() {
  const { useWallet, siteOptions } = useTheme();

  const currentTime = new Date();
  const dateMoment = moment(currentTime);
  const datePlusOneHour = moment(currentTime);
  const datePlusOneDay = moment(currentTime);
  const datePlusTowDay = moment(currentTime);
  const dateVenezuela = dateMoment.tz('America/Caracas');
  const dateVenezuelaPlusOneHour = datePlusOneHour.tz('America/Caracas');
  const dateVenezuelaPlusOneDay = datePlusOneDay.tz('America/Caracas');
  const dateVenezuelaPlusTowDay = datePlusTowDay.tz('America/Caracas');
  
  let descriptionOptions1 = '';
  let descriptionOptions2 = '';
  let descriptionOptions3 = '';

  let dateOptions1 = '';
  let dateOptions2 = '';
  let dateOptions3 = '';

  const commisionOptions1 = parseFloat(useWallet.attributesTransfersZelle.states.amount) * 0.02;
  const commisionOptions2 = parseFloat(useWallet.attributesTransfersZelle.states.amount) * 0.01;
  const commisionOptions3 = 0;


  
  if (dateVenezuela.hour() >= 8 && dateVenezuela.hour() <= 16){
    dateVenezuelaPlusOneHour.add(2, 'hour');
    descriptionOptions1 = `Para procesar hoy entre ${dateVenezuela.format('h:mm A')} y las ${dateVenezuelaPlusOneHour.format('h:mm A')}`;
    dateOptions1 = dateVenezuelaPlusOneHour.toDate().toString();

    const dateVenezuelaPlusOneBusinessDay: Moment = dateVenezuelaPlusOneDay.add(1, 'day');
    descriptionOptions2 = `Para procesar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();

    const dateVenezuelaPlusTwoBusinessDays: Moment = dateVenezuelaPlusTowDay.add(2, 'day');
    descriptionOptions3 = `Para procesar ${dateVenezuelaPlusTwoBusinessDays.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions3 = dateVenezuelaPlusTwoBusinessDays.toDate().toString();

  } else if(dateVenezuela.hour() < 8){
    descriptionOptions1 = `Para procesar hoy entre las 8:00 AM y las 10:00 AM`;
    dateOptions1 = dateVenezuela.toDate().toString();

    const dateVenezuelaPlusOneBusinessDay: Moment = dateVenezuelaPlusOneDay.add(1, 'day');
    descriptionOptions2 = `Para procesar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();

    const dateVenezuelaPlusTwoBusinessDays: Moment = dateVenezuelaPlusTowDay.add(2, 'day');
    descriptionOptions3 = `Para procesar ${dateVenezuelaPlusTwoBusinessDays.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions3 = dateVenezuelaPlusTwoBusinessDays.toDate().toString();
    
  } else if(dateVenezuela.hour() > 16){
    dateVenezuelaPlusOneHour.add(1, 'day');
    descriptionOptions1 = `Para procesar ${dateVenezuelaPlusOneHour.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;;
    dateOptions1 = dateVenezuelaPlusOneHour.toDate().toString();

    const dateVenezuelaPlusOneBusinessDay: Moment = dateVenezuelaPlusOneDay.add(2, 'day');
    descriptionOptions2 = `Para procesar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();

    const dateVenezuelaPlusTwoBusinessDays: Moment = dateVenezuelaPlusTowDay.add(3, 'day');
    descriptionOptions3 = `Para procesar ${dateVenezuelaPlusTwoBusinessDays.format('dddd D/MM/YYYY')} entre las 8:00 AM y las 10:00 AM`;
    dateOptions3 = dateVenezuelaPlusTwoBusinessDays.toDate().toString();
  }

  const options: options[] = [
    {
      title: descriptionOptions1,
      amount: commisionOptions1,
      date: dateOptions1,
    },
    {
      title: descriptionOptions2,
      amount: commisionOptions2,
      date: dateOptions2,
    },
    {
      title: descriptionOptions3,
      amount: commisionOptions3,
      date: dateOptions3,
    }
  ]

  const returnInit = async (): Promise<void> => {
    useWallet.pagesTransfersZelle.actions.onAmount();
  }

  const selectOption = (index: number): void => {
    const optionsSelected = index + 4;
    useWallet.attributesTransfersZelle.actions.setCommissionOption(optionsSelected.toString());
    useWallet.attributesTransfersZelle.actions.setCommission(options[index].amount.toFixed(2));
    const total = parseFloat(useWallet.attributesTransfersZelle.states.amount) + options[index].amount;
    useWallet.attributesTransfersZelle.actions.setDate(options[index].date);
    useWallet.attributesTransfersZelle.actions.setTotal(total.toFixed(2));
    useWallet.attributesTransfersZelle.actions.setInstructions(options[index].title);
    useWallet.pagesTransfersZelle.actions.onCheck();
  }



  return (
    <>
        
                <HeaderPageReturn 
                  title={'Gastos Administrativos'}
                  onClick={returnInit}
                  image={{
                    src: LogoZelle.src,
                    backgroundColor: 'rgb(107 29 207)',
                  }}
                />

                <div>
                  {options.length > 0 && options.map((option, index) => (
                    <div className={fila3} key={index}>
                        <div style={{
                          width: '10%',
                        }}>
                          <input
                              type="checkbox"
                              className={checkboxStyles}
                              checked={useWallet.attributesTransfersZelle.states.commissionOption === (index + 1).toString()}
                              onChange={() => selectOption(index)}
                            />
                        </div>
                        <div style={{
                          width: '60%',
                          display: 'flex',
                          flexDirection: 'column',
                        }} className={containerColumnCenterStyles}>
                          <span className={priceTotalStyles}>{option.title}</span>
                          
                        </div>
                        <div style={{
                          width: '30%',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          
                        }}>
                          <span 
                            className={priceStyles} 
                            style={{
                              textAlign: 'right',
                              fontWeight: 600,
                              fontSize: '1em'
                            }}
                          >{decimalFormatPriceConverter(
                            option.amount || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            siteOptions.CURRENCY_SYMBOL,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                        </div>
                  
                    </div>
                  ))}
                </div>
                  
    </>
  );
}