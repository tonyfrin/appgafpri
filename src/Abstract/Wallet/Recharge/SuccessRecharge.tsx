import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';

export function SuccessRecharge() {
  const { useWallet } = useTheme();

  const returnInit = ():void => {
    useWallet.pagesRecharge.actions.onFetching();
    
    setTimeout(useWallet.pagesRecharge.actions.returnInit, 1000);

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
            >Recarga enviada.</p>
            <p
                style={{
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >Hemos recibido de manera exitosa su solicitud de recarga, en breve verificarémos su transferencia y recibirá un correo al tener los fondos disonibles.</p>
              <Link href="/billetera" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: '1em 0px'
              }}>
                <ButtonAppMobile 
                  title="Ir a la Billetera"
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