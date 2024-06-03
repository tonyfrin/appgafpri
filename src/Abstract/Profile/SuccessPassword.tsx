import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import { SelectApp } from '../Select/SelectApp';
import { InputAppContainer } from '../Input/InputAppContainer';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { decimalFormatPriceConverter } from '../helpers';
import { FiChevronLeft } from 'react-icons/fi';
import { Error } from '@/Abstract/Error';
import { RiCheckboxCircleLine } from 'react-icons/ri';


const mainStyles = css`
  margin-bottom: 100px;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
    z-index: 996;
    display: flex;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
`

const containerModalStyle = css`
  background-color: #ececec;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-top: 1px solid #e1e1e1;
  width: 100%;
  height: 100%;
  top: 20%;
  border-radius: 10px;
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

const textInfoStyles = css`
  font-size: 0.7em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const textInfoTitleStyles = css`
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #9e9e9e;
`

const textResumeStyles = css`
  font-size: 1em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

export function SuccessPassword() {
  const { useProfile } = useTheme();

  const returnInit = ():void => {
    useProfile.pages.actions.infoReset();

  }

  return (
    <>

        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                flexDirection: 'column',
                width: '90%',
                margin: 'auto',
            }}
        >
            <div>   
                <RiCheckboxCircleLine
                    style={{
                        fontSize: '3em'
                    }}
                />
            </div>
            <p
                style={{
                    margin: '10px 0px 10px 0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center',
                    fontWeight: '600'
                }}
            >Contraseña actualizada.</p>
            <p
                style={{
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >Has cambiado con exito tu contraseña.</p>
              <Link href="/perfil" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: '1em 0px'
              }}>
                <ButtonAppMobile 
                  title="Volver al perfil"
                  contentStyles={{
                    fontSize: '1.2em',
                  }}
                  containerProps={{
                    onClick: () => returnInit()
                  }}
                />
              </Link>
        </div>
    </>
  );
}