import React, { useState, useEffect } from 'react';;
import { css } from '@emotion/css';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { WalletBeneficiariesAttributesReturn } from '../../states/wallet/useGafpriApiWalletAccount';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { formatPhoneNumber } from '../../helpers';
import { PaymentMethodsAttributesReturn } from '../../states/paymentMethods/useGafpriApiPaymentMethods';
import Image from 'next/image';
import LogoZelle from '../../assets/img/logo-zelle.png';

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

const imageStyles = css`
  width: 80%;
  height: auto;
`

type items = {
  name: string;
  email: string;
}

export function BeneficiaryZelle() {
  const { useWallet, useLogin, useError } = useTheme();
  const [beneficiaries, setBeneficiaries] = useState<WalletBeneficiariesAttributesReturn[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchBeneficiaries, setFetchBeneficiaries] = useState<boolean>(false);

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
      if ((beneficiary.email && beneficiary.email.toLowerCase().includes(useWallet.attributesTransfersZelle.states.findValue)) || 
        (beneficiary.phone && beneficiary.phone.includes(useWallet.attributesTransfersZelle.states.findValue)) ||
        (beneficiary.name && beneficiary.name.toLowerCase().includes(useWallet.attributesTransfersZelle.states.findValue))
      ) {
          itemsFilter.push(beneficiary);
      }
  });

  const next = async (beneficiary: WalletBeneficiariesAttributesReturn) => {
    useWallet.attributesTransfersZelle.actions.setBeneficiary(beneficiary);
    useWallet.pagesTransfersZelle.actions.onAmount();
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
          
          const data = await useWallet.account.actions.getBeneficiaries('zelle');
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

  


    useEffect(() => {
        const fetchBeneficiaries = async () => {
          try {
              setFetchBeneficiaries(true);
              const data = await useWallet.account.actions.getBeneficiaries('zelle');
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

  return (
    <>
          <div>
            {fetching ? <Loading /> :
              <>
                <Error 
                  error={useError.states.error}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '1em 0px',
                    width: '90%',
                    margin: 'auto',
                    borderBottom: '1px solid #e1e1e1',
                    alignItems: 'center'
                }}> 
                     <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(107 29 207)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0.1em'
                      }}
                    >
                      <Image
                        src={LogoZelle.src}
                        alt={`zelle`}
                        width={15}
                        height={15}
                        className={imageStyles}
                      />
                    </div>
                    <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Transferencia Zelle</h1>
                    <Link 
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                      }}
                      href={'/billetera/enviar'}
                    >
                    <FiChevronLeft 
                        className={arrowStyle}
                        onClick={useWallet.pagesTransfersZelle.actions.returnInit}
                    />
                    </Link>
                </div>
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
                          placeholder: 'Email o Teléfono',
                          type: 'text',
                          value: useWallet.attributesTransfersZelle.states.findValue,
                          onChange: (e) => useWallet.attributesTransfersZelle.actions.setFindValue(e.target.value.toLowerCase()),
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
                        cursor: 'pointer'
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
                          }}>{item.email ? item.email : formatPhoneNumber(`${item.phone}`)}</span>
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
                              onClick: () => useWallet.pagesTransfersZelle.actions.onBeneficiaryAdd()
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