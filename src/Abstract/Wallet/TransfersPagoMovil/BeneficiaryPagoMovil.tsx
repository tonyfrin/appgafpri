import React, { useState, useEffect } from 'react';;
import { css } from '@emotion/css';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { WalletBeneficiariesAttributesReturn } from '../../states/wallet/useGafpriApiWalletAccount';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { PaymentMethodsAttributesReturn } from '../../states/paymentMethods/useGafpriApiPaymentMethods';
import { HeaderPageReturn } from '@/Abstract/Header/HeaderPageReturn';
import LogoPagoMovil from '../../assets/img/logo-pago-movil.png';
import { formatPhoneNumberVzla } from '../../helpers';
import { CurrenciesAttributesReturn } from '../../states/currencies/useGafpriApiCurrencies';

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

type items = {
  name: string;
  email: string;
}

export function BeneficiaryPagoMovil() {
  const { useWallet, useLogin, useError, useCurrencies } = useTheme();
  const router = useRouter();
  const [beneficiaries, setBeneficiaries] = useState<WalletBeneficiariesAttributesReturn[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchBeneficiaries, setFetchBeneficiaries] = useState<boolean>(false);
  const [pagoMovilCurrencyIsReady, setPagoMovilCurrencyIsReady] = React.useState(false);
  const pagoMovilCurrencyId = '2';
  const items: items[] = [];

  beneficiaries.map((item) => {
    if(item.email !== null && item.name !== null && item.email !== '' && item.name !== '' && item.email !== undefined && item.name !== undefined){
      items.push({
        name: item.name,
        email: item.email,
      });
    }
  });

  const itemsFilter: WalletBeneficiariesAttributesReturn[] = [] 
  
  beneficiaries.forEach(beneficiary => {
      if ( 
        (beneficiary.phone && beneficiary.phone.includes(useWallet.attributesTransfersPagoMovil.states.findValue)) ||
        (beneficiary.name && beneficiary.name.toLowerCase().includes(useWallet.attributesTransfersPagoMovil.states.findValue))
      ) {
          itemsFilter.push(beneficiary);
      }
  });

  const next = async (beneficiary: WalletBeneficiariesAttributesReturn) => {
    useWallet.attributesTransfersPagoMovil.actions.setBeneficiary(beneficiary);
    useWallet.pagesTransfersPagoMovil.actions.onAmount();
  }

  function statusCheck(objects: PaymentMethodsAttributesReturn[]): boolean {
    return objects.some(obj => obj.posts.status === 'complete');
  }

  const deleteBeneficiary = async (id: string) => {
    try {
      setFetchBeneficiaries(true);
      const data = await useWallet.account.actions.deleteBeneficiaryZelle(id);
      if(data && data.success){
        try {
          
          const data = await useWallet.account.actions.getBeneficiaries('pagoMovil');
          if(data && data.success && data.items){
              setBeneficiaries(data.items);
          } else{
              setBeneficiaries([]);
          }
        } catch (error) {
            console.error('Error fetching data:', error);
            setBeneficiaries([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally{
      setFetchBeneficiaries(false);
    }
  }

  
    const returnInit = async () => {
      await router.push('/billetera/enviar');
      useWallet.pagesTransfersPagoMovil.actions.returnInit();
    }


    useEffect(() => {
        const fetchBeneficiaries = async () => {
          try {
              setFetchBeneficiaries(true);
              const data = await useWallet.account.actions.getBeneficiaries('pagoMovil');
              if(data && data.success && data.items){
                  setBeneficiaries(data.items);
              } else{
                  setBeneficiaries([]);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
              setBeneficiaries([]);
          } finally{
              setFetchBeneficiaries(false);
          }
        }

        fetchBeneficiaries();
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      const getPagoMovilCurrencyFetch = async () => {
        if(useLogin.data.states.token && !pagoMovilCurrencyIsReady){
          
            try{
              setPagoMovilCurrencyIsReady(false);
              const currency = await useCurrencies.api.actions.getCurrency(pagoMovilCurrencyId);
              if(currency && currency.success){
                useWallet.attributesTransfersPagoMovil.actions.setCurrency(currency.item);
                setPagoMovilCurrencyIsReady(true);
              }
            } catch (error) {
              console.log(error);
              useWallet.attributesTransfersPagoMovil.actions.setCurrency(null);
              setPagoMovilCurrencyIsReady(false);
            } 
        }
      }

      getPagoMovilCurrencyFetch();
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
          <div>
            {fetching || !pagoMovilCurrencyIsReady ? <Loading /> :
              <>
                <Error 
                  error={useError.states.error}
                />
                <HeaderPageReturn 
                  title={'Envío Pago Movil (Bs)'}
                  onClick={returnInit}
                  image={{
                    src: LogoPagoMovil.src,
                    backgroundColor: '#ebebeb',
                  }}
                />
                <div style={{
                  margin: '1em 0px'
                }}>
                <div><h1 className={title1AppStyles} style={{
                  textAlign: 'center',
                  padding: '0.3em',
                  fontSize: '1em',
                }}>Buscar Beneficiario</h1></div>
                      <InputAppContainer 
                        inputProps={{
                          placeholder: 'Nombre o Teléfono',
                          type: 'text',
                          value: useWallet.attributesTransfersPagoMovil.states.findValue,
                          onChange: (e) => useWallet.attributesTransfersPagoMovil.actions.setFindValue(e.target.value.toLowerCase()),
                        }}
                      />
                </div>
                <div>
                <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '1em'}} className={title1AppStyles}>{
                    itemsFilter && itemsFilter.length > 0 ? 'Beneficiarios Agregados' : 'Agrega un nuevo beneficiario'
                  
                }</h1>
                <div style={{
                  border: '1px solid #e1e1e1',
                  borderRadius: '10px',
                  margin: 'auto',
                  width: '90%',
                  overflow: 'auto',
                  height: '40vh',
                  padding: '0.6em 0px',
                }}>
                  {fetchBeneficiaries ? 
                      <Loading 
                        divStyle={{
                          border: '3px solid #eee',
                          borderTop: '3px solid #077bb4',
                          width: '40px',
                          height: '40px',
                        }}
                      /> :
                    <>
                    {itemsFilter && itemsFilter.length > 0 && itemsFilter.map((item, index) => {
                      const verified: boolean = statusCheck(item.paymentMethods)
                      return (
                      <div key={`bene-${index}`} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: '#ebebeb',
                        padding: '5px',
                        borderRadius: '10px',
                        margin: '5px',
                        cursor: 'pointer',
                        alignItems: 'center'
                      }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '100%',
                          background: '#324d7f',
                          margin: '0 10px',
                          display: 'flex',
                        }}>
                          <span style={{
                            color: '#FFF',
                            fontSize: '1.5em',
                            margin: 'auto',
                            textTransform: 'uppercase',
                          }}>{item.name.substring(0, 1)}</span>
                        </div>
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'left',
                            width: verified ? '80%' : '60%'
                          }}
                          onClick={() => next(item)}
                        >
                          <span style={{
                            fontSize: '0.8em',
                            fontWeight: 600,
                          }}>{item.name}</span>
                          <span style={{
                            fontSize: '0.6em',
                            fontWeight: 400,
                          }}>{formatPhoneNumberVzla(`${item.phone}`)}</span>
                          <span style={{
                            fontSize: '0.6em',
                            fontWeight: 400,
                          }}>{item.bankName}</span>
                          <span style={{
                            fontSize: '0.6em',
                            fontWeight: 400,
                          }}>{`${item.accountNumber}`}</span>
                        </div>
                        {!verified &&
                          <div style={{
                            width: '20%',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}>
                            <span 
                              style={{
                                fontSize: '0.4em',
                                margin: 'auto',
                                padding: '5px',
                                background: '#c12429',
                                color: '#FFF',
                                borderRadius: '5px',
                              }}
                              onClick={() => deleteBeneficiary(`${item.id}`)}
                            >Borrar</span>
                          </div>
                        }
                      </div>)})}

                      
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          
                          padding: '5px',
                          borderRadius: '10px',
                          margin: '5px',
                          cursor: 'pointer'
                        }}
                        >
                          
                          <ButtonAppMobile 
                            title={'Agregar beneficiario'}
                            contentStyles={{
                              fontSize: '1em'
                            }}
                            containerProps={{
                              onClick: () => useWallet.pagesTransfersPagoMovil.actions.onBeneficiaryAdd()
                            }}
                            
                          />
                        </div>
                    
                    </>
                  }

                </div>
                  
                    
                </div>
              </>
            }
          </div>
    </>
  );
}