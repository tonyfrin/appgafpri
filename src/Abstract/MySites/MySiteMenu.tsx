import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useTheme } from '../context/ThemeContext';

import { Loading } from '../Loading';

const photoProfile = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
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


const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`




export const MySiteMenu = ({id}: {id: string | string[] | undefined}) => {
    const { useSites, useLogin } = useTheme();

    if(id && typeof id !== 'string') { return <Loading />}

    
    const site = id && typeof id === 'string' ? useSites.api.actions.getMySiteById(id) : null;

    const owner = `${site?.sitesEntity[0].entity.userId}` === `${useLogin.data.states.currentUser?.id}`;

   
    let menu: {name: string, action?: () => void, href?: string;}[]= [
        {
            name: 'Recargar Billetera',
            href: `/mis-tiendas/tienda/recarga/${id}`,
        },
        {
            name: 'Actividad de Recargas',
            href: `/mis-tiendas/tienda/actividad-recarga/${id}`,
        },
    ]

    if(owner) {
        menu = [
            {
                name: 'Empleados/Autorizados',
                href: `/mis-tiendas/tienda/empleados/list/${id}`,
            },
            {
                name: 'Recargar Billetera',
                href: `/mis-tiendas/tienda/recarga/${id}`,
            },
            {
                name: 'Actividad de Recargas',
                href: `/mis-tiendas/tienda/actividad-recarga/${id}`,
            },
        ]
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1em auto 100px auto',
        }}>
            {site === null ? <Loading /> :
            <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    width: '100px',
                    height: '100px',
                    margin: 'auto'
                }}
            >
                <Image 
                    src='https://categorygafpri.s3.us-east-2.amazonaws.com/store-default.jpg' 
                    alt="profile" width={200} height={200} 
                    className={photoProfile}
                />
            </div>
            <div>
                <h1 style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontSize: '1.2em',
                    margin: '0.5em 0',
                }}>
                    {`${site?.tradename}`}
                </h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                  <span style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                      fontSize: '0.8em',
                      fontWeight: 400,
                      margin: '0.5em 0',
                  }}>
                      Billetera No:
                  </span>
                  <span style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                      fontSize: '0.8em',
                      fontWeight: 600,
                      margin: '0.5em',
                  }}>
                      {site?.sitesEntity[0].entity.walletAccount[0].id}
                  </span>
              </div>
            <div
                style={{
                    margin: '1em',
                }}
            ></div>
            {menu.map((item, index) => 
            
            item.href ? 
            (
                
                <Link 
                    key={`menu-profile-${index}`}
                    onClick={item.action}
                    href={item.href}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <div className={fila3}>
                        <div style={{
                        width: '80%',
                        }}>
                        <span className={priceTotalStyles}>{item.name}</span>
                        </div>
                        <div style={{
                        width: '20%',
                        }} className={containerColumnEndStyles}>
                        <button
                            
                        >
                            <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                        </button>
                        </div>
                    </div>
                </Link>
            )

            : 

            (
                <div 
                    key={`menu-profile-${index}`}
                    onClick={item.action}
                >
                    <div className={fila3}>
                        <div style={{
                        width: '80%',
                        }}>
                        <span className={priceTotalStyles}>{item.name}</span>
                        </div>
                        <div style={{
                        width: '20%',
                        }} className={containerColumnEndStyles}>
                        <button
                            
                        >
                            <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                        </button>
                        </div>
                    </div>
                </div>
            )
        
        )}
        </>}
        </div>
    )

}