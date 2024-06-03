import React from 'react';
import { css } from '@emotion/css';
import Image from 'next/image';
import Link from 'next/link';
import { Select } from '../Select/Select';
import { CartAttributesReturn } from '../states/cart/useGafpriApiCart';
import { useTheme } from '../context/ThemeContext';
import { decimalFormatPriceConverter } from '../helpers';


const sectionStyles = css`
  margin-bottom: 150px;
`

const productos = css`
  display: block;
  margin-bottom: 1em;
`

const fila = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Tres columnas */
  gap: 5px; /* Espacio entre productos */
`

const fila3 = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 5px; /* Espacio entre productos */
`

const producto = css`
  padding: 10px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  width: 90%;
  margin: auto;
`

const imgContainerStyles = css`
  margin: 0 auto;
`

const imgStyles = css`
  object-fit: contain;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`

const priceStyles = css`
  font-size: 0.8em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const title1AppStyles = css`
  font-size: 0.8em;
  padding: 0.6em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const containerInfoStyles = css`
  display: flex;
  margin: auto;
`

const containerOptionsStyles = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  padding: 1em 0px;
  border-bottom: 1px solid #ebebeb;
`

const linkStyles = css`
  font-size: 0.8em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #1f2024;
`

const contentOptionsStyles = css`
  display: flex;
  justify-content: space-between;
`

type BoxCartProps = {
  cart: CartAttributesReturn;
  setFetching: (value: boolean) => void;
  setCart: (value: CartAttributesReturn) => void;
}

export function BoxCart({
  cart,
  setFetching,
  setCart,
}: BoxCartProps) {
  const { siteOptions, useCartItems, useCheckOut } = useTheme();

  const cartItems = cart.cartItems;
  cartItems.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const updateItemCart = async (qty: string, id: string) => {
    setFetching(true);
    const response = await (await useCartItems.api).actions.updateItemToCart(qty, id);
    if(response && response.success){
      setCart(response.item);
      if(response.item && response.item.cartItems && response.item.cartItems.length > 0){
        useCheckOut.attributes.actions.setTotal(response.item.total);
      } else{
        useCheckOut.attributes.actions.setTotal(0);
      }
      setFetching(false);
    }
  }

  return (
        <>
        <div className={sectionStyles}>
          <div>
            {cartItems.length > 0 && cartItems.map((item, index) => (
              <section className={productos} key={`box-cart${index}`}>
                <div className={producto}>

                    <Link href="/producto/[id]" as={`/producto/${item.products.postsId}`} className={fila} style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}>
                    <div className={imgContainerStyles}>
                        <Image src={item.products.image} alt={item.name} className={imgStyles} width={50} height={50}/>
                    </div>
                    <div>
                      <h3 className={title1AppStyles}>{item.name}</h3>
                    </div>
                    </Link>

                  <div className={fila3}>
                    <div className={containerInfoStyles}>
                        <Select 
                          options={[
                            { value: '0', label: '0' },
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                            { value: '5', label: '5' },
                            { value: '6', label: '6' },
                            { value: '7', label: '7' },
                            { value: '8', label: '8' },
                            { value: '9', label: '9' },
                            { value: '10', label: '10' },
                          ]}
                          value={parseFloat(item.qty).toFixed(0)}
                          onChange={(value) => updateItemCart(value, item.id)}
                        />
                    </div>
                    <div className={containerInfoStyles}>
                      <span className={priceStyles}>{decimalFormatPriceConverter(
                        item.price || 0,
                        siteOptions.DECIMAL_NUMBERS,
                        siteOptions.CURRENCY_SYMBOL,
                        siteOptions.CURRENCY_LOCATION
                      )}</span>
                    </div>
                    <div className={containerInfoStyles}>
                      <span className={priceTotalStyles}>{
                        decimalFormatPriceConverter(
                          item.subTotal || 0,
                          siteOptions.DECIMAL_NUMBERS,
                          siteOptions.CURRENCY_SYMBOL,
                          siteOptions.CURRENCY_LOCATION
                        )
                      }</span>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
          <div className={containerOptionsStyles}>
            <span className={priceTotalStyles}>Envío:</span>
            <span className={priceStyles}>¡Lo recibes en menos de una hora!</span>
          </div>
          <div className={containerOptionsStyles}>
            <span className={priceTotalStyles}>Retirar:</span>
            <span className={linkStyles}>Buscar tienda</span>
          </div>
          <div className={containerOptionsStyles}>
            <div className={contentOptionsStyles}>
              <span className={priceStyles}>Subtotal:</span>
              <span className={priceStyles}>
                {decimalFormatPriceConverter(
                  cart.subTotal || 0,
                  siteOptions.DECIMAL_NUMBERS,
                  siteOptions.CURRENCY_SYMBOL,
                  siteOptions.CURRENCY_LOCATION
                )}</span>
            </div>
            <div className={contentOptionsStyles}>
              <span className={priceStyles}>Envío:</span>
              <span className={priceStyles}>Gratis</span>
            </div>
            <div className={contentOptionsStyles}>
              <span className={priceTotalStyles}>Total:</span>
              <span className={priceTotalStyles}>
                {decimalFormatPriceConverter(
                  cart.total || 0,
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