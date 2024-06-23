import React, { useEffect} from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { decimalFormatPriceConverter, formatPhoneNumberVzla, scrollToTop } from '../../helpers';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { HeaderPageReturn } from '../../Header/HeaderPageReturn';
import LogoPagoMovil from '../../assets/img/logo-pago-movil.png';

const priceTotalStyles = css`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
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

const containerColumnCenterStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
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

const fila3 = css`
  border: 2px solid rgb(234, 234, 234);
  border-radius: 10px;
  padding: 1em 2%;
  display: flex;
  width: 80%;
  margin: auto;
  align-items: center;
`

export function ConfirmationTransfersPagoMovil() {
  const { useWallet, siteOptions, useError } = useTheme();
  const [fetching, setFetching] = React.useState<boolean>(false);

  const returnToAmount = () => {
    useWallet.attributesTransfersPagoMovil.actions.setAccount(null);
    useWallet.attributesTransfersPagoMovil.actions.setAmount('');
    useWallet.attributesTransfersPagoMovil.actions.setChange('');
    useWallet.attributesTransfersPagoMovil.actions.changeNote('');
    useWallet.pagesTransfersPagoMovil.actions.onAmount();
  }

  const add =  async (): Promise<void> => {
    if(useWallet.attributesTransfersPagoMovil.actions.validationResponsabilitytButton()){
      try{
        setFetching(true);
        useWallet.pagesTransfersPagoMovil.actions.onFetching();
        const data = await useWallet.account.actions.addTransferPagoMovil();
        if(data && data.success){
          await useWallet.attributes.actions.getWalletAccount();
          await useWallet.attributes.actions.getEntities();
          useWallet.pagesTransfersPagoMovil.actions.onSuccess();
        } else{
    
          useError.actions.changeError([data.message]);
          useWallet.pagesTransfersPagoMovil.actions.onCheck();
        }
      } catch (error) {
        console.log(error);
        useError.actions.changeError(['Error al realizar la transferencia']);
        useWallet.pagesTransfersPagoMovil.actions.onCheck();
      } finally {
        setFetching(false);
        scrollToTop();
      }
    }
  }

  useEffect(() => {
    useWallet.attributesTransfersPagoMovil.actions.validationResponsabilitytButton();
  }, [useWallet.attributesTransfersPagoMovil.states.responsability]); // eslint-disable-line react-hooks/exhaustive-deps
  

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
                    onClick={returnToAmount}
                    image={{
                      src: LogoPagoMovil.src,
                      backgroundColor: '#ebebeb',
                    }}
                  />
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
                            }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name.substring(0, 1)}</span>
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
                            }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.name}</span>
                            <span style={{
                              fontSize: '0.6em',
                              fontWeight: 400,
                            }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.phone && formatPhoneNumberVzla(useWallet.attributesTransfersPagoMovil.states.beneficiary.phone)}</span>
                             <span style={{
                              fontSize: '0.6em',
                              fontWeight: 400,
                            }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.bankName}</span>
                            <span style={{
                              fontSize: '0.6em',
                              fontWeight: 400,
                            }}>{useWallet.attributesTransfersPagoMovil.states.beneficiary?.accountNumber}</span>
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
                              useWallet.attributesTransfersPagoMovil.states.change || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              useWallet.attributesTransfersPagoMovil.states.currency?.symbol || siteOptions.CURRENCY_SYMBOL,
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
                            <h1 style={{textAlign: 'center', padding: '0.3em', fontSize: '1em', fontWeight: 600}} className={title1AppStyles}>{useWallet.attributesTransfersPagoMovil.states.account?.name}</h1>
                            <span
                              style={{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '0.7em',
                                fontWeight: 400,
                              }}
                            >Saldo: {decimalFormatPriceConverter(
                              useWallet.attributesTransfersPagoMovil.states.account?.balance || 0,
                              siteOptions.DECIMAL_NUMBERS,
                              siteOptions.CURRENCY_SYMBOL,
                              siteOptions.CURRENCY_LOCATION
                            )}</span>
                          </div>
                          {useWallet.attributesTransfersPagoMovil.states.instructions !== '' &&
                            <div style={{
                              margin: '1em auto'
                            }}>
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
                                    width: '90%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }} className={containerColumnCenterStyles}>
                                    <span className={priceTotalStyles}>{useWallet.attributesTransfersPagoMovil.states.instructions}</span>
                                    
                                  </div>
                              </div>
                            </div>
                          }
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
                            >{useWallet.attributesTransfersPagoMovil.states.note}</span>
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
                                  checked={useWallet.attributesTransfersPagoMovil.states.responsability}
                                  onChange={() => useWallet.attributesTransfersPagoMovil.actions.setResponsability(!useWallet.attributesTransfersPagoMovil.states.responsability)}
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
                                >{'Al marcar esta casilla, declaro que conozco a la persona a la que solicito que se le realice la transferencia mediante PagoMovil y autorizo a Gafpri Corp a efectuar dicha transferencia en mi nombre, utilizando mi saldo disponible en la billetera. Entiendo y acepto que Gafpri Corp no es responsable por el destino de los fondos una vez realizada la transferencia.'}</span>
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
                                id: 'responsability-pago-movil-button',
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