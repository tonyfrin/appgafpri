import React, { use, useEffect } from 'react';;
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { SelectApp } from '../../Select/SelectApp';
import { decimalFormatPriceConverter, formatPhoneNumberVzla, scrollToTop } from '../../helpers';
import { InputAppAmount } from '../../Input/InputAppAmount';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import { useRouter } from 'next/router';
import LogoCash from '../../assets/img/logo-cash.png';
import { SitesAttributesReturn } from '@/Abstract/states/sites/useGafpriApiSites';

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

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
`

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

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
    z-index: 996;
    display: flex;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
`

const textInfoTitleStyles = css`
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #9e9e9e;
`

const priceStyles = css`
  font-size: 0.8em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

export function StoreCashAdvance() {
  const { useWallet, siteOptions, useSites } = useTheme();
  const [city, setCity] = React.useState<string>('');

  useEffect(() => {
    useWallet.attributesCashAdvance.actions.validationButtonAmount();
  }, [useWallet.attributesCashAdvance.states.amount, useWallet.attributesCashAdvance.states.account]); // eslint-disable-line

  const next = (store: SitesAttributesReturn): void => {
    useWallet.attributesCashAdvance.actions.setStore(store);
      useWallet.pagesCashAdvance.actions.onTime();
      scrollToTop();
  }

  const items: SitesAttributesReturn[] = [];

  const sites = useSites.api.states.sites;

  sites?.forEach((site) => {
    if(`${site.id}` !== `${siteOptions.id}` && site.city === city){
        items.push(site);
    }
  });


  const returnInit = async (): Promise<void> => {
    useWallet.pagesCashAdvance.actions.returnInit();
  }



  return (
    <>
        
                <HeaderPageReturn 
                  title={'Selección de Tienda'}
                  onClick={returnInit}
                  image={{
                    src: LogoCash.src,
                    backgroundColor: '#008000',
                  }}
                />

                <div>
                  <div style={{
                    margin: '5px auto',
                    padding: '0px',
                    display: 'flex',
                  }}>
                    <SelectApp
                      options={[
                        { value: '', label: 'Seleccione Ciudad' },
                        { value: 'Maracaibo', label: 'Maracaibo' },
                        { value: 'San Francisco', label: 'San Francisco' },
                    ]}
                      value={city}
                      onChange={(e) => setCity(e)}
                    />
                  </div>
                </div>
                <div 
                  style={{
                    margin: '2em 0px 300px 0px'
                  }}
                >
                  {items && items.length > 0 && items.map((item, index) => (
                  <>
                  <div className={fila3} key={`address-${index}`}>
                    <div style={{
                      width: '10%',
                    }}>
                      <input
                          type="checkbox"
                          className={checkboxStyles}
                          checked={item.id === useWallet.attributesCashAdvance.states.store?.id}
                          onChange={() => next(item)}
                        />
                    </div>
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
                    </div>
                  </div>
                  </>
                  ))}
                </div>
                  
    </>
  );
}