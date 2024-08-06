import React, { use, useEffect } from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import { SelectApp } from '../../Select/SelectApp';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, scrollToTop } from '../../helpers';
import { Loading } from '../../Loading';
import { Error } from '../../Error/Error';
import { ButtonEditInfo } from '../../Button/ButtonEditInfo';
import LogoZelle from '../../assets/img/logo-zelle.png';
import LogoPaypal from '../../assets/img/logo-pay-pal.png';
import LogoBanesco from '../../assets/img/logo-pago-movil.png';
import { PaymentMethodsList } from '@/Abstract/List/PaymentMethodsList';
import { InputAppAmount } from '@/Abstract/Input/InputAppAmount';
import { CurrenciesAttributesReturn } from '@/Abstract/states/currencies/useGafpriApiCurrencies';
import { get } from 'http';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const textInfoStyles = css`
  font-size: 0.7em;
  font-weight: 400;
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

const fila3 = css`
  display: flex;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #e1e1e1;
  padding: 1em 0px;
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

const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
`

const priceStyles = css`
  font-size: 1em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const imageStyles = css`
  width: 80%;
  height: auto;
`

export function AmountRecharge() {
  const { useWallet, siteOptions, useError, useCurrencies, useLogin } = useTheme();
  const [modalPm, setModalPm] = React.useState(false);
  const [pagoMovilCurrency, setPagoMovilCurrency] = React.useState<CurrenciesAttributesReturn | null>(null);
  const [pagoMovilCurrencyIsReady, setPagoMovilCurrencyIsReady] = React.useState(false);
  const [mainCurrency, setMainCurrency] = React.useState<CurrenciesAttributesReturn | null>(null);
  const [mainCurrencyIsReady, setMainCurrencyIsReady] = React.useState(false);
  const pagoMovilCurrencyId = '2';



  const next = () => {
    if(useWallet.attributesRecharge.actions.validationAmountButton()){
      useWallet.pagesRecharge.actions.onAlert();
      scrollToTop();
    }
  }

  useEffect(() => {
    useWallet.attributesRecharge.actions.validationAmountButton();
  }, [useWallet.attributesRecharge.states.amount, useWallet.attributesRecharge.states.paymentType, useWallet.attributesRecharge.states.walletAccountPostsId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getPagoMovilCurrencyFetch = async () => {
      if(useLogin.data.states.token && !pagoMovilCurrencyIsReady){
        
          try{
            setPagoMovilCurrencyIsReady(false);
            const currency = await useCurrencies.api.actions.getCurrency(pagoMovilCurrencyId);
            if(currency && currency.success){
              setPagoMovilCurrency(currency.item);
              setPagoMovilCurrencyIsReady(true);
            }
          } catch (error) {
            console.log(error);
            setPagoMovilCurrency(null);
            setPagoMovilCurrencyIsReady(false);
          } 
      }
    }

    const getMainCurrencyFetch = async () => {
      if(useLogin.data.states.token){
        
          try{
            setMainCurrencyIsReady(false);
            const currency = await useCurrencies.api.actions.getCurrency(siteOptions.currencyId.toString());
            if(currency && currency.success){
              setMainCurrency(currency.item);
              setMainCurrencyIsReady(true);
            }
          } catch (error) {
            console.log(error);
            setMainCurrency(null);
            setMainCurrencyIsReady(false);
          } 
      }
    }

    getMainCurrencyFetch();
    getPagoMovilCurrencyFetch();
  }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const walletAccount = useWallet.attributes.states.walletAccount;

  const walletAccountOptions = walletAccount.map((account) => {
    return {
      value: account.postsId,
      label: account.name,
    }
  });

  walletAccountOptions.unshift({value: '', label: 'Selecciona una cuenta'});

  const walletAccountLabel = walletAccount.find((account) => account.postsId === useWallet.attributesRecharge.states.walletAccountPostsId)?.name || 'Selecciona una cuenta';

  const changePM = (pm: string) => {
    useWallet.attributesRecharge.actions.setPaymentType(pm);
    if(pm === 'pagoMovil' && pagoMovilCurrency){
      useWallet.attributesRecharge.actions.setCurrency(pagoMovilCurrency);
      useWallet.attributesRecharge.actions.setExchangeRate(parseFloat(pagoMovilCurrency.exchangeRate));
      useWallet.attributesRecharge.actions.setCommisionType(pagoMovilCurrency.commissionType);
      useWallet.attributesRecharge.actions.setCommissionRate(parseFloat(pagoMovilCurrency.commissionRate));
    }

    if(pm === 'zelle'){
      useWallet.attributesRecharge.actions.setCurrency(mainCurrency);
      useWallet.attributesRecharge.actions.setExchangeRate(1);
      useWallet.attributesRecharge.actions.setCommisionType('none');
      useWallet.attributesRecharge.actions.setCommissionRate(0);
    }

    if(pm === 'paypal'){
      useWallet.attributesRecharge.actions.setCurrency(mainCurrency);
      useWallet.attributesRecharge.actions.setExchangeRate(1);
      useWallet.attributesRecharge.actions.setCommisionType('percentage');
      useWallet.attributesRecharge.actions.setCommissionRate(8.5);
    }

    setModalPm(false);
  }

  const itemsPmList = [
    {
      id: 'pm1',
      name: 'Zelle',
      image: LogoZelle.src,
      backgroundColor: 'rgb(107 29 207)',
      checked: useWallet.attributesRecharge.states.paymentType === 'zelle',
      onClick: () => changePM('zelle')
    },
    // {
    //   id: 'pm2',
    //   name: 'PayPal',
    //   image: LogoPaypal.src,
    //   backgroundColor: '#003086',
    //   checked: useWallet.attributesRecharge.states.paymentType === 'paypal',
    //   onClick: () => changePM('paypal')
    // },
    // {
    //   id: 'pm4',
    //   name: 'Pago Movil (Bs)',
    //   image: LogoBanesco.src,
    //   backgroundColor: '#ebebeb',
    //   checked: useWallet.attributesRecharge.states.paymentType === 'pagoMovil',
    //   onClick: () => changePM('pagoMovil')
    // },
    // {
    //   id: 'pm3',
    //   name: 'Bofa a Bofa',
    //   image: LogoBofa.src,
    //   backgroundColor: '#c31e39',
    //   checked: false,
    //   onClick: () => console.log('Zelle')
    // },
    // {
    //   id: 'pm3',
    //   name: 'Chase a Chase',
    //   image: LogoChase.src,
    //   backgroundColor: '#3f6bc1',
    //   checked: false,
    //   onClick: () => console.log('Zelle')
    // },
    
  ]

  

  
  

  return (
    
    <>
    {!useWallet.attributes.states.walletAccountIsReady 
    || !pagoMovilCurrencyIsReady 
    || pagoMovilCurrency === null 
    || !mainCurrencyIsReady 
    || mainCurrency === null ? <Loading /> : 
        <>
          <div
            style = {{
              marginBottom: '200px'
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
                  borderBottom: '1px solid #e1e1e1',
                  
              }}> 
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Recarga de Saldo</h1>
                  <Link href='/billetera' style={{
                    textDecoration: 'none',
                    display: 'flex',
                  }}>
                  <FiChevronLeft 
                      className={arrowStyle}
                      onClick={useWallet.pagesRecharge.actions.returnInit}
                  />
                  </Link>
              </div>
              <div style={{
                  margin: 'auto',
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    width: '85%',
                    margin: 'auto',
                  }}>
                    <span className={textInfoTitleStyles}>Cuenta</span>
                  </div>
                  <SelectApp
                    options={walletAccountOptions}
                    value={walletAccountLabel}
                    onChange={(e) => useWallet.attributesRecharge.actions.setWalletAccountPostsId(e)}
                  />
              </div>
              <ButtonEditInfo 
                    content={
                      useWallet.attributesRecharge.states.paymentType === 'zelle' ? 'Zelle' 
                      : useWallet.attributesRecharge.states.paymentType === 'paypal' ? 'PayPal' : 'Elegir método de pago'}
                    buttonProps={{
                        buttonTitle: modalPm ? '▲' : '▼' ,
                    }}
                    generalOnclick={() => setModalPm(!modalPm)}
                />
              
              {
                modalPm && 
                <PaymentMethodsList 
                  items={itemsPmList}
                  /> 

              }
              
              
              
              
              {useWallet.attributesRecharge.states.paymentType === 'zelle' &&
                <div
                  style={{
                    border: '1px solid #ebebeb',
                    width: '90%',
                    margin: '1em auto',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1em',
                  }}>
                    <span className={textInfoStyles}>Los datos para transferencia Zelle son:</span>
                    <span className={textInfoStyles}>A nombre de: <span style={{fontWeight: 600}}>Gafpri Corp</span></span>
                    <span className={textInfoStyles}>Correo: <span style={{fontWeight: 600}}>pagos@gafpri.com</span></span>
                  </div>
                </div>
              }

              {useWallet.attributesRecharge.states.paymentType === 'paypal' &&
                <div
                  style={{
                    border: '1px solid #ebebeb',
                    width: '90%',
                    margin: '1em auto',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1em',
                  }}>
                    <span className={textInfoStyles}>Los datos para transferencia PayPal son:</span>
                    <span className={textInfoStyles}>A nombre de: <span style={{fontWeight: 600}}>Gafpri Corp</span></span>
                    <span className={textInfoStyles}>Correo: <span style={{fontWeight: 600}}>info@gafpri.com</span></span>
                  </div>
                </div>
              }

              {useWallet.attributesRecharge.states.paymentType === 'pagoMovil' &&
                <div
                  style={{
                    border: '1px solid #ebebeb',
                    width: '90%',
                    margin: '1em auto',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1em',
                  }}>
                    <span className={textInfoStyles}>{'Los datos para Pago Movil (Bs) son:'}</span>
                    <span className={textInfoStyles}>Banco: <span style={{fontWeight: 600}}>{'Banesco'}</span></span>
                    <span className={textInfoStyles}>Identificación: <span style={{fontWeight: 600}}>7.693.205</span></span>
                    <span className={textInfoStyles}>Teléfono: <span style={{fontWeight: 600}}>0414-6375128</span></span>
                  </div>
                </div>
              }

              {useWallet.attributesRecharge.states.paymentType !== '' && 
                <>  
                  <InputAppAmount
                      inputProps={{
                        placeholder: '0.00',
                        type: 'text',
                        functionChange: useWallet.attributesRecharge.actions.setAmount,
                      }}
                      amountMax={useWallet.attributesRecharge.states.paymentType === 'pagoMovil' ? 400000 : 20000}
                      symbol={useWallet.attributesRecharge.states.paymentType === 'pagoMovil' ? pagoMovilCurrency.symbol : mainCurrency.symbol}
                      title='Monto a recargar'
                      description={useWallet.attributesRecharge.states.paymentType === 'pagoMovil' ? `Tasa de cambio: ${pagoMovilCurrency.exchangeRate} ${pagoMovilCurrency.symbol} por ${mainCurrency.symbol} USD` : ''}
                  />

                    <InputAppContainer 
                      inputProps={{
                        placeholder: 'Nota interna (opcional)',
                        type: 'text',
                        value: useWallet.attributesRecharge.states.note,
                        onChange: (e) => useWallet.attributesRecharge.actions.changeNote(e.target.value)
                      }}
                      containerStyles={{
                        margin: '1em auto'
                      }}
                    />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '85%',
                      margin: '2em auto',

                    
                    }}
                  >
                    <span className={textResumeStyles}>{`Cargos Administrativos${useWallet.attributesRecharge.states.paymentType === 'paypal' ? ' (8.5 %):' : ':'} `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                              useWallet.attributesRecharge.states.commission || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesRecharge.states.paymentType === 'pagoMovil' ? pagoMovilCurrency.symbol : mainCurrency.symbol,
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
                    <span className={textResumeStyles}>{`Recarga en Billetera: `}</span>
                    <span className={textResumeStyles} style={{fontWeight: '600'}}>{
                        decimalFormatPriceConverter(
                              useWallet.attributesRecharge.states.total || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              mainCurrency.symbol,
                              siteOptions.CURRENCY_LOCATION
                        )
                    }</span>
                  </div>
                  <div style={{
                      display: 'flex',
                      margin: '1em',
                      textDecoration: 'none',
                  }}>
                      <ButtonAppMobile 
                          title="Siguiente"
                          containerProps={{
                            id: 'amount-recharge-button',
                            onClick: next
                          }}
                      />
                  </div>
                </>
              }
          
          
          </div>
        </>
      }
    </>
  );
}