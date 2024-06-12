import React from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';

const imageStyles = css`
  width: 80%;
  height: auto;
`

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

type itemImage = {
  src: string,
  backgroundColor: string,
}

type HeaderPageReturnProps = {
  title: string,
  onClick: () => void,
  image?: itemImage,
}

export function HeaderPageReturn({ title, onClick, image}: HeaderPageReturnProps) {
  

  return (
    <>
        <div 
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '1em 0px',
              width: '90%',
              margin: 'auto',
              borderBottom: '1px solid #e1e1e1',
              alignItems: 'center'
            }}
        > 
            {image && 
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: image.backgroundColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0.1em'
                }}
              >
                <Image
                  src={image.src}
                  alt={`Gafpri`}
                  width={15}
                  height={15}
                  className={imageStyles}
                />
              </div>
            }
            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>{title}</h1>
            <div 
              style={{
                textDecoration: 'none',
                display: 'flex',
              }}
            >
            <FiChevronLeft 
                className={arrowStyle}
                onClick={onClick}
            />
            </div>
        </div>
    </>
  );
}