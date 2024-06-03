import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { IoBicycleOutline } from 'react-icons/io5';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { useTheme } from '../context/ThemeContext';
import { FadeIn } from '../Fade/FadeIn';
import { CartAttributesReturn } from '../states/cart/useGafpriApiCart';
import { decimalFormatPriceConverter } from '../helpers';
import { UserAttributesReturn } from '../states/user/useGafpriApiUser';
import { SitesAttributesReturn } from '../states/sites/useGafpriApiSites';
import Link from 'next/link';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const containerBottonCheckOutStyle = css`
  display: flex;
  padding: 1em;
`

const buttonCheckOut = css`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 1em;
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
  font-weight: 600;
  color: #1f2024;
  width: 40%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const fila3 = css`
  display: flex;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #e1e1e1;
  padding: 1em 0px;
`

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const priceStyles = css`
  font-size: 0.8em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const containerColumnCenterStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
`

const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`

export type InitCheckOutProps = {
  cart: CartAttributesReturn | null;
  user: UserAttributesReturn | null;
  sites: SitesAttributesReturn[] | null;
  setCart: (value: CartAttributesReturn | null) => void;
}

export function InitCheckOut({
    cart,
    user,
    sites,
    setCart
}: InitCheckOutProps) {
  const { useCheckOut, siteOptions, useOrder, useWallet } = useTheme();

  let selectAddress: string | null = null;
  let selectSites: string | null = null;

  if(user && useCheckOut.attributes.states.addressId) {
    user.entity.map((entity) => {
      entity.address.map((address) => {
        if(address.id === useCheckOut.attributes.states.addressId) {
          selectAddress = `${address.address1}, ${address.city}`;
        }
        return null;
      });
      return null;
    });
  }

  if(useCheckOut.attributes.states.sitesId && sites) {
    sites?.map((site) => {
      if(site.id === useCheckOut.attributes.states.sitesId) {
        selectSites = `${site.name} | ${site.address1}, ${site.city}`;
      }
      return null;
    });
  }

  const changeShippingType = (shippingType: string) => {
    useCheckOut.attributes.actions.setAddressId('');
    useCheckOut.attributes.actions.setSitesId('');
    useCheckOut.attributes.actions.setShippingType(shippingType);
  }

  useEffect(() => {
    useCheckOut.attributes.actions.validationButtonNext();
  }, [useCheckOut.attributes.states.shippingType, useCheckOut.attributes.states.addressId, useCheckOut.attributes.states.paymentMethod, useCheckOut.attributes.states.sitesId]); // eslint-disable-line react-hooks/exhaustive-deps

  const addOrder = async () => {
    if(useCheckOut.attributes.actions.validationButtonNext() && useCheckOut.attributes.states.customerWalletAccount){
      useCheckOut.pages.actions.onFetching();
      const data = await useOrder.api.actions.createOrder();
      
      if(data && data.success){
        await useWallet.attributes.actions.getWalletAccount();
        await useWallet.attributes.actions.getEntities();
        setCart(null);
        useCheckOut.attributes.actions.infoReset();
        useCheckOut.pages.actions.onFinal();
      } else{
        useCheckOut.pages.actions.onError();
      }
    }
  } 

  return (
    <> 
            <div>
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Formulario de Pago</h1>
            </div>
            <div>
              <div className={containerBottonCheckOutStyle}>
                <button className={buttonCheckOut}
                  style={{
                    backgroundColor: useCheckOut.attributes.states.shippingType === 'delivery' ? '#324375' : '',
                    color: useCheckOut.attributes.states.shippingType === 'delivery' ? '#fff' : '',
                  }}
                  onClick={() => changeShippingType('delivery')}
                >
                  <IoBicycleOutline style={{margin: 'auto'}}/>
                  <span style={{margin: 'auto'}}>Delivery</span>
                </button>
                <button className={buttonCheckOut}
                  style={{
                    backgroundColor: useCheckOut.attributes.states.shippingType === 'store' ? '#324375' : '',
                    color: useCheckOut.attributes.states.shippingType === 'store' ? '#fff' : '',
                  }}
                  onClick={() => changeShippingType('store')}
                >
                  <IoLocationOutline style={{margin: 'auto'}}/>
                  <span>Tienda</span>
                </button>
              </div>
              {useCheckOut.attributes.states.shippingType === 'delivery' && 
              <FadeIn keyName='delivery' isVisible={useCheckOut.attributes.states.shippingType === 'delivery'}>
                <div className={`${fila3}`}>
                  <div style={{
                    width: '40%',
                  }}>
                    <span className={priceTotalStyles}>Envío:</span>
                  </div>
                  <div style={{
                    width: '40%',
                  }} className={containerColumnCenterStyles}>
                    {!useCheckOut.attributes.states.addressId ?
                    <span className={priceStyles} style={{
                    color: '#c12429',
                    }}>Seleccionar dirección</span> :
                    <span className={priceStyles}>{selectAddress}</span>
                  }
                  </div>
                  <div style={{
                    width: '20%',
                  }} className={containerColumnEndStyles}>
                    <button
                      onClick={() => useCheckOut.pages.actions.onAddressList()}
                    >
                      <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                    </button>
                  </div>
                  
                </div>
                </FadeIn>
              }

              {useCheckOut.attributes.states.shippingType === 'store' && 
              <FadeIn keyName='store' isVisible={useCheckOut.attributes.states.shippingType === 'store'}>
                <div className={`${fila3}`}>
                  <div style={{
                    width: '40%',
                  }}>
                    <span className={priceTotalStyles}>Recoger:</span>
                  </div>
                  <div style={{
                    width: '40%',
                  }} className={containerColumnCenterStyles}>
                     {!useCheckOut.attributes.states.sitesId ?
                      <span className={priceStyles} style={{
                      color: '#c12429',
                      }}>Selecciona la tienda de tu preferencia</span> :
                      <span className={priceStyles}>{selectSites}</span>
                    }
                  </div>
                  <div style={{
                    width: '20%',
                  }} className={containerColumnEndStyles}>
                    <button
                      onClick={() => useCheckOut.pages.actions.onStoreList()}
                    >
                      <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                    </button>
                  </div>
                  
                </div>
                </FadeIn>
              }



              <div className={fila3}>
                <div style={{
                  width: '40%',
                }}>
                  <span className={priceTotalStyles}>Metodo de Pago:</span>
                </div>
                <div style={{
                  width: '40%',
                }}>
                  {!useCheckOut.attributes.states.paymentMethod ?
                  <span className={priceStyles} style={{
                    color: '#c12429',
                  }}>Seleccionar pago</span>
                  : <span className={priceStyles}>{useCheckOut.attributes.states.paymentMethod === 'cash' ? 'Efectivo' : 
                  useCheckOut.attributes.states?.customerWalletAccount && parseFloat(useCheckOut.attributes.states.customerWalletAccount.available) >=  useCheckOut.attributes.states.total ?
                  `${useCheckOut.attributes.states?.customerWalletAccount.name} | ${decimalFormatPriceConverter(
                    useCheckOut.attributes.states.customerWalletAccount.available || 0,
                    siteOptions.DECIMAL_NUMBERS,
                    siteOptions.CURRENCY_SYMBOL,
                    siteOptions.CURRENCY_LOCATION
                  )}` : useCheckOut.attributes.states?.customerWalletAccount ? 
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                  <span style={{
                    color: '#c12429',
                  }}>No tienes saldo suficiente en tu billetera {useCheckOut.attributes.states?.customerWalletAccount.name} | {decimalFormatPriceConverter(
                    useCheckOut.attributes.states.customerWalletAccount.available || 0,
                    siteOptions.DECIMAL_NUMBERS,
                    siteOptions.CURRENCY_SYMBOL,
                    siteOptions.CURRENCY_LOCATION
                  )}</span> 
                    <Link href="/billetera/recarga" style={{ textDecoration: 'none', color: 'inherit'}}>
                      <ButtonAppMobile 
                        title='Recargar'
                        containerStyles={{
                          width: 'fit-content',
                          margin: '20px auto 0px auto',
                          borderRadius: '5px',
                        }}
                        contentStyles={{
                          fontSize: '0.9em',
                          padding: '0.5em',
                          custom: `
                            font-weight: 500;
                          `
                        }}
                      /> 
                    </Link>
                  </div>: 
                  
                  ''}</span>}
                </div>
                <div style={{
                  width: '20%',
                }} className={containerColumnEndStyles}>
                  <button
                    onClick={() => useCheckOut.pages.actions.onPaymentList()}
                  >
                    <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                  </button>
                </div>
                
              </div>
              <div className={fila3}>
                <div style={{
                  width: '40%',
                }}>
                  <span className={priceTotalStyles}>Total compra:</span>
                </div>
                <div style={{
                  width: '40%',
                }}>
                  <span className={priceStyles} >{decimalFormatPriceConverter(
                cart?.total || 0,
                siteOptions.DECIMAL_NUMBERS,
                siteOptions.CURRENCY_SYMBOL,
                siteOptions.CURRENCY_LOCATION
              )}</span>
                </div>
                <div style={{
                  width: '20%',
                }} className={containerColumnEndStyles}>
                  <button
                    onClick={() => useCheckOut.pages.actions.onSummary()}
                  >
                    <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                  </button>
                </div>  
              </div>
            </div>
            <div>
              <p style={{
                fontSize: '0.5em',
                textAlign: 'center',
              }}>Al tocar Pagar, acepta los Términos de venta.</p>
            </div>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonAppMobile 
                title='Pagar'
                containerProps={{
                  id: 'gs-button-purchase',
                  onClick: () => addOrder(),
                }}
              />
            </div>
    </>
  );
}