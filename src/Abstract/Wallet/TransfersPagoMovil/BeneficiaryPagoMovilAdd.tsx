import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { HeaderPageReturn } from '@/Abstract/Header/HeaderPageReturn';
import LogoPagoMovil from '../../assets/img/logo-pago-movil.png';
import { scrollToTop } from '../../helpers';

const imageStyles = css`
  width: 80%;
  height: auto;
`

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

export function BeneficiaryPagoMovilAdd() {
  const { useWallet, useError } = useTheme();
  const [fetching, setFetching] = useState<boolean>(false);

  const add = async (): Promise<void> => {
      if(useWallet.attributesTransfersPagoMovil.actions.validationButtonBeneficiaryAdd()) {
        try{
          setFetching(true);
          useWallet.pagesTransfersPagoMovil.actions.onFetching();
          const data = await useWallet.account.actions.addBeneficiaryPagoMovil();
      
          if(data && data.success) {
            useWallet.attributesTransfersPagoMovil.actions.setBeneficiary(data.item);
            useWallet.pagesTransfersPagoMovil.actions.onAmount();
            
          } else{
            useError.actions.changeError([`${data.message}`]);
            useWallet.pagesTransfersPagoMovil.actions.onBeneficiaryAdd();
          }
        }catch(err) {
          useError.actions.changeError([`${err}`]);
          useWallet.pagesTransfersPagoMovil.actions.onBeneficiaryAdd();
          
        } finally {
          setFetching(false);
          scrollToTop();
        }
    }
  };

  useEffect(() => {
    useWallet.attributesTransfersPagoMovil.actions.validationPhone(useWallet.attributesTransfersPagoMovil.states.phone);
    useWallet.attributesTransfersPagoMovil.actions.validationAccountNumber(useWallet.attributesTransfersPagoMovil.states.accountNumber);
  /* eslint-disable */
  }, [
    useWallet.attributesTransfersPagoMovil.states.accountNumber, 
    useWallet.attributesTransfersPagoMovil.states.phone, 
  ]);

  useEffect(() => {
    useWallet.attributesTransfersPagoMovil.actions.validationButtonBeneficiaryAdd();
  }, [
    useWallet.attributesTransfersPagoMovil.states.accountNumber, 
    useWallet.attributesTransfersPagoMovil.states.phone, 
    useWallet.attributesTransfersPagoMovil.states.name,
    useWallet.attributesTransfersPagoMovil.states.accountNumberValid,
    useWallet.attributesTransfersPagoMovil.states.phoneValid,
    useWallet.attributesTransfersPagoMovil.states.bankName,
  ]); // eslint-disable-line
  

  return (
    <>
          <div 
            style={{
              marginBottom: '300px'
            }}
          >
            {fetching ? <Loading /> :
              <>
                <Error 
                  error={useError.states.error}
                />
               <HeaderPageReturn 
                  title={'Envío Pago Movil (Bs)'}
                  onClick={() => useWallet.pagesTransfersPagoMovil.actions.onBeneficiary()}
                  image={{
                    src: LogoPagoMovil.src,
                    backgroundColor: '#ebebeb',
                  }}
                />
                <div>
                    <div>
                      <h1
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: '1em',
                          textAlign: 'center',
                          margin: '1em auto'
                        }}
                      >Agregar Beneficiario</h1>
                    </div>
                    <InputAppContainer 
                        title='Nombre y apellido'
                        inputProps={{
                          placeholder: 'Nombre y apellido',
                          type: 'text',
                          value: useWallet.attributesTransfersPagoMovil.states.name,
                          onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.setName(e.target.value),
                        }}
                    />
                      <InputAppContainer 
                          title= 'Teléfono'
                          description='Sin el 0 por delante. (Solo télefonos de Venezuela) Ejemplo: 4141234567'
                          inputProps={{
                            placeholder: 'Teléfono',
                            type: 'number',
                            onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.changePhone(e.target.value),
                          }}
                          containerStyles={{
                            margin: '1em auto'
                          }}
                      />
                      <InputAppContainer 
                          title= 'Banco'
                          inputProps={{
                            placeholder: 'Banco',
                            type: 'text',
                            value: useWallet.attributesTransfersPagoMovil.states.bankName,
                            onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.setBankName(e.target.value),
                          }}
                          containerStyles={{
                            margin: '1em auto'
                          }}
                      />
                      <InputAppContainer 
                          title= 'Cédula de identidad o Rif'
                          description='solo números, Ejemplo: 12345678'
                          inputProps={{
                            placeholder: 'Cédula o Rif',
                            type: 'number',
                            value: useWallet.attributesTransfersPagoMovil.states.accountNumber,
                            onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.changeAccountNumber(e.target.value),
                          }}
                          containerStyles={{
                            margin: '1em auto'
                          }}
                      />
                    
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <ButtonAppMobile 
                        title="Agregar"
                        containerProps={{
                          id: 'beneficiary-add-button',
                          onClick: () => add()
                        }}
                      />
                    </div>
                </div>
              </>
            }
          </div>
    </>
  );
}