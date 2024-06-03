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
                    justifyContent: 'space-between',
                    padding: '1em 0px',
                    width: '90%',
                    margin: 'auto',
                    borderBottom: '1px solid #e1e1e1'
                }}> 
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
                    itemsFilter && itemsFilter.length > 0 ? 'Recurrente' : 'Agrega un nuevo beneficiario'
                  
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
                    {itemsFilter && itemsFilter.length > 0 && itemsFilter.map((item, index) => (
                      <div key={`bene-${index}`} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: '#ebebeb',
                        padding: '5px',
                        borderRadius: '10px',
                        margin: '5px',
                        cursor: 'pointer'
                      }}
                      onClick={() => next(item)}
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
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          textAlign: 'left',
                          width: '80%'
                        }}>
                          <span style={{
                            fontSize: '0.8em',
                            fontWeight: 600,
                          }}>{item.name}</span>
                          <span style={{
                            fontSize: '0.6em',
                            fontWeight: 400,
                          }}>{item.email ? item.email : formatPhoneNumber(`${item.phone}`)}</span>
                        </div>
                      </div>))}

                      
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