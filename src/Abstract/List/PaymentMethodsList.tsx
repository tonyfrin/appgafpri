import React from 'react';
import { css } from '@emotion/css';
import Image from 'next/image';


export type ItemPMList = {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
  checked: boolean;
  onClick: () => void;
}


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

export type PaymentMethodsListProps = {
  items: ItemPMList[];
}

export function PaymentMethodsList({
  items
}: PaymentMethodsListProps) {
  

  return (
    
    <>   

      {items && items.length > 0 && items.map((item) => (
        <div 
          className={fila3} key={`pm-${item.id}`}
          onClick={item.onClick}
        >
          <div 
            style={{
              width: '10%',
              display: 'flex',
              margin: 'auto',
            }} 
            className={containerColumnCenterStyles}
           

          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: item.backgroundColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.1em'
              }}
            >
              <Image
                src={item.image}
                alt={`pm-${item.id}`}
                width={15}
                height={15}
                className={imageStyles}
              />
            </div>
          </div>
          <div style={{
            width: '70%',
            display: 'flex',
            justifyContent: 'center'
          }} className={containerColumnCenterStyles}>
            <span className={priceStyles}>{item.name}</span>
            
          </div>
          <div style={{
            width: '10%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            margin: 'auto'
          }}>
            <input
                type="checkbox"
              className={checkboxStyles}
              checked={item.checked}
              />
          </div>
        </div>
      ))}
    </>
  );
}