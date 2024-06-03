import React from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { decimalFormatPriceConverter } from '../helpers';
import { WalletAccountAtrributesReturn } from '../states/wallet/useGafpriApiWalletAccount';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`


export function PaymentMethod() {
  const { useCheckOut, useWallet, siteOptions } = useTheme();

  const walletAccount = useWallet.attributes.states.walletAccount;

  const paymentSelected = (value: string) => {
    useCheckOut.attributes.actions.setPaymentMethod(value);
    useCheckOut.pages.actions.onInit();
  }

  const paymentSelectedWallet = (walletAccount: WalletAccountAtrributesReturn) => {
    useCheckOut.attributes.actions.setPaymentMethod('wallet');
    useCheckOut.attributes.actions.setCustomerWalletAccount(walletAccount)
    useCheckOut.pages.actions.onInit();
  }

  return (
    <> 
          <div
            style={{
              marginBottom: '120px'
            }}
          >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1em 0px',
                width: '90%',
                margin: 'auto',
            }}> 
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Metodos de Pago</h1>
                <FiChevronLeft 
                    className={arrowStyle}
                    onClick={useCheckOut.pages.actions.onInit}
                />
            </div>

            {/* <div style={{
              display: 'flex',
              margin: 'auto',
            }}>
              <ButtonAppMobile 
                title='Efectivo'
                containerStyles={{
                  backgroundColor: '#324375',
                  borderRadius: '10px',
                }}
                contentProps={{
                  onClick: () => paymentSelected('cash')
                }}
                contentStyles={{
                  fontSize: '1em'
                }}
              />

            </div> */}
            {walletAccount && walletAccount.length > 0 && 
            
              walletAccount.map((item, index) => (
                <div 
                  style={{
                    display: 'flex',
                    margin: 'auto',
                  }}
                  key={index}
                >
                  <ButtonAppMobile 
                    title={`Billetera (...${item.id}) - Saldo: ${decimalFormatPriceConverter(
                      item.available || 0,
                      siteOptions.DECIMAL_NUMBERS,
                      siteOptions.CURRENCY_SYMBOL,
                      siteOptions.CURRENCY_LOCATION
                    )}`}
                    containerStyles={{
                      backgroundColor: '#324375',
                      borderRadius: '10px',
                    }}
                    containerProps={{
                      onClick: () => paymentSelectedWallet(item)
                    }}
                    contentStyles={{
                      fontSize: '1em'
                    }}
                  />

                </div>
              ))
          }
           
             
          </div>
    </>
  );
}