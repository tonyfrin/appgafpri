import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import Image from 'next/image';
import { ProductsAttributesReturn } from '../states/products/useGafpriApiProducts';
import { useTheme } from '../context/ThemeContext';
import { decimalFormatPriceConverter } from '../helpers';

const containerStyles = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const contentProductStyles = css`
    display: flex;
    flex-direction: column; 
`

const producto = css`
    width: calc(45% - 10px);
    margin: 5px;
    background-color: #fff;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 1px 6px 0 #1f20241c;
`

const imgStyles = css`
  width: 100%;
  height: auto;
  object-fit: contain;
`

const titleProductStyles = css`
  font-size: 10px;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  margin: 5px 0px;
`

const categoryStyles = css`
    font-size: 8px;
    font-weight: 300;
    margin: 2px 0px;
`

const priceStyles = css`
    font-size: 10px;
    font-weight: 700;
    margin: 5px 0px;
`

export type ProductListProps = {
    items: ProductsAttributesReturn[];
}

export const ProductList = ({ items }: ProductListProps) => {
  const { siteOptions } = useTheme();

  return (
    <div className={containerStyles}>
      {items.map((item, index) => (
        <Link key={`product-${index}`} href="/producto/[id]" as={`/producto/${item.postsId}`} className={producto} style={{
          textDecoration: 'none',
          color: 'inherit',
        }}>
          
              <div className={contentProductStyles}>
                  <Image src={item.image} alt={item.name} className={imgStyles} width={500} height={500}/>
                  <h3 className={titleProductStyles}>{item.publicName}</h3>
                  <span className={categoryStyles}>{item.category.name}</span>
                  <span className={priceStyles}>{decimalFormatPriceConverter(
                item.salesPrice || 0,
                siteOptions.DECIMAL_NUMBERS,
                siteOptions.CURRENCY_SYMBOL,
                siteOptions.CURRENCY_LOCATION
              )}</span>
              </div>
        </Link>
      ))}
    </div>
  );
};