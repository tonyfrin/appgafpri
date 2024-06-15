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

const textResumeStyles = css`
  font-size: 0.7em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
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

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

type account = {
  id: string;
  name: string;
  balance: string;
}

export function AmountCashAdvance() {
  const { useWallet, siteOptions } = useTheme();
  const router = useRouter();

  const accounts: account[] = [];

  useWallet.attributes.states.walletAccount.forEach((account) => {
    accounts.push({
      id: account.postsId,
      name: account.name,
      balance: account.available,
    });
  });

  const accountOptions = accounts.map((account) => {
    return { value: account.id, label: account.name };
  });

  accountOptions.unshift({ value: '', label: 'Selecciona una cuenta' });

  const labelAccount = accountOptions.find(option => option.value === useWallet.attributesTransfers.states.account?.id)?.label || 'Selecciona una cuenta';

  const changeAccount = (id: string): void => {
    const newAccount = accounts.find((account) => `${account.id}` === `${id}`);
    if (newAccount) {
        useWallet.attributesCashAdvance.actions.setAccount(newAccount);
    } else{
        useWallet.attributesCashAdvance.actions.setAccount(null);
    }
  };

  useEffect(() => {
    useWallet.attributesCashAdvance.actions.validationButtonAmount();
  }, [useWallet.attributesCashAdvance.states.amount, useWallet.attributesCashAdvance.states.account]); // eslint-disable-line

  const next = (): void => {
    if (useWallet.attributesCashAdvance.actions.validationButtonAmount()) {
      useWallet.pagesCashAdvance.actions.onStore();
      scrollToTop();
    }
  }


  const returnInit = async (): Promise<void> => {
    await router.push('/billetera/enviar');
    useWallet.pagesCashAdvance.actions.returnInit();
  }

  const changeAmount = (value: string): void => {
    useWallet.attributesCashAdvance.actions.setAmount(value);
  }

  return (
    <>
        
                <HeaderPageReturn 
                  title={'Avance de Efectivo'}
                  onClick={returnInit}
                  image={{
                    src: LogoCash.src,
                    backgroundColor: '#008000',
                  }}
                />
                  
                 
          <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1em 0px 400px 0px',
          }}
        >
          <InputAppAmount
              inputProps={{
                placeholder: '0.00',
                type: 'text',
                functionChange: changeAmount,
              }}
              amountMax={20000}
              symbol={siteOptions.CURRENCY_SYMBOL}
              title='Monto a Retirar'
              containerStyles={{
                margin: '1em auto',
              }}
          />
          <InputAppContainer 
                inputProps={{
                  placeholder: 'Nota interna (opcional)',
                  type: 'text',
                  value: useWallet.attributesCashAdvance.states.note,
                  onChange: (e) => useWallet.attributesCashAdvance.actions.changeNote(e.target.value)
                }}
                containerStyles={{
                  customStyles: `
                  width: 95%; 
                  margin: 1em auto;`
                }}
          />
            <div style={{
              width: '85%',
              margin: 'auto',
              textAlign: 'center'
            }}>
              <span className={textInfoTitleStyles}>desde:</span>
            </div>
            <SelectApp
              options={accountOptions}
              value={labelAccount}
              onChange={(e) => changeAccount(e)}
            />
             <div style={{
                  width: '85%',
                  margin: 'auto',
                  textAlign: 'center'
                }}>
                  {useWallet.attributesCashAdvance.states.account && 
                    <span className={textInfoTitleStyles} style={{
                      textAlign: 'center',
                      color: '#000'
                    }}>Saldo disponible: {decimalFormatPriceConverter(
                      useWallet.attributesCashAdvance.states.account?.balance || 0,
                      siteOptions.DECIMAL_NUMBERS,
                      siteOptions.CURRENCY_SYMBOL,
                      siteOptions.CURRENCY_LOCATION
                    )}</span>
                  }
                </div>
        </div>
        <div className={containerButtonCheckOutStyle}>
            <ButtonAppMobile 
                title="Cancelar"
                containerStyles={{
                    width: '45%',
                    backgroundColor: '#c12429'
                }}
                contentStyles={{
                    fontSize: '1.2em',
                    padding: '0.9em',
                }}
                containerProps={{
                  onClick: () => returnInit()
                
                }}
            />
            <ButtonAppMobile 
                title="Siguiente"
                containerStyles={{
                    width: '45%'
                }}
                contentStyles={{
                    fontSize: '1.2em',
                    padding: '0.9em',
                }}
                containerProps={{
                  onClick: () => next(),
                  id: 'amount-button-cash-advance'
                }}
            />
        </div>
    </>
  );
}