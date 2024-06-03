import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { css, cx } from '@emotion/css'
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { Loading } from '../../Loading';
import { Error } from '../../Error';
import { PaymentMethodsAttributesReturn } from '../../states/paymentMethods/useGafpriApiPaymentMethods';
import { ucfirst, formatDateVzla, decimalFormatPriceConverter } from '../../helpers';

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const statusButtonStyles = (color?: string, backgroundColor?: string) => css`
    width: fit-content;
    font-size: 0.8em;
    margin: 0.6rem 0px 0px 0px;
    line-height: 1rem;
    font-weight: 600;
    max-width: 18rem;
    overflow: hidden;
    word-break: break-word;
    text-transform: none;
    -webkit-line-clamp: 2;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    height: auto;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: ${color || 'rgb(255, 255, 255)'};
    background-color: ${backgroundColor || 'rgb(15, 133, 20)'};
`

export const Recharge = ({id}: {id: string | string[] | undefined}) => {
    const router = useRouter();
    const { useLogin, useError, usePaymentMethods, siteOptions} = useTheme();
    const [isReadyRecharge, setIsReadyRecharge] = useState<boolean>(false);
    const [recharge, setRecharge] = useState<PaymentMethodsAttributesReturn | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        if(id && typeof id === 'string') {
            const fetchRecharge = async () => {
                try {
                    setIsReadyRecharge(false);
                    const data = await usePaymentMethods.api.actions.getWalletPendingByPostsId(id);
                   
                    if(data && data.success){
                        setRecharge(data.item);
                        
                    } else{
                        setRecharge(null);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setRecharge(null);
                } finally {
                    setIsReadyRecharge(true);
                }
            }

            fetchRecharge();
        }
      
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    const back = () => {
        router.back();
    }

    if(!recharge){
        return null;
    }

    const titleStatus = recharge.posts.status === 'pending' ? 'Pendiente' : 
                        recharge.posts.status === 'canceled' ? 'Rechazado' : 
                        recharge.posts.status === 'completed' ? 'Procesado' : '';
        
    const backgroundColorStatus =   recharge.posts.status === 'pending' ? 'rgb(230, 224, 217)' : 
                                    recharge.posts.status === 'canceled' ? '#c12429' : 
                                    recharge.posts.status === 'completed' ? 'rgb(15, 133, 20)' : '';

    const colorStatus =     recharge.posts.status === 'pending' ? 'rgb(0, 20, 53)' :
                            recharge.posts.status === 'canceled' ? '#fff' : 
                            recharge.posts.status === 'completed' ? '#fff' : '';

    let comission = 0;
    let returnComission = 0;
    let totalComission = 0;

    let rechargeAmount = 0;
    let returnRechargeAmount = 0;
    let totalRecharge = 0;

    recharge.walletTransactions.map((transaction) => {
        if(transaction.transactionType === 'comission'){
            comission = parseFloat(transaction.amount);
        } else if(transaction.transactionType === 'return' && transaction.type === 'deposit'){
            returnComission = parseFloat(transaction.amount);
        } else if(transaction.transactionType === 'return' && transaction.type === 'debit'){
            returnRechargeAmount = parseFloat(transaction.amount);
        } else if(transaction.transactionType === 'recharge'){
            rechargeAmount = parseFloat(transaction.amount);
        }
        return null;
    })

    totalComission = comission - returnComission;
    totalRecharge = recharge.posts.status === 'pending' ? 0 : rechargeAmount - returnRechargeAmount;




    return (
        <>
            <div 
                style={{
                    margin: '0px auto 6em auto',
                }}
            > 
            <Error 
                error={useError.states.error}
            />
                {!id || fetching || !isReadyRecharge || recharge === null ? <Loading /> :
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1em 0px',
                            width: '90%',
                            margin: 'auto',
                        }}> 
                            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Detalles de Recarga</h1>
                            <div 
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                }}
                                onClick={back}
                            >
                                <FiChevronLeft 
                                    className={arrowStyle}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: '0.7em auto',
                                    width: '90%',
                                    
                                }}
                            >
                                <span className={cx(statusButtonStyles(colorStatus, backgroundColorStatus))}>{titleStatus}</span>
                            </div>
                            <div
                                style={{
                                    border: '0.5px solid #ebebeb',
                                    borderRadius: '15px',
                                    margin: '0px auto 2% auto',
                                    backgroundColor: '#fff',
                                    fontSize: '0.8em',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    width: '90%',
                                    padding: '0.5em',
                                }}
                            >
                                <div 
                                    style={{
                                        margin: '0.5em 0px',
                                    }}
                                >
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Método de Recarga: 
                                    </span>
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontWeight: 600,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        {ucfirst(recharge?.paymentType)}
                                    </span>
                                </div>
                                <div 
                                    style={{
                                        margin: '0.5em 0px',
                                    }}
                                >
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Realizado por:
                                    </span>
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontWeight: 600,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        {recharge?.nameSend}
                                    </span>
                                </div>
                                <div 
                                    style={{
                                        margin: '0.5em 0px',
                                    }}
                                >
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Confirmación:
                                    </span>
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontWeight: 600,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        {recharge?.number}
                                    </span>
                                </div>
                                <div 
                                    style={{
                                        margin: '0.5em 0px',
                                    }}
                                >
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Fecha:
                                    </span>
                                    <span 
                                        style={{
                                            padding: '0.5em', 
                                            fontWeight: 600,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        {recharge?.posts.createdAt ? formatDateVzla(recharge?.posts.createdAt) : ''}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div 
                            style={{
                            backgroundColor: '#ececec',
                            margin: '1em auto',
                            padding: '0.45em',
                            borderRadius: '15px',
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.8em',
                            width: '90%',
                            }}
                        >
                            <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '1em auto',
                                        padding: '1em',
                                    
                                    }}
                            >
                                    <span >Monto de Solicitud de Recarga: </span>
                                    <span 
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    >
                                        {decimalFormatPriceConverter(
                                            recharge?.change || 0,
                                            siteOptions.DECIMAL_NUMBERS,
                                            siteOptions.CURRENCY_SYMBOL,
                                            siteOptions.CURRENCY_LOCATION
                                        )}
                                    </span>
                            </div>     
                            <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '1em auto',
                                        padding: '1em',
                                    
                                    }}
                            >
                                    <span >Comisión: </span>
                                    <span 
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    >
                                        {decimalFormatPriceConverter(
                                            totalComission || 0,
                                            siteOptions.DECIMAL_NUMBERS,
                                            siteOptions.CURRENCY_SYMBOL,
                                            siteOptions.CURRENCY_LOCATION
                                        )}
                                    </span>
                            </div>     
                            <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '1em auto',
                                        padding: '1em',
                                    
                                    }}
                            >
                                    <span >Total recarga en cuenta: </span>
                                    <span 
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    >
                                        {decimalFormatPriceConverter(
                                            totalRecharge || 0,
                                            siteOptions.DECIMAL_NUMBERS,
                                            siteOptions.CURRENCY_SYMBOL,
                                            siteOptions.CURRENCY_LOCATION
                                        )}
                                    </span>
                            </div>     
                        </div>
                    </>
                } 
            </div>
        </>
    )
}


