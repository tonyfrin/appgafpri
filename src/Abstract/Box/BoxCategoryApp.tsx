import React from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import Image from 'next/image';
import { CategoryAttributesReturn } from '../states/category/useGafpriApiCategory';
import Link from 'next/link';

const sectionStyles = css`
  margin-bottom: 2em;
`

const title2AppStyles = css`
  font-size: 1em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  font-weight: 300;
`

const productos = css`
  display: block;
  margin-bottom: 1em;
`

const fila = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 5px; /* Espacio entre productos */
`

const producto = css`
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
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

const containerButtonAll = css`
  display: flex;
  justify-content: center;
`

type Items = {
  title: string;
  img: string;
  href: string;
}

type BoxCategoryAppProps = {
  category: CategoryAttributesReturn;
  buttonProps?: boolean;
}

export function BoxCategoryApp({
  category,
  buttonProps = true,
}: BoxCategoryAppProps) {
  return (
        <>
        <div className={sectionStyles}>
            <h2 className={title2AppStyles}>{category.name}</h2>
            <section className={productos}>
            <div className={fila}>
              {category.children && category.children.slice(0, 3).map((children, index) => (
                <Link key={`product-${index}`} href="/categoria/[id]" as={`/categoria/${children.id}`} className={producto} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}>
                  <div>
                    <Image src={children.photo} alt={children.name} className={imgStyles} width={500} height={500}/>
                    <h3 className={titleProductStyles}>{children.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className={fila}>
              {category.children && category.children.slice(3).map((children, index) => (
                <Link key={`product-${index}`} href="/categoria/[id]" as={`/categoria/${children.id}`} className={producto} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}>
                  <div>
                    <Image src={children.photo} alt={children.name} className={imgStyles} width={500} height={500}/>
                    <h3 className={titleProductStyles}>{children.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            
            </section>
            {buttonProps && 
              <div className={containerButtonAll}>
                <ButtonAppMobile 
                  containerStyles={{
                    width:'30%',
                    borderRadius: '5px',
                  }}
                  contentStyles={{
                    fontSize: '0.8em',
                    padding: '0.3em',
                    custom: `
                      font-weight: 600;
                    `
                  }}
                  title='Ver todos'
                />
              </div>
            }
          </div>
        </>
  );
}