import React, { useState } from 'react';
import { SingleValue } from 'react-select';
import {
  changeSelect,
  SelectDefault,
  Countries,
  CITY_DEFAULT,
  STATE_COUNTRY_DEFAULT,
  COUNTRY_DEFAULT,
  UseCurrenciesReturn,
  generalValidationAddress1,
  generalValidationAddress2,
  generalValidationButtonNext,
  generalValidationEmail,
  generalValidationName,
  generalValidationPhone,
  generalValidationPostCode,
  generalValidationSelectCity,
  generalValidationSelectCountry,
  generalValidationSelectCurrencies,
  generalValidationSelectCurrenciesDecimalNumbers,
  generalValidationSelectCurrenciesLocations,
  generalValidationSelectCurrenciesSeparator,
  generalValidationSelectStateCountry,
  generalValidationSelectTaxes,
  generalValidationTypeDocumentIdDigit,
  generalValidationTypeDocumentIdIndex,
  generalValidationWebSite,
  generalChangeAddress,
  generalChangeCityStateCountry,
  generalChangeDocumentIdDigit,
  generalChangeDocumentIdIndex,
  generalChangeEmail,
  generalChangeName,
  generalChangePostCode,
  generalChangeStateCountryOptions,
  generalChangePhone,
  generalChangeCurrenciesId,
  generalChangeType,
  generalChangeCurrenciesDecimalNumbers,
  generalChangeTaxes,
  generalChangeWebSite,
  Cities,
} from 'gafprilibui';
import { SitesAttributesReturn } from './useGafpriApiSites';


export type UseGafpriAttributesSitesReturn = {
  states: {

    name: string;
    nameValid: boolean;

    tradename: string;
    tradenameValid: boolean;

    documentIndex: string;
    documentIndexValid: boolean;
    documentIndexDefault: SelectDefault;
    documentIndexOptions: SelectDefault[];

    documentNumber: string;
    documentNumberValid: boolean;

    address1: string;
    address1Valid: boolean;

    address2: string;
    address2Valid: boolean;

    city: string;
    cityValid: boolean;
    cityDefault: SelectDefault;
    cityOptions: SelectDefault[];

    state: string;
    stateCountryValid: boolean;
    stateCountryDefault: SelectDefault;
    stateCountryOptions: SelectDefault[];

    country: string;
    countryValid: boolean;
    countryDefault: SelectDefault;
    countryOptions: SelectDefault[];

    postCode: string;
    postCodeValid: boolean;

    email: string;
    emailValid: boolean;

    phone: string;
    phoneValid: boolean;

    currenciesId: number;
    currenciesIdValid: boolean;
    currenciesIdDefault: SelectDefault;
    currenciesIdOptions: SelectDefault[];

    currencyLocation: string;
    currencyLocationValid: boolean;
    currencyLocationDefault: SelectDefault;
    currencyLocationOptions: SelectDefault[];

    thousandsSeparator: string;
    decimalSeparator: string;
    separatorValid: boolean;
    separatorDefault: SelectDefault;
    separatorOptions: SelectDefault[];

    decimalNumbers: number;
    decimalNumbersValid: boolean;
    decimalNumbersDefault: SelectDefault;
    decimalNumbersOptions: SelectDefault[];

    taxes: boolean;
    taxesValid: boolean;
    taxesDefault: SelectDefault;
    taxesOptions: SelectDefault[];

    host: string;
    hostValid: boolean;

    userId: string;
    sites: SitesAttributesReturn[];

    permissions: string;
    permissionsValid: boolean;
    permissionsOptions: SelectDefault[];

    currentId: number;
  };
  actions: {
    
    changeName: (name: string) => void;
    changeTradename: (tradename: string) => void;
    changeDocumentIndex: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeDocumentNumber: (documentNumber: string) => void;
    changeAddress1: (address1: string) => void;
    changeAddress2: (address2: string) => void;
    changeCity: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeStateCountry: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    setStateCountryDefault: (options: SelectDefault) => void;
    setStateCountry: (value: string) => void;
    changeStateCountryOptions: () => void;
    changeCountry: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    setCountryDefault: (options: SelectDefault) => void;
    setCountry: (value: string) => void;
    changePostCode: (postCode: string) => void;
    changeEmail: (email: string) => void;
    changePhone: (phone: string) => void;
    changeCurrenciesId: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeCurrencyLocation: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeSeparator: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeDecimalNumbers: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeTaxes: (
      options: SingleValue<{ value: string; label: string }>
    ) => void;
    changeHost: (host: string) => void;
    validationButtonNext: () => boolean;
    validationButtonNextUpdate: () => boolean;

    validationName: (value: string) => boolean;
    validationTradename: (value: string) => boolean;
    validationDocumentIndex: (value: string) => boolean;
    validationDocumentNumber: (value: string) => boolean;
    validationAddress1: (value: string) => boolean;
    validationAddress2: (value: string) => boolean;
    validationCity: (value: string) => boolean;
    validationStateCountry: (value: string) => boolean;
    validationCountry: (value: string) => boolean;

    validationPostCode: (value: string) => boolean;
    validationEmail: (value: string) => boolean;
    validationPhone: (value: string) => boolean;
    validationCurrenciesId: (value: string) => boolean;
    validationCurrencyLocation: (value: string) => boolean;
    validationSeparator: (value: string) => boolean;
    validationDecimalNumbers: (value: string) => boolean;
    validationTaxes: (value: string) => boolean;
    validationHost: (value: string) => boolean;

    setUserId: (value: string) => void;
    setSites: (value: SitesAttributesReturn[]) => void;
    pushSites: (value: SitesAttributesReturn) => void;
    handleUpdatedSite: (itemUpdate: SitesAttributesReturn) => void;
    infoReset: () => void;
    validationPermission: (value: string) => boolean;
    changePermissions: (value: string) => void;
    validationButtonNextEmployees: () => boolean;
    setCurrentId: (value: number) => void;
  };
};

export type UseGafpriAttributesSitesProps = {
  useCurrencies: UseCurrenciesReturn;
};

export const useGafpriAttributesSites = ({
  useCurrencies,
}: UseGafpriAttributesSitesProps): UseGafpriAttributesSitesReturn => {
  const [sites, setSites] = useState<SitesAttributesReturn[]>([]);
  const pushSites = (value: SitesAttributesReturn): void => {
    setSites([...sites, value]);
  }
  const [isReset, setIsReset] = useState(true);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);

  const [tradename, setTradename] = useState('');
  const [tradenameValid, setTradenameValid] = useState(false);

  const [documentIndex, setDocumentIndex] = useState('');
  const [documentIndexValid, setDocumentIndexValid] = useState(false);
  const [documentIndexDefault, setDocumentIndexDefault] =
    useState<SelectDefault>({ value: '', label: 'Elija el tipo de Documento' });
  const documentIndexOptions = [
    { value: '', label: 'Elija el tipo de Documento' },
    { label: 'J', value: 'J' },
    { label: 'V', value: 'V' },
    { label: 'G', value: 'G' },
    { label: 'No Aplica', value: 'null' },
  ];

  const [documentNumber, setDocumentNumber] = useState('');
  const [documentNumberValid, setDocumentNumberValid] = useState(false);

  const [address1, setAddress1] = useState('');
  const [address1Valid, setAddress1Valid] = useState(false);

  const [address2, setAddress2] = useState('');
  const [address2Valid, setAddress2Valid] = useState(true);

  const [city, setCity] = useState(CITY_DEFAULT.value);
  const [cityValid, setCityValid] = useState(true);
  const [cityDefault, setCityDefault] = useState<SelectDefault>(CITY_DEFAULT);
  const cityOptions: SelectDefault[] = [];

  Cities[0]['VE'][0]['VE-V'].forEach((item) => {
    Object.keys(item).forEach((key) => {
      cityOptions.push({ value: item[key], label: item[key] });
    });
  });


  const [state, setStateCountry] = useState(STATE_COUNTRY_DEFAULT.value);
  const [stateCountryValid, setStateCountryValid] = useState(true);
  const [stateCountryDefault, setStateCountryDefault] = useState<SelectDefault>(
    STATE_COUNTRY_DEFAULT
  );
  const [stateCountryOptions, setStateCountryOptions] = useState<
    SelectDefault[]
  >([]);

  const [country, setCountry] = useState(COUNTRY_DEFAULT.value);
  const [countryValid, setCountryValid] = useState(true);
  const [countryDefault, setCountryDefault] =
    useState<SelectDefault>(COUNTRY_DEFAULT);
  const countryOptions: SelectDefault[] = [];

  Countries.forEach((item) => {
    Object.keys(item).forEach((key) => {
      countryOptions.push({ value: key, label: item[key] });
    });
  });

  const [postCode, setPostCode] = useState('');
  const [postCodeValid, setPostCodeValid] = useState(true);

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);

  const [currenciesId, setCurrenciesId] = useState(0);
  const [currenciesIdValid, setCurrenciesIdValid] = useState(false);
  const [currenciesIdDefault, setCurrenciesIdDefault] = useState<SelectDefault>(
    { value: '', label: 'Elija la moneda del Sitio' }
  );

  const currenciesIdOptions: SelectDefault[] = [{ value: '', label: 'Elija la moneda del Sitio' }];

  useCurrencies.states.currencies.data.items?.map((item) => {
    currenciesIdOptions.push({ label: `${item.name} ${item.symbol}`, value: `${item.id}` });
    return null;
  }) || [];

  const [currencyLocation, setCurrencyLocation] = useState('left');
  const [currencyLocationValid, setCurrencyLocationValid] = useState(true);
  const [currencyLocationDefault, setCurrencyLocationDefault] =
    useState<SelectDefault>({
      value: '',
      label: 'Elija la ubicación del símbolo de la moneda',
    });
  const currencyLocationOptions: SelectDefault[] = [
    { label: 'Izquierda', value: 'left' },
    { label: 'Derecha', value: 'right' },
  ];

  const [thousandsSeparator, setThousandsSeparator] = useState(',');
  const [decimalSeparator, setDecimalSeparator] = useState('.');
  const [separatorValid, setSeparatorValid] = useState(true);
  const [separatorDefault, setSeparatorDefault] = useState<SelectDefault>({
    value: '',
    label: 'Selecciona los separadores de la moneda',
  });
  const separatorOptions = [
    { label: 'Miles: " . "    Decimal: " , "', value: '.' },
    { label: 'Miles: " , "    Decimal: " . "', value: ',' },
  ];
  
  const [permissions, setPermissions] = useState<string>('');
  const [permissionsValid, setPermissionsValid] = useState(false);
  const permissionsOptions: SelectDefault[] = [
    { label: 'Selecciona nivel de Autorización', value: '' },
    { label: 'Acceso total', value: 'full-wallet-access' },
    { label: 'Solo Recargas', value: 'wallet-recharge' },
  ];

  const setSeparator = (value: string): void => {
    if (value === '.') {
      setThousandsSeparator('.');
      setDecimalSeparator(',');
    } else if (value === ',') {
      setThousandsSeparator(',');
      setDecimalSeparator('.');
    }
  };

  const [decimalNumbers, setDecimalNumbers] = useState(2);
  const [decimalNumbersValid, setDecimalNumbersValid] = useState(true);
  const [decimalNumbersDefault, setDecimalNumbersDefault] =
    useState<SelectDefault>({
      value: '',
      label: 'Selecciona el número de decimales',
    });
  const decimalNumbersOptions: SelectDefault[] = [
    { label: '0', value: '0' },
    { label: '2', value: '2' },
  ];

  const [taxes, setTaxes] = useState(false);
  const [taxesValid, setTaxesValid] = useState(true);
  const [taxesDefault, setTaxesDefault] = useState<SelectDefault>({
    value: '',
    label: 'Selecciona la opción para los impuestos',
  });
  const taxesOptions: SelectDefault[] = [
    { label: 'Si trabaja con impuestos', value: 'true' },
    { label: 'No trabaja con impuestos', value: 'false' },
  ];

  const [host, setHost] = useState('');
  const [hostValid, setHostValid] = useState(false);

  const [currentId, setCurrentId] = useState(0);

  const infoReset = (): void => {
    setUserId('');

    setName('');
    setNameValid(false);

    setTradename('');
    setTradenameValid(false);

    setDocumentIndex('');
    setDocumentIndexValid(false);
    setDocumentIndexDefault({ value: '', label: 'Elija el tipo de Documento' });

    setDocumentNumber('');
    setDocumentNumberValid(false);

    setAddress1('');
    setAddress1Valid(false);

    setAddress2('');
    setAddress2Valid(true);

    setCity(CITY_DEFAULT.value);
    setCityValid(true);
    setCityDefault(CITY_DEFAULT);

    setStateCountry(STATE_COUNTRY_DEFAULT.value);
    setStateCountryValid(true);
    setStateCountryDefault(STATE_COUNTRY_DEFAULT);

    setCountry(COUNTRY_DEFAULT.value);
    setCountryValid(true);
    setCountryDefault(COUNTRY_DEFAULT);

    setPostCode('');
    setPostCodeValid(true);

    setEmail('');
    setEmailValid(true);

    setPhone('');
    setPhoneValid(true);

    setCurrenciesId(0);
    setCurrenciesIdValid(false);
    setCurrenciesIdDefault({ value: '', label: 'Elija la moneda del Sitio' });

    setCurrencyLocation('left');
    setCurrencyLocationValid(true);
    setCurrencyLocationDefault({
      value: '',
      label: 'Elija la ubicación del símbolo de la moneda',
    });

    setThousandsSeparator(',');
    setDecimalSeparator('.');
    setSeparatorValid(true);
    setSeparatorDefault({
      value: '',
      label: 'Selecciona los separadores de la moneda',
    });

    setDecimalNumbers(2);
    setDecimalNumbersValid(true);
    setDecimalNumbersDefault({
      value: '',
      label: 'Selecciona el número de decimales',
    });

    setTaxes(false);
    setTaxesValid(true);
    setTaxesDefault({
      value: '',
      label: 'Selecciona la opción para los impuestos',
    });

    setHost('');
    setHostValid(false);

    setPermissions('');
    setPermissionsValid(false);

    setCurrentId(0);
    
  };

 
  // Funciones de Validacion
  const validationButtonNext = (): boolean => {
    return generalValidationButtonNext({
      validations: [
        nameValid,
        tradenameValid,
        documentIndexValid,
        documentNumberValid,
        address1Valid,
        address2Valid,
        cityValid,
        stateCountryValid,
        postCodeValid,
        countryValid,
        emailValid,
        phoneValid,
        currenciesIdValid,
        currencyLocationValid,
        separatorValid,
        decimalNumbersValid,
        taxesValid,
        hostValid,
      ],
      inputId: 'sites'
    });
  };

  const validationButtonNextEmployees = (): boolean => {
    return generalValidationButtonNext({
      validations: [
        userId !== '',
        permissionsValid,
      ],
      inputId: 'sites-employees'
    });
  }

  const validationButtonNextUpdate = (): boolean => {
    return generalValidationButtonNext({
      validations: [
        nameValid,
        tradenameValid,
        address1Valid,
        address2Valid,
        postCodeValid,
        emailValid,
        phoneValid,
        hostValid,
      ],
      inputId: 'sites-update'
    });
  };

  const validationName = (value: string): boolean => {
    return generalValidationName({
      value,
      setValid: setNameValid,
      currentValid: nameValid,
    });
  };

  const validationTradename = (value: string): boolean => {
    return generalValidationName({
      value,
      setValid: setTradenameValid,
      currentValid: tradenameValid,
      inputId: 'tradename',
    });
  };

  const validationDocumentIndex = (value: string): boolean => {
    return generalValidationTypeDocumentIdIndex({
      value,
      setValid: setDocumentIndexValid,
      currentValid: documentIndexValid,
    });
  };

  const validationDocumentNumber = (value: string): boolean => {
    return generalValidationTypeDocumentIdDigit({
      value,
      setValid: setDocumentNumberValid,
      currentValid: documentNumberValid,
    });
  };

  const validationAddress1 = (value: string): boolean => {
    return generalValidationAddress1({
      value,
      setValid: setAddress1Valid,
      currentValid: address1Valid,
    });
  };

  const validationAddress2 = (value: string): boolean => {
    return generalValidationAddress2({
      value,
      setValid: setAddress2Valid,
      currentValid: address2Valid,
    });
  };

  const validationCity = (value: string): boolean => {
    return generalValidationSelectCity({
      value,
      setValid: setCityValid,
      currentValid: cityValid,
    });
  };

  const validationStateCountry = (value: string): boolean => {
    return generalValidationSelectStateCountry({
      value,
      setValid: setStateCountryValid,
      currentValid: stateCountryValid,
    });
  };

  const validationCountry = (value: string): boolean => {
    return generalValidationSelectCountry({
      value,
      setValid: setCountryValid,
      currentValid: countryValid,
    });
  };

  const validationPostCode = (value: string): boolean => {
    return generalValidationPostCode({
      value,
      setValid: setPostCodeValid,
      currentValid: postCodeValid,
    });
  };

  const validationEmail = (value: string): boolean => {
    return generalValidationEmail({
      value,
      setValid: setEmailValid,
      currentValid: emailValid,
      required: true,
    });
  };

  const validationPhone = (value: string): boolean => {
    return generalValidationPhone({
      value,
      setValid: setPhoneValid,
      currentValid: phoneValid,
      required: true,
    });
  };

  const validationCurrenciesId = (value: string): boolean => {
    return generalValidationSelectCurrencies({
      value,
      setValid: setCurrenciesIdValid,
      currentValid: currenciesIdValid,
    });
  };

  const validationCurrencyLocation = (value: string): boolean => {
    return generalValidationSelectCurrenciesLocations({
      value,
      setValid: setCurrencyLocationValid,
      currentValid: currencyLocationValid,
    });
  };

  const validationSeparator = (value: string): boolean => {
    return generalValidationSelectCurrenciesSeparator({
      value,
      setValid: setSeparatorValid,
      currentValid: separatorValid,
    });
  };

  const validationDecimalNumbers = (value: string): boolean => {
    return generalValidationSelectCurrenciesDecimalNumbers({
      value,
      setValid: setDecimalNumbersValid,
      currentValid: decimalNumbersValid,
    });
  };

  const validationTaxes = (value: string): boolean => {
    return generalValidationSelectTaxes({
      value,
      setValid: setTaxesValid,
      currentValid: taxesValid,
    });
  };

  const validationHost = (value: string): boolean => {
    return generalValidationWebSite({
      newValue: value,
      setValid: setHostValid,
      currentValid: hostValid,
    });
  };

  const validationPermission = (value: string): boolean => {
    const valid = value !== '';
    if(valid !== permissionsValid){
      setPermissionsValid(valid);
    }
    return valid;
  }

  // Funciones de cambios
  const changeName = (value: string): void => {
    generalChangeName({
      value,
      validation: validationName,
      setValue: setName,
    });
  };

  const changeTradename = (value: string): void => {
    generalChangeName({
      value,
      validation: validationTradename,
      setValue: setTradename,
    });
  };

  const changeDocumentIndex = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeDocumentIdIndex({
      options,
      validation: validationDocumentIndex,
      setDefault: setDocumentIndexDefault,
      setValue: setDocumentIndex,
    });
  };

  const changeDocumentNumber = (newDocument: string): void => {
    generalChangeDocumentIdDigit({
      value: newDocument,
      validation: validationDocumentNumber,
      setValue: setDocumentNumber,
    });
  };

  const changeAddress1 = (value: string): void => {
    generalChangeAddress({
      value,
      validation: validationAddress1,
      setValue: setAddress1,
    });
  };

  const changeAddress2 = (value: string): void => {
    generalChangeAddress({
      value,
      validation: validationAddress2,
      setValue: setAddress2,
    });
  };

  const changeCity = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeCityStateCountry({
      options,
      validation: validationCity,
      setDefault: setCityDefault,
      setValue: setCity,
      setIsReset,
    });
  };

  const changeStateCountry = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeCityStateCountry({
      options,
      validation: validationStateCountry,
      setDefault: setStateCountryDefault,
      setValue: setStateCountry,
      setIsReset,
    });
  };

  const changeStateCountryOptions = React.useCallback((): void => {
    generalChangeStateCountryOptions({
      country,
      setStateCountryDefault,
      setStateCountry,
      setStateCountryOptions,
      isReset,
    });
  }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeCountry = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeCityStateCountry({
      options,
      validation: validationCountry,
      setDefault: setCountryDefault,
      setValue: setCountry,
      setIsReset,
    });
  };

  const changePostCode = (newPostCode: string): void => {
    generalChangePostCode({
      value: newPostCode,
      validation: validationPostCode,
      setValue: setPostCode,
    });
  };

  const changeEmail = (inputValue: string): void => {
    generalChangeEmail({
      value: inputValue,
      validation: validationEmail,
      setValue: setEmail,
    });
  };

  const changePhone = (newPhone: string): void => {
    return generalChangePhone({
      value: newPhone,
      validation: validationPhone,
      setValue: setPhone,
    });
  };

  const changeCurrenciesId = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeCurrenciesId({
      options,
      validation: validationCurrenciesId,
      setDefault: setCurrenciesIdDefault,
      setValue: setCurrenciesId,
    });
    const value = options ? parseInt(options.value, 10) : 0;
    const label = options?.label || '';
    const newOptions = { value, label };
    changeSelect({
      newValue: newOptions,
      validation: validationCurrenciesId,
      setDefault: setCurrenciesIdDefault,
      setValue: setCurrenciesId,
    });
  };

  const changeCurrencyLocation = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeType({
      options,
      validation: validationCurrencyLocation,
      setDefault: setCurrencyLocationDefault,
      setValue: setCurrencyLocation,
    });
  };

  const changeSeparator = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeType({
      options,
      validation: validationSeparator,
      setDefault: setSeparatorDefault,
      setValue: setSeparator,
    });
  };

  const changeDecimalNumbers = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeCurrenciesDecimalNumbers({
      options,
      validation: validationDecimalNumbers,
      setDefault: setDecimalNumbersDefault,
      setValue: setDecimalNumbers,
    });
  };

  const changeTaxes = (
    options: SingleValue<{ value: string; label: string }>
  ): void => {
    generalChangeTaxes({
      options,
      validation: validationTaxes,
      setDefault: setTaxesDefault,
      setValue: setTaxes,
    });
  };

  const changeHost = (value: string): void => {
    generalChangeWebSite({
      value,
      validation: validationHost,
      setValue: setHost,
    });
  };

  const changePermissions = (value: string): void => {
    validationPermission(value);
    setPermissions(value);
  }

  const handleUpdatedSite = (itemUpdate: SitesAttributesReturn): void => {
    setSites((prevState) => {
      const updatedItems =
        prevState.map((item) =>
          `${item.id}` === `${itemUpdate.id}` ? itemUpdate : item
        ) || [];
      return updatedItems;
    });
  };


  const states = {
    name,
    nameValid,

    tradename,
    tradenameValid,

    documentIndex,
    documentIndexValid,
    documentIndexDefault,
    documentIndexOptions,

    documentNumber,
    documentNumberValid,

    address1,
    address1Valid,

    address2,
    address2Valid,

    city,
    cityValid,
    cityDefault,
    cityOptions,

    state,
    stateCountryValid,
    stateCountryDefault,
    stateCountryOptions,

    country,
    countryValid,
    countryDefault,
    countryOptions,

    postCode,
    postCodeValid,

    email,
    emailValid,

    phone,
    phoneValid,

    currenciesId,
    currenciesIdValid,
    currenciesIdDefault,
    currenciesIdOptions,

    currencyLocation,
    currencyLocationValid,
    currencyLocationDefault,
    currencyLocationOptions,

    thousandsSeparator,
    decimalSeparator,
    separatorValid,
    separatorDefault,
    separatorOptions,

    decimalNumbers,
    decimalNumbersValid,
    decimalNumbersDefault,
    decimalNumbersOptions,

    taxes,
    taxesValid,
    taxesDefault,
    taxesOptions,

    host,
    hostValid,
    userId,
    sites,
    permissions,
    permissionsValid,
    permissionsOptions,
    currentId,
  };

  // Define las acciones necesarias para los atributos de Site
  const actions = {
    changeName,
    changeTradename,
    changeDocumentIndex,
    changeDocumentNumber,
    changeAddress1,
    changeAddress2,
    changeCity,
    changeStateCountry,
    setStateCountryDefault,
    setStateCountry,
    changeCountry,
    setCountryDefault,
    changeStateCountryOptions,
    setCountry,
    changePostCode,
    changeEmail,
    changePhone,
    changeCurrenciesId,
    changeCurrencyLocation,
    changeSeparator,
    changeDecimalNumbers,
    changeTaxes,
    changeHost,
    validationButtonNext,
    validationButtonNextUpdate,

    validationName,
    validationTradename,
    validationDocumentIndex,
    validationDocumentNumber,
    validationAddress1,
    validationAddress2,
    validationCity,
    validationStateCountry,
    validationCountry,
    validationPostCode,
    validationEmail,
    validationPhone,
    validationCurrenciesId,
    validationCurrencyLocation,
    validationSeparator,
    validationDecimalNumbers,
    validationTaxes,
    validationHost,

    setUserId,
    setSites,
    pushSites,
    handleUpdatedSite,
    infoReset,
    validationPermission,
    changePermissions,
    validationButtonNextEmployees,
    setCurrentId,
  };

  return {
    states,
    actions,
  };
};
