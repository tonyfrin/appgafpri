import React from 'react';
import { css } from '@emotion/css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { formatPhoneNumber } from '../helpers';
import { Loading } from '../Loading';
import { MySitesEmpty } from './MySitesEmpty';


const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
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

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const containerColumnEndStyles = css`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  align-items: flex-start;
`

export function MySitesList() {
  const { useSites } = useTheme();

  const items = useSites.api.states.mySites;

  items?.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <> 

      {!useSites.api.states.mySitesIsReady ? <Loading /> :
        <>
          {useSites.api.states.mySites && useSites.api.states.mySites.length > 0 ?
            <div
              style={{
                marginBottom: '220px'
              }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1em 0px',
                    width: '90%',
                    margin: 'auto',
                    borderBottom: '1px solid #e1e1e1'
                }}> 
                    <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Mis Tiendas</h1>
                    <Link
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}
                      href='/billetera'
                    >
                      <FiChevronLeft 
                          className={arrowStyle}
                      />
                    </Link>
                </div>
                <div
                  style={{
                    marginTop: '1em',
                  }}
                >
                  {items && items.length > 0 && items.map((item, index) => (
                    <>
                      <Link 
                        href={'/mis-tiendas/tienda/[id]'} 
                        as={`/mis-tiendas/tienda/${item.id}`} 
                        className={fila3} 
                        key={`address-${index}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >  
                        <div style={{
                          width: '80%',
                          display: 'flex',
                          flexDirection: 'column',
                        }} className={containerColumnCenterStyles}>
                          <span className={priceTotalStyles}>{item.tradename}</span>
                          <span className={priceStyles}>
                            {`${item.address1} ${item.address2}`}</span>
                            <span className={priceStyles}>
                            {item.city}</span>
                          {item.phone && <a href={`tel:+58${item.phone}`} className={priceStyles} style={{ textDecoration: 'none', color: '#07b2e7', fontWeight: 600}}>{formatPhoneNumber(item.phone || '')}</a>}
                        </div>
                        <div style={{
                          width: '20%',
                          }} className={containerColumnEndStyles}>
                          <button
                              
                          >
                              <IoIosAddCircleOutline style={{margin: 'auto', fontSize: '2em'}}/>
                          </button>
                          </div>
                      </Link>
                    </>
                  ))}
                </div>
            </div>
          : <MySitesEmpty />}
        </>
      }
    </>
  );
}