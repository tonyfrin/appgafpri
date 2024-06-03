import React from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import { CartAttributesReturn } from '../states/cart/useGafpriApiCart';
import { useTheme } from '../context/ThemeContext';
import { decimalFormatPriceConverter } from '../helpers';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
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
const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`
const containerOptionsStyles = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  padding: 1em 0px;
  border-bottom: 1px solid #ebebeb;
`

const contentOptionsStyles = css`
  display: flex;
  justify-content: space-between;
`


export type SummaryProps = {
  cart: CartAttributesReturn | null;
}

export function Summary({
    cart,
}: SummaryProps) {
  const { useCheckOut, siteOptions } = useTheme();

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
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Detalle de compra</h1>
                <FiChevronLeft 
                    className={arrowStyle}
                    onClick={useCheckOut.pages.actions.onInit}
                />
            </div>

            <div className={containerOptionsStyles}>
            <div className={contentOptionsStyles}>
              <span className={priceStyles}>Subtotal:</span>
              <span className={priceStyles}>{decimalFormatPriceConverter(
                cart?.subTotal || 0,
                siteOptions.DECIMAL_NUMBERS,
                siteOptions.CURRENCY_SYMBOL,
                siteOptions.CURRENCY_LOCATION
              )}</span>
            </div>
            <div className={contentOptionsStyles}>
              <span className={priceStyles}>Envío o retiro en Tienda:</span>
              <span className={priceStyles}>Gratis</span>
            </div>
            <div className={contentOptionsStyles}>
              <span className={priceTotalStyles}>Total:</span>
              <span className={priceTotalStyles}>{decimalFormatPriceConverter(
                cart?.total || 0,
                siteOptions.DECIMAL_NUMBERS,
                siteOptions.CURRENCY_SYMBOL,
                siteOptions.CURRENCY_LOCATION
              )}</span>
            </div>
          </div>
             
          </div>
    </>
  );
}