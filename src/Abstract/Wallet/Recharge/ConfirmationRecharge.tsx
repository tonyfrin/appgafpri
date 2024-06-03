import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, scrollToTop } from '../../helpers';
import { Error } from '../../Error';

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

export function ConfirmationRecharge() {
  const { useWallet, siteOptions, useError } = useTheme();
 

  const add = async () => {
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

  useEffect(() => {
    useWallet.attributesRecharge.actions.validationAmountButton();
  }, [useWallet.attributesRecharge.states.amount, useWallet.attributesRecharge.states.paymentType]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentAccount = useWallet.attributes.states.walletAccount.find((item) => `${item.postsId}` === `${useWallet.attributesRecharge.states.walletAccountPostsId}`);

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
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize'}}>{useWallet.attributesRecharge.states.paymentType}</span>
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
                  <span className={textResumeStyles} style={{fontWeight: '600', textTransform: 'capitalize'}}>{useWallet.attributesRecharge.states.number}</span>
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
                  <span className={textResumeStyles}>{`Comisión (${useWallet.attributesRecharge.states.commissionRate}): `}</span>
                  <span className={textResumeStyles} style={{fontWeight: '600'}}>{decimalFormatPriceConverter(
                            useWallet.attributesRecharge.states.commission || 0,
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
                  <span className={textResumeStyles}>Total a recargar: </span>
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
              <div><h1 className={title1AppStyles} style={{textAlign: 'center'}}>¿La información es correcta?</h1></div>

              <div style={{
                  display: 'flex',
                  margin: '1em',
                  textDecoration: 'none',
              }}>
                  <ButtonAppMobile 
                      title="Recargar"
                      containerProps={{
                        id: 'amount-recharge-button',
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