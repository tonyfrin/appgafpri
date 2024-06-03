import React, { useEffect, useState } from 'react';
import { cx, css } from '@emotion/css';
import { IoWalletOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { MainFooter } from '../Footer/Footer';
import Logo from '../assets/img/logo-blanco.png';
import { AppHeader } from '../Header/AppHeader';
import { MenuFooterApp } from '../Menu/MenuFooterApp';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';

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

export const LayoutAdmin = ({ 
  children,
  containerStyles = {},
  containerProps = {},
}: LayoutAppProps) => {
  const { className: containerClassName, ...restContainerProps } = containerProps;
  const { useLogin, useCheckOut, useProfile, useWallet} = useTheme();
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
          title: 'Usuarios',
          href: '/users/pending',
          icon: IoPersonOutline,
          action: globalInfoReset
      },
      {
          title: 'Billetera',
          href: '/',
          icon: IoWalletOutline,
          action: globalInfoReset
      },
      {
          title: 'Configuración',
          href: '/',
          icon: IoWalletOutline,
          action: globalInfoReset
      },
      {
          title: 'Perfil',
          href: '/',
          icon: IoPersonOutline,
          action: globalInfoReset
      }
  ]

  return (
      <div className={cx(layoutContainerStyle(containerStyles), containerClassName)} {...restContainerProps}>
      <>
      <AppHeader
            props={{
                image: Logo,
            }}
        />
        <main style={{ flexGrow: 1 }}>{loading ? (<Loading />) : children}</main>
        <MenuFooterApp items={menuItems}/>
        <MainFooter 
            siteName="Gafpri Admin"
            isLogin={false}
            styles={{
              position: 'relative',
            }}
        />
        </> 
      </div>
  );
};
