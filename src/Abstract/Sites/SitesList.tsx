import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { SitesAttributesReturn } from '../states/sites/useGafpriApiSites';
import { formatPhoneNumber } from '../helpers';


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

export function SitesList() {
  const { useCheckOut, useSites, siteOptions } = useTheme();


  const items: SitesAttributesReturn[] = [];
  const sites = useSites.api.states.sites;

  sites?.forEach((site) => {
    if(`${site.id}` !== `${siteOptions.id}`){
        items.push(site);
    }
  });


  items?.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <> 
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
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Tiendas Afiliadas</h1>
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
                        onClick={useCheckOut.pages.actions.onInit}
                    />
                  </Link>
              </div>
              <h1
                style={{
                  textAlign: 'center',
                  padding: '0.3em'
                }}
                className={title1AppStyles}
              >¿Qué puedes hacer?</h1>
              <div className={fila3}>
                  <div style={{
                    width: '10%',
                  }}>
                    <input
                        type="checkbox"
                      className={checkboxStyles}
                      checked={true}
                      />
                  </div>
                  <div style={{
                    width: '80%',
                    display: 'flex',
                  }} className={containerColumnCenterStyles}>
                    <span className={priceTotalStyles}>Comprar</span>
                    <span className={priceStyles}>Utiliza tu saldo disponible en nuestras tiendas afiliadas para realizar pagos y compras</span>
                  </div>
              </div>
              <div className={fila3}>
                  <div style={{
                    width: '10%',
                  }}>
                    <input
                        type="checkbox"
                      className={checkboxStyles}
                      checked={true}
                      />
                  </div>
                  <div style={{
                    width: '80%',
                    display: 'flex',
                  }} className={containerColumnCenterStyles}>
                    <span className={priceTotalStyles}>Retirar</span>
                    <span className={priceStyles}>Puedes retirar en efectivo parte o la totilidad de tu saldo disponible en cualquiera de nuestras tiendas afiliadas</span>
                  </div>
              </div>
              <div className={fila3}>
                  <div style={{
                    width: '10%',
                  }}>
                    <input
                        type="checkbox"
                      className={checkboxStyles}
                      checked={true}
                      />
                  </div>
                  <div style={{
                    width: '80%',
                    display: 'flex',
                  }} className={containerColumnCenterStyles}>
                    <span className={priceTotalStyles}>Recargar</span>
                    <span className={priceStyles}>Puedes recargar en efectivo tu saldo en cualquiera de nuestras tiendas afiliadas</span>
                  </div>
              </div>
              <div className={fila3}>
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Tiendas</h1>
              </div>
              {items && items.length > 0 && items.map((item, index) => (
                <>
                <div className={fila3} key={`address-${index}`}>
                  
                  <div style={{
                    width: '90%',
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
              </div>
                </>
              ))}
          </div>
    </>
  );
}