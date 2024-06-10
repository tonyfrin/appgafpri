import React, { useState, useEffect } from 'react';
import {
  generalValidationName,
  generalValidationCurrenciesSymbol,
  generalValidationButtonNext,
  generalChangeName, 
  generalChangeCurrenciesSymbol
} from 'gafprilibui';
import { CurrenciesAttributesReturn, UseGafpriApiCurrenciesReturn } from './useGafpriApiCurrencies';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';

type State = {
  name: string;
  nameValid: boolean;

  symbol: string;
  symbolValid: boolean;

  exchangeRate: string;
  exchangeRateValid: boolean;

  commissionType: string;
  commissionTypeValid: boolean;
  commissionTypeOptions: {label: string, value: string}[];

  commissionRate: string;
  commissionRateValid: boolean;

  currentId: number;

  currencies: CurrenciesAttributesReturn[] | null;
  isReadyCurrencies: boolean;
};

type Actions = {
  changeName: (value: string) => void;
  validationName: (value: string) => void;

  changeSymbol: (value: string) => void;
  validationSymbol: (value: string) => void;

  changeExchangeRate: (value: string) => void;
  validationExchangeRate: (value: string) => boolean;

  changeCommissionType: (value: string) => void;
  validationCommissionType: (value: string) => boolean;

  changeCommissionRate: (value: string) => void;
  validationCommissionRate: (value: string) => boolean;

  validationButtonNext: () => boolean;

  setCurrentId: (value: number) => void;
  setCurrencies: (value: CurrenciesAttributesReturn[] | null) => void;
  setIsReadyCurrencies: (value: boolean) => void;

  infoReset: () => void;
  pushCurrency: (value: CurrenciesAttributesReturn) => void;
  handleUpdated: (itemUpdate: CurrenciesAttributesReturn) => void;
};

export type UseGafpriAttributesCurrenciesReturn = {
  states: State;
  actions: Actions;
};


export function useGafpriAttributesCurrencies(): UseGafpriAttributesCurrenciesReturn {
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [symbolValid, setSymbolValid] = useState(false);
  const [exchangeRate, setExchangeRate] = useState('');
  const [exchangeRateValid, setExchangeRateValid] = useState(false);
  const [commissionType, setCommissionType] = useState('');
  const commissionTypeOptions: {label: string, value: string}[] = [
    {label: 'Tipo de comisión', value: ''},
    {label: 'Porcentaje', value: 'percentage'},
    {label: 'Fijo', value: 'fixed'},
    {label: 'Sin comisión', value: 'none'},
];
  const [commissionTypeValid, setCommissionTypeValid] = useState(false);
  const [commissionRate, setCommissionRate] = useState('');
  const [commissionRateValid, setCommissionRateValid] = useState(false);

  const [currentId, setCurrentId] = useState(0);
  const [currencies, setCurrencies] = useState<CurrenciesAttributesReturn[] | null>(null); 
  const [isReadyCurrencies, setIsReadyCurrencies] = useState(false);

  const pushCurrency = (value: CurrenciesAttributesReturn): void => {
    if(currencies === null){
      setCurrencies([value]);
      return;
    }

    setCurrencies([...currencies, value]);
  }
  

  const infoReset = (): void => {
    setName('');
    setSymbol('');
    setNameValid(false);
    setSymbolValid(false);
    setExchangeRate('');
    setExchangeRateValid(false);
    setCommissionType('');
    setCommissionTypeValid(false);
    setCommissionRate('');
    setCommissionRateValid(false);
  };

  // Funciones de Validacion
  const validationName = (value: string): boolean => {
    return generalValidationName({
      value,
      setValid: setNameValid,
      currentValid: nameValid,
    });
  };

  const validationSymbol = (newValue: string): boolean => {
    const valid = newValue !== '';
    setSymbolValid(valid);
    return valid;
  };

  const validationExchangeRate = (value: string): boolean => {
    const valid = value !== '';
    setExchangeRateValid(valid);
    return valid;
  }

  const validationCommissionType = (value: string): boolean => {
    const valid = value !== '';
    setCommissionTypeValid(valid);
    return valid;
  }

  const validationCommissionRate = (value: string): boolean => {
    const valid = value !== '';
    setCommissionRateValid(valid);
    return valid;
  }

  const validationButtonNext = (): boolean => {
    return generalValidationButtonNext({
      validations: [nameValid, symbolValid, exchangeRateValid, commissionTypeValid, commissionRateValid],
      inputId: 'currencies'
    });
  };

  // Funciones de cambios
  const changeName = (value: string): void => {
    generalChangeName({
      value,
      validation: validationName,
      setValue: setName,
    });
  };

  const changeSymbol = (value: string): void => {
    generalChangeCurrenciesSymbol({
      value,
      validation: validationSymbol,
      setValue: setSymbol,
    });
  };

  const changeExchangeRate = (value: string): void => {
    validationExchangeRate(value);
    setExchangeRate(value);
  }

  const changeCommissionType = (value: string): void => {
    validationCommissionType(value);
    setCommissionType(value);
  }

  const changeCommissionRate = (value: string): void => {
    validationCommissionRate(value);
    setCommissionRate(value);
  }

  const handleUpdated = (itemUpdate: CurrenciesAttributesReturn): void => {
    setCurrencies((prevState) => {
      const updatedItems =
        prevState?.map((item) =>
          `${item.id}` === `${itemUpdate.id}` ? itemUpdate : item
        ) || [];
      return updatedItems;
    });
  };

  

  /**
   * Export
   *
   *
   */
  const states = {
    name,
    nameValid,

    symbol,
    symbolValid,

    exchangeRate,
    exchangeRateValid,

    commissionType,
    commissionTypeValid,
    commissionTypeOptions,

    commissionRate,
    commissionRateValid,

    currentId,
    currencies,
    isReadyCurrencies,
  };

  const actions = {
    changeName,
    validationName,

    changeSymbol,
    validationSymbol,

    changeExchangeRate,
    changeCommissionType,
    changeCommissionRate,

    validationExchangeRate,
    validationCommissionType,
    validationCommissionRate,

    validationButtonNext,

    setCurrentId,
    setCurrencies,
    setIsReadyCurrencies,

    infoReset,
    pushCurrency,
    handleUpdated
  };

  return {
    states,
    actions,
  };
}
