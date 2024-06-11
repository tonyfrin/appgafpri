import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { useTheme } from '../../context/ThemeContext';
import { Error } from '../../Error';
import { WhatsApp } from '../../Notification/WhatsApp';
import { useRouter } from 'next/router';


const mainStyles = css`
  margin-bottom: 100px;
`

const title1AppStyles = css`
  font-size: 1em;
  padding: 0.9em;
  margin: 2em auto;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`


export function TransferError() {
  const { useWallet, useError } = useTheme();
  const router = useRouter();

  const returnInit = async () => {
    await router.push('/billetera/enviar');
    useWallet.attributesTransfers.actions.infoReset();
    useWallet.pagesTransfers.actions.onBeneficiary();
  }

  return (
    <>
        <>
          <main className={mainStyles}>
            <Error 
              error={useError.states.error}
            />
            <div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '20%',
                }}>
                   <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <AiOutlineCloseCircle style={{
                      fontSize: '3em',
                      color: '#c12429'
                    }}/>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                      <h1 className={title1AppStyles}>No pudimos procesar su Transferencia, por favor vuelva a intentarlo.</h1>
                  </div>
                    
                    <div  
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <ButtonAppMobile 
                        title="Regresar a la billetera"
                        containerProps={{
                          onClick: () => returnInit()
                        }}
                      />
                    </div>
                </div>
                <WhatsApp />
            </div>
          </main>
        </>
    </>
  );
}