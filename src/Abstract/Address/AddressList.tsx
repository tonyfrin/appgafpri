import React from 'react';
import { css } from '@emotion/css';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { FiChevronLeft } from 'react-icons/fi';
import { UseGafpriCheckOutReturn } from '../states/checkout/useGafpriCheckOut';
import { AddressAttributesReturn } from '../states/user/address/useGafpriApiAddress';
import { UserAttributesReturn } from '../states/user/useGafpriApiUser';
import { useTheme } from '../context/ThemeContext';
import { BiMap } from 'react-icons/bi';
import Link from 'next/link';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
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
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
`

const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const checkboxStyles = css`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #aaa;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:checked {
    border-color: #000;
    background-color: #000;
  }

  &:checked::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 2px;
  }
`;

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 996;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
    padding: 1em 0px;
`

export type AddressListProps = {
  useCheckOut: UseGafpriCheckOutReturn;
  user: UserAttributesReturn;
}

type items = {
  id: string;
  name: string;
  fullAddress: string;
  address: AddressAttributesReturn;
}

type options = {
  value: string;
  label: string;
}

export function AddressList() {
  const { useAddress, useUser, useProfile } = useTheme();



  const user = useUser.api.states.user;

  if(!user){
    return null;
  }

  const items: items[] = useAddress.attributes.states.addressList;

  const entityOptions: options[] = useAddress.attributes.states.entityOptions;

  items.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <> 
          <div
            style={{
              marginBottom: '220px'
            }}
          >
            <Link 
              style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1em 0px',
                  width: '90%',
                  margin: 'auto',
                  borderBottom: '1px solid #e1e1e1',
                  textDecoration: 'none',
                  color: 'inherit',
              }}
              href={'/perfil'}
            > 
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Direcciones</h1>
                <FiChevronLeft 
                    className={arrowStyle}
                    onClick={useProfile.pages.actions.onInit}
                />
            </Link>
            
            {items.length === 0 ? 
            
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
                    >Por favor, agregue una nueva dirección para que pueda recibir delivery GRATIS</p>
                </div>
            
            :
              <>
                {items.map((item, index) => (
                  <>
                  <div className={fila3} key={`address-${index}`}>
                    <div style={{
                      width: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                    }} className={containerColumnCenterStyles}>
                      <span className={priceStyles}>{item.name}</span>
                      <span className={priceStyles}>{item.fullAddress}</span>
                    </div>
                    <Link 
                      style={{
                        width: '10%',
                        display: 'flex',
                        margin: 'auto',
                        textDecoration: 'none',
                        color: 'inherit',
                      }} 
                      className={containerColumnCenterStyles}
                      href="/perfil/direcciones/actualizar/[id]" 
                      as={`/perfil/direcciones/actualizar/${item.id}`}
                    >
                      <span style={{
                        fontSize: '0.6em',
                        color: '#314577',
                        cursor: 'pointer',
                        fontFamily: 'Poppins',
                      }}
                      >Editar</span>
                    </Link>
                </div>
                  </>
                ))}
              </>
            }

            {entityOptions.length > 0 &&
              <Link
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: 'auto',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                href={'/perfil/direcciones/agregar'}
              >
                <ButtonAppMobile 
                    title="Agregar Dirección"
                    containerStyles={{
                      backgroundColor: '#314577'
                    }}
                />
              </Link>
            }
            
          </div>
    </>
  );
}