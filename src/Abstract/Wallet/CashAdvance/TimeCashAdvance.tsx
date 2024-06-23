import React from 'react';
import moment, { Moment } from 'moment-timezone';
import 'moment/locale/es';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { decimalFormatPriceConverter } from '../../helpers';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoCash from '../../assets/img/logo-cash.png';
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

export function TimeCashAdvance() {
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

  function addBusinessDay(date: Moment, day: number) {
      // Sumar un día
      date.add(day, 'day');

      // Si es domingo (día 0) mover al lunes (día 1)
      if (date.isoWeekday() === 7) {
          date.add(1, 'day');
      }

      return date;
  }

  // Sumar una hora
  
  let descriptionOptions1 = '';
  let descriptionOptions2 = '';
  let descriptionOptions3 = '';

  let dateOptions1 = '';
  let dateOptions2 = '';
  let dateOptions3 = '';

  const commisionOptions1 = parseFloat(useWallet.attributesCashAdvance.states.amount) * 0.03;
  const commisionOptions2 = parseFloat(useWallet.attributesCashAdvance.states.amount) * 0.015;
  const commisionOptions3 = 0;


  
if (dateVenezuela.isoWeekday() !== 7 && ((dateVenezuela.isoWeekday() === 6 && dateVenezuela.hour() <= 12) || dateVenezuela.hour() <= 14)){
    dateVenezuelaPlusOneHour.add(1, 'hour');
    descriptionOptions1 = `Para retirar hoy despúes de las ${dateVenezuelaPlusOneHour.hour() >= 10 ? dateVenezuelaPlusOneHour.format('h:mm A') : '10:00 AM'} hasta las ${dateVenezuelaPlusOneHour.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions1 = dateVenezuelaPlusOneHour.toDate().toString();

    const dateVenezuelaPlusOneBusinessDay: Moment = addBusinessDay(dateVenezuelaPlusOneDay.clone(), 1);
    descriptionOptions2 = `Para retirar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusOneBusinessDay.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();

    const dateVenezuelaPlusTwoBusinessDays: Moment = addBusinessDay(dateVenezuelaPlusTowDay.clone(), 2);
    descriptionOptions3 = `Para retirar ${dateVenezuelaPlusTwoBusinessDays.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusTwoBusinessDays.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions3 = dateVenezuelaPlusTwoBusinessDays.toDate().toString();
    
    if(dateVenezuelaPlusOneBusinessDay.isoWeekday() === dateVenezuelaPlusTwoBusinessDays.isoWeekday()){
      const dateVenezuelaPlusFourBusinessDays: Moment = addBusinessDay(dateVenezuelaPlusTowDay.clone(), 3);
      descriptionOptions3 = `Para retirar ${dateVenezuelaPlusFourBusinessDays.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusFourBusinessDays.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
      dateOptions3 = dateVenezuelaPlusFourBusinessDays.toDate().toString();
    }

  } else {
    const dateVenezuelaPlusOneHourBussinessDay: Moment = addBusinessDay(dateVenezuelaPlusOneHour.clone(), 1);
    descriptionOptions1 = `Para retirar ${dateVenezuelaPlusOneHourBussinessDay.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusOneHourBussinessDay.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions1 = dateVenezuelaPlusOneHourBussinessDay.toDate().toString();
    
    let dateVenezuelaPlusOneBusinessDay: Moment = addBusinessDay(dateVenezuelaPlusOneDay.clone(), 2);
    descriptionOptions2 = `Para retirar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusOneBusinessDay.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();

    if(dateVenezuelaPlusOneHourBussinessDay.isoWeekday() === dateVenezuelaPlusOneBusinessDay.isoWeekday()){
      dateVenezuelaPlusOneBusinessDay = addBusinessDay(dateVenezuelaPlusOneDay.clone(), 3);
      descriptionOptions2 = `Para retirar ${dateVenezuelaPlusOneBusinessDay.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusOneBusinessDay.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
      dateOptions2 = dateVenezuelaPlusOneBusinessDay.toDate().toString();
    }

    const dateVenezuelaPlusTwoBusinessDays: Moment = addBusinessDay(dateVenezuelaPlusTowDay.clone(), 3);
    descriptionOptions3 = `Para retirar ${dateVenezuelaPlusTwoBusinessDays.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusTwoBusinessDays.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
    dateOptions3 = dateVenezuelaPlusTwoBusinessDays.toDate().toString();
    
    if(dateVenezuelaPlusOneBusinessDay.isoWeekday() === dateVenezuelaPlusTwoBusinessDays.isoWeekday()){
      const dateVenezuelaPlusFourBusinessDays: Moment = addBusinessDay(dateVenezuelaPlusTowDay.clone(), 4);
      descriptionOptions3 = `Para retirar ${dateVenezuelaPlusFourBusinessDays.format('dddd D/MM/YYYY')} despúes de las 10:00 AM hasta las ${dateVenezuelaPlusFourBusinessDays.isoWeekday() === 6 ? '2:00 PM' : '4:00 PM'}`;
      dateOptions3 = dateVenezuelaPlusFourBusinessDays.toDate().toString();
    }
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
    useWallet.pagesCashAdvance.actions.onStore();
  }

  const selectOption = (index: number): void => {
    const optionsSelected = index + 1;
    useWallet.attributesCashAdvance.actions.setCommissionOption(optionsSelected.toString());
    useWallet.attributesCashAdvance.actions.setCommission(options[index].amount.toFixed(2));
    const total = parseFloat(useWallet.attributesCashAdvance.states.amount) + options[index].amount;
    useWallet.attributesCashAdvance.actions.setDate(options[index].date);
    useWallet.attributesCashAdvance.actions.setTotal(total.toFixed(2));
    useWallet.attributesCashAdvance.actions.setInstructions(options[index].title);
    useWallet.pagesCashAdvance.actions.onCheck();
  }



  return (
    <>
        
                <HeaderPageReturn 
                  title={'Gastos Administrativos'}
                  onClick={returnInit}
                  image={{
                    src: LogoCash.src,
                    backgroundColor: '#008000',
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
                              checked={useWallet.attributesCashAdvance.states.commissionOption === (index + 1).toString()}
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