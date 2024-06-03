import React from 'react';
import { css } from '@emotion/css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';


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


const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`


export const InitProfile = () => {
    const { useLogin, useProfile } = useTheme();

   
    const menu: {name: string, action?: () => void, href?: string;}[]= [
        {
            name: 'Direcciones',
            href: '/perfil/direcciones',
        },
        {
            name: 'Contraseña',
            action: () => useProfile.pages.actions.onPassword(),
        },
        {
            name: 'Teléfono',
            href: '/perfil/telefono',
        },
        {
            name: 'Pedidos',
            action: () => useProfile.pages.actions.onOrderList(),
        },
        {
            name: 'Cerrar sesion',
            action: () => useLogin.data.actions.logout(),
        }
    ]

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1em auto 100px auto',
        }}>
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
                    src={useLogin.data.states.currentUser?.photo || ''} 
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
                    {`${useLogin.data.states.currentUser?.name} ${useLogin.data.states.currentUser?.lastName}`}
                </h1>
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
        </div>
    )

}