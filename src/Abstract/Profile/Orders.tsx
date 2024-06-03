import React from 'react';
import { css } from '@emotion/css';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { OrderAttributesReturn } from '../states/order/useGafpriApiOrder';
import { formatDate, decimalFormatPriceConverter } from '../helpers';

const photoProfile = css`
    border-radius: 100%;
    width: 20%;
    height: auto;
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
  font-size: 0.65em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`


const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

export type OrdersProps = {
  orders: OrderAttributesReturn[];
}




export const Orders = ({orders}: OrdersProps) => {
    const { siteOptions } = useTheme();

    orders.sort((a, b) => parseInt(a.postsId) - parseInt(b.postsId));
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1em auto 100px auto',
        }}>
             <div>
                  <h1 className={title1AppStyles}>Pedidos</h1>
              </div>
              {orders.length > 0 && orders.map((order, index) => (
              <>
              <div key={`menu-profile-${index}`}>
                    <div className={fila3}>
                        <div style={{
                        width: '20%',
                        }}>
                          <span className={priceStyles}>{order.postsId}</span>
                        </div>
                        <div style={{
                          width: '20%',
                        }}>
                          <span className={priceStyles}>{formatDate(order.posts.createdAt)}</span>
                        </div>
                        <div style={{
                          width: '20%',
                          textAlign: 'right'
                        }}>
                          <span className={priceStyles}>{decimalFormatPriceConverter(
                            order.total || 0,
                            siteOptions.DECIMAL_NUMBERS,
                            siteOptions.CURRENCY_SYMBOL,
                            siteOptions.CURRENCY_LOCATION
                          )}</span>
                        </div>
                        <div style={{
                          width: '20%',
                          textAlign: 'right'
                        }}>
                          <span className={priceStyles}>En espera</span>
                        </div>
                        <div style={{
                        width: '20%',
                        }} className={containerColumnEndStyles}>
                        <button
                        >
                            <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                        </button>
                        </div>
                    </div>
                </div>
              </>
              ))}
               
              
                
        </div>
    )

}