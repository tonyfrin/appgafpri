import React, { useEffect} from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, formatPhoneNumber, scrollToTop } from '../../helpers';
import { FiChevronLeft } from 'react-icons/fi';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
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

const textResumeStyles = css`
  font-size: 1em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
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

export function ConfirmationTransfersZelle() {
  const { useWallet, siteOptions, useError } = useTheme();
  const [fetching, setFetching] = React.useState<boolean>(false);

  const returnToAmount = () => {
    useWallet.attributesTransfersZelle.actions.setAccount(null);
    useWallet.attributesTransfersZelle.actions.setAmount('');
    useWallet.attributesTransfersZelle.actions.changeNote('');
    useWallet.pagesTransfersZelle.actions.onAmount();
  }

  const add =  async (): Promise<void> => {
    if(useWallet.attributesTransfersZelle.actions.validationResponsabilitytButton()){
      try{
        setFetching(true);
        useWallet.pagesTransfersZelle.actions.onFetching();
        const data = await useWallet.account.actions.addTransferZelle();
        if(data && data.success){
          await useWallet.attributes.actions.getWalletAccount();
          await useWallet.attributes.actions.getEntities();
          useWallet.pagesTransfersZelle.actions.onSuccess();
        } else{
    
          useError.actions.changeError([data.message]);
          useWallet.pagesTransfersZelle.actions.onCheck();
        }
      } catch (error) {
        console.log(error);
        useError.actions.changeError(['Error al realizar la transferencia']);
        useWallet.pagesTransfersZelle.actions.onCheck();
      } finally {
        setFetching(false);
        scrollToTop();
      }
    }
  }

  useEffect(() => {
    useWallet.attributesTransfersZelle.actions.validationResponsabilitytButton();
  }, [useWallet.attributesTransfersZelle.states.responsability]); // eslint-disable-line react-hooks/exhaustive-deps
  

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
                        <FiChevronLeft 
                            className={arrowStyle}
                            onClick={returnToAmount}
                        />
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                      }}
                    ><h1 className={title1AppStyles} style={{
                      textAlign: 'center',
                    }}>Verificación</h1></div>
                          <div
                              style={{
                                margin: '0.5em auto',
                              }}
                            >
                              <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>Enviar a:</h1>
                          </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          background: '#ebebeb',
                          padding: '5px',
                          borderRadius: '10px',
                          margin: '5px auto',
                          cursor: 'pointer',
                          width: '70%',
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
                            }}>{useWallet.attributesTransfersZelle.states.beneficiary?.name.substring(0, 1)}</span>
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'left',
                            width: '80%',
                            overflow: 'hidden',
                          }}>
                            <span style={{
                              fontSize: '0.8em',
                              fontWeight: 600,
                            }}>{useWallet.attributesTransfersZelle.states.beneficiary?.name}</span>
                            <span style={{
                              fontSize: '0.6em',
                              fontWeight: 400,
                            }}>{useWallet.attributesTransfersZelle.states.beneficiary?.phone ? formatPhoneNumber(useWallet.attributesTransfersZelle.states.beneficiary.phone) :
                              useWallet.attributesTransfersZelle.states.beneficiary?.email
                            }</span>
                          </div>
                          </div>
                          <div
                            style={{
                              margin: '0.5em auto 0px auto',
                            }}
                          >
                            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>Monto:</h1>
                          </div>
                          <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '85%',
                            margin: 'auto',
                            textAlign: 'center'
                          
                          }}
                        >
                          <span className={textResumeStyles} style={{fontWeight: '600', fontSize: '2em', textAlign: 'center'}}>{decimalFormatPriceConverter(
                              useWallet.attributesTransfersZelle.states.amount || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}</span>
                        </div>
                        <div
                            style={{
                              margin: '0.5em auto 0px auto',
                            }}
                          >
                            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '0.8em', fontWeight: 400}} className={title1AppStyles}>Desde:</h1>
                          </div>
                          <div
                            style={{
                              margin: '0.5em auto 0px auto',
                              display: 'flex',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '1em', fontWeight: 600}} className={title1AppStyles}>{useWallet.attributesTransfersZelle.states.account?.name}</h1>
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >Saldo: {decimalFormatPriceConverter(
                              useWallet.attributesTransfersZelle.states.account?.balance || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}</span>
                          </div>
                          <div
                            style={{
                              margin: '2em auto 0px auto',
                              display: 'flex',
                              justifyContent: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >Nota:</span>
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >{useWallet.attributesTransfersZelle.states.note}</span>
                            <div><h1 className={title1AppStyles} style={{marginTop: '1em', textAlign: 'center'}}>¿La información es correcta?</h1></div>

                            <div
                              style={{
                                display: 'flex',
                                width: '85%',
                                margin: 'auto',
                                border: '2px solid #eaeaea',
                                borderRadius: '15px',
                                padding: '2%',
                              }}
                            >
                              <div style={{
                                width: '10%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                              }}>
                                <input 
                                  type="checkbox"
                                  className={checkboxStyles}
                                  checked={useWallet.attributesTransfersZelle.states.responsability}
                                  onChange={() => useWallet.attributesTransfersZelle.actions.setResponsability(!useWallet.attributesTransfersZelle.states.responsability)}
                                />
                              </div>
                              <div style={{
                                width: '90%',
                                display: 'flex',
                              }}>
                                <span
                                  style={{
                                    textAlign: 'justify',
                                    fontSize: '0.6em',
                                    fontFamily: 'Poppins',
                                    lineHeight: '1.3',
                                    padding: '10px'
                                  }}
                                >{'Al marcar esta casilla, declaro que conozco a la persona a la que solicito que se le realice la transferencia mediante Zelle y autorizo a Gafpri Corp a efectuar dicha transferencia en mi nombre, utilizando mi saldo disponible en la billetera. Entiendo y acepto que Gafpri Corp no es responsable por el destino de los fondos una vez realizada la transferencia.'}</span>
                              </div>
                            </div>
                          </div>

                      <div style={{
                          display: 'flex',
                          margin: '1em',
                          textDecoration: 'none',
                      }}>
                          <ButtonAppMobile 
                              title="Enviar"
                              containerProps={{
                                id: 'responsability-zelle-button',
                                onClick: add,
                              }}
                          />
                      </div>
              </>
            }
          </div>
    </>
  );
}