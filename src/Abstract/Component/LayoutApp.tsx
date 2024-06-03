import React, { useEffect, useState } from 'react';
import { cx, css } from '@emotion/css';
import Link from 'next/link';
import { BiMap } from 'react-icons/bi';
import { IoWalletOutline } from 'react-icons/io5';
import { IoStorefrontOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCartOutline } from 'react-icons/io5';
import { MainFooter } from '../Footer/Footer';
import Logo from '../assets/img/logo-blanco.png';
import { AppHeader } from '../Header/AppHeader';
import { MenuFooterApp } from '../Menu/MenuFooterApp';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';

type LayoutContainerStyleProps = {
  display?: string;
  backgroundImage?: string;
  flexDirection?: string;
  minHeight?: string;
  custom?: string;
};

const layoutContainerStyle = (
  styles: LayoutContainerStyleProps
) => css`
  ${styles.backgroundImage ? `background-image: url(${styles.backgroundImage});` : ''}
  display: ${styles.display || 'flex'};
  flex-direction: ${styles.flexDirection || 'column'};
  min-height: ${styles.minHeight || '100vh'};
  background-color: #f9f9f9;
  ${styles.custom || ''}
`;


export type LayoutAppProps = {
  children: React.ReactNode;
  containerStyles?: LayoutContainerStyleProps;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const LayoutApp = ({ 
  children,
  containerStyles = {},
  containerProps = {},
}: LayoutAppProps) => {
  const { className: containerClassName, ...restContainerProps } = containerProps;
  const { useLogin, useCheckOut, useProfile, useWallet, useAddress} = useTheme();
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const globalInfoReset = () => {
      useCheckOut.attributes.actions.infoReset();
      useProfile.pages.actions.infoReset();
      useWallet.actions.globalResetInfo();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useLogin.data.actions.checkLoginToken(); // Llamar a la API
        useLogin.data.actions.onCheckLoginToken(response); // Actualizar el estado con la respuesta
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Marcar la carga como completa, independientemente del resultado
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const menuItems= [
      {
          title: 'Tienda',
          href: '/tienda',
          icon: IoStorefrontOutline,
          action: globalInfoReset
      },
      {
          title: 'Carrito',
          href: '/carrito',
          icon: IoCartOutline,
          action: globalInfoReset
      },
      {
          title: 'Billetera',
          href: '/billetera',
          icon: IoWalletOutline,
          action: globalInfoReset
      },
      {
          title: 'Perfil',
          href: '/perfil',
          icon: IoPersonOutline,
          action: globalInfoReset
      }
  ]

  const address = useAddress.attributes.states.addressList.length;

  return (
      <div className={cx(layoutContainerStyle(containerStyles), containerClassName)} {...restContainerProps}>
      <>
      <AppHeader
            props={{
                image: Logo,
            }}
        />
        <main style={{ flexGrow: 1 }}>{loading ? (<Loading />) : address === 0 ?
            <div
                  style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '90%',
                      margin: '2em auto',
                  }}
            >
                  <div>   
                      <BiMap 
                          style={{
                              fontSize: '3em'
                          }}
                      />
                  </div>
                  <p
                      style={{
                          margin: '10px 0px 0px 0px',
                          padding: '0px',
                          fontSize: '0.7em',
                          fontFamily: 'Poppins, sans-serif',
                          textAlign: 'center'
                      }}
                  >No tienes direcciones agregadas.</p>
                  <p
                      style={{
                          margin: '0px',
                          padding: '0px',
                          fontSize: '0.7em',
                          fontFamily: 'Poppins, sans-serif',
                          textAlign: 'center'
                      }}
                  >Para poder disfrutar de todos los servicios Gafpri agrega una dirección</p>
                  <Link
                    href='/perfil/direcciones/agregar'
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      margin: '1em auto',
                    }}
                  >
                        <ButtonAppMobile 
                              title='Agregar dirección'
            
                              containerStyles={{
                                backgroundColor: '#314577',
                              }}
    
                              contentStyles={{
                                fontSize: '1.2em',
                              }}
                        />
                  </Link>
            </div>
        : children}</main>
        <MenuFooterApp items={menuItems}/>
        <MainFooter 
            siteName="Gafpri Store"
            isLogin={false}
            styles={{
              position: 'relative',
            }}
        />
        </> 
      </div>
  );
};
