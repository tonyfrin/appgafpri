import React from 'react';
import { css } from '@emotion/css';
import Image from 'next/image';


export type ItemPMList = {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
  onClick: () => void;
}


const fila3 = css`
  display: flex;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #e1e1e1;
  padding: 1em 0px;
`

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

export type TransfersMethodsListProps = {
  items: ItemPMList[];
}

export function TransfersMethodsList({
  items
}: TransfersMethodsListProps) {
  

  return (
    
    <>   

      {items && items.length > 0 && items.map((item) => (
        <div 
          className={fila3} key={`pm-${item.id}`}
          onClick={item.onClick}
          style={{
            cursor: 'pointer'
          
          }}
        >
          <div 
            style={{
              width: '20%',
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
            width: '80%',
            display: 'flex',
            justifyContent: 'center'
          }} className={containerColumnCenterStyles}>
            <span className={priceStyles}>{item.name}</span>
            
          </div>
        </div>
      ))}
    </>
  );
}