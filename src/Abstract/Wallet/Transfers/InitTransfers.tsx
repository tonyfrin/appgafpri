import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { TransfersMethodsList } from '@/Abstract/List/TransfersMethodsList';
import LogoZelle from '../../assets/img/logo-zelle.png';
import LogoPaypal from '../../assets/img/logo-pay-pal.png';
import LogoBanesco from '../../assets/img/logo-pago-movil.png';
import LogoGafpri from '../../assets/img/logo-llama-gafpri-blanca.png';
import LogoCash from '../../assets/img/logo-cash.png';
import { useRouter } from 'next/router';

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

export function InitTransfers() {
  const { useWallet, useLogin } = useTheme();
  const router = useRouter();

  let itemsPmList = []

  if(useLogin.data.states.currentUser?.id && parseInt(`${useLogin.data.states.currentUser?.id}`, 10) === 52 || parseInt(`${useLogin.data.states.currentUser?.id}`, 10) === 334){
    itemsPmList  = [
      {
        id: 'pm1',
        name: 'Billetera Gafpri',
        image: LogoGafpri.src,
        backgroundColor: '#07b2e7',
        onClick: () => router.push('/billetera/enviar/gafpri')
      },
      {
        id: 'pm2',
        name: 'Zelle',
        image: LogoZelle.src,
        backgroundColor: 'rgb(107 29 207)',
        onClick: () => router.push('/billetera/enviar/zelle')
      },
      {
        id: 'pm4',
        name: 'Pago Movil (Bs)',
        image: LogoBanesco.src,
        backgroundColor: '#ebebeb',
        onClick: () => router.push('/billetera/enviar/pagomovil')
      }, 
      {
        id: 'pm5',
        name: 'Avance de Efectivo',
        image: LogoCash.src,
        backgroundColor: '#008000',
        onClick: () => router.push('/billetera/enviar/efectivo')
      }
    ]
  } else{
    itemsPmList  = itemsPmList  = [
      {
        id: 'pm1',
        name: 'Billetera Gafpri',
        image: LogoGafpri.src,
        backgroundColor: '#07b2e7',
        onClick: () => router.push('/billetera/enviar/gafpri')
      },
      {
        id: 'pm2',
        name: 'Zelle',
        image: LogoZelle.src,
        backgroundColor: 'rgb(107 29 207)',
        onClick: () => router.push('/billetera/enviar/zelle')
      },
      {
        id: 'pm4',
        name: 'Pago Movil (Bs)',
        image: LogoBanesco.src,
        backgroundColor: '#ebebeb',
        onClick: () => router.push('/billetera/enviar/pagomovil')
      }, 
    ]
  }

  return (
    <>

          <div>
          <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1em 0px',
                width: '90%',
                margin: 'auto',
                borderBottom: '1px solid #e1e1e1'
            }}> 
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Retirar Saldo</h1>
                <Link href='/billetera' style={{
                  textDecoration: 'none',
                  display: 'flex',
                }}>
                <FiChevronLeft 
                    className={arrowStyle}
                    onClick={useWallet.pagesTransfers.actions.returnInit}
                />
                </Link>
            </div>
            <div>
              <TransfersMethodsList 
                items={itemsPmList}
              />
            </div>
          </div>
    </>
  );
}