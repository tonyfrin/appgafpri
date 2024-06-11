import React, { useState, useEffect, use } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { FiChevronLeft } from 'react-icons/fi';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import Image from 'next/image';
import LogoZelle from '../../assets/img/logo-zelle.png';

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

export function BeneficiaryZelleAdd() {
  const { useWallet, useError } = useTheme();
  const [fetching, setFetching] = useState<boolean>(false);

  const changeEmail = (email: string) => {
    useWallet.attributesTransfersZelle.actions.changeEmail(email);
    useWallet.attributesTransfersZelle.actions.changePhone('');
  }

  const changePhone = (phone: string) => {
    useWallet.attributesTransfersZelle.actions.changePhone(phone);
    useWallet.attributesTransfersZelle.actions.changeEmail('');
  }

  const add = async (): Promise<void> => {
      if(useWallet.attributesTransfersZelle.actions.validationButtonBeneficiaryAdd()) {
        try{
          setFetching(true);
          useWallet.pagesTransfersZelle.actions.onFetching();
          const data = await useWallet.account.actions.addBeneficiaryZelle();
      
          if(data && data.success) {
            useWallet.attributesTransfersZelle.actions.setBeneficiary(data.item);
            useWallet.pagesTransfersZelle.actions.onAmount();
          } else{
            useError.actions.changeError([`${data.message}`]);
            useWallet.pagesTransfersZelle.actions.onBeneficiaryAdd();
          }
        }catch(err) {
          useError.actions.changeError([`${err}`]);
          useWallet.pagesTransfersZelle.actions.onBeneficiaryAdd();
        } finally {
          setFetching(false);
        }
    }
  };

  useEffect(() => {
    useWallet.attributesTransfersZelle.actions.validationPhone(useWallet.attributesTransfersZelle.states.phone);
    useWallet.attributesTransfersZelle.actions.validationEmail(useWallet.attributesTransfersZelle.states.email);
  /* eslint-disable */
  }, [
    useWallet.attributesTransfersZelle.states.email, 
    useWallet.attributesTransfersZelle.states.phone, 
  ]);

  useEffect(() => {
    useWallet.attributesTransfersZelle.actions.validationButtonBeneficiaryAdd();
  }, [
    useWallet.attributesTransfersZelle.states.email, 
    useWallet.attributesTransfersZelle.states.phone, 
    useWallet.attributesTransfersZelle.states.name,
    useWallet.attributesTransfersZelle.states.emailValid,
    useWallet.attributesTransfersZelle.states.phoneValid,
  ]); // eslint-disable-line

  

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
                    <div style={{
                      textDecoration: 'none',
                      display: 'flex',
                    }}>
                    <FiChevronLeft 
                        className={arrowStyle}
                        onClick={useWallet.pagesTransfersZelle.actions.returnInit}
                    />
                    </div>
                </div>
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
                          value: useWallet.attributesTransfersZelle.states.name,
                          onChange: (e) => useWallet.attributesTransfersZelle.actions.setName(e.target.value),
                        }}
                    />
                    {useWallet.attributesTransfersZelle.states.phone === '' &&
                    <InputAppContainer 
                        title= 'Ingrese un email valido'
                        inputProps={{
                          title: 'Email',
                          placeholder: 'Email',
                          type: 'text',
                          value: useWallet.attributesTransfersZelle.states.email,
                          onChange: (e) => changeEmail(e.target.value.toLowerCase()),
                        }}
                        containerStyles={{
                          margin: '1em auto'
                        }}
                    />
                    }
                    {useWallet.attributesTransfersZelle.states.email === '' &&
                      <InputAppContainer 
                          title= 'Teléfono'
                          inputProps={{
                            placeholder: 'Teléfono',
                            type: 'number',
                            value: useWallet.attributesTransfersZelle.states.phone,
                            onChange: (e) => changePhone(e.target.value),
                          }}
                          containerStyles={{
                            margin: '1em auto'
                          }}
                      />
                    }
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