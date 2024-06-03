import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { css, cx } from '@emotion/css'
import { FiChevronLeft } from 'react-icons/fi';
import { formatDate, decimalFormatPriceConverter } from '../helpers'
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { PaymentMethodsAttributesReturn } from '../states/paymentMethods/useGafpriApiPaymentMethods';

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
    font-size: 0.7em;
    margin: 0.6rem 0px 0px 0px;
    line-height: 1rem;
    font-weight: 400;
    max-width: 18rem;
    overflow: hidden;
    word-break: break-word;
    text-transform: none;
    -webkit-line-clamp: 2;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    height: auto;
    padding: 0.125rem 0.5rem;
    border-radius: 0.5rem;
    color: ${color || 'rgb(255, 255, 255)'};
    background-color: ${backgroundColor || 'rgb(15, 133, 20)'};
`

export const RechargeListPending = () => {
    const { usePaymentMethods, useLogin, siteOptions } = useTheme();
    const [isReadyRechargePending, setIsReadyRechargePending] = useState<boolean>(false);
    const [rechargePending, setRechargePending] = useState<PaymentMethodsAttributesReturn[]>([]);
    const [fetchingRechargePendingMore, setFetchingRechargePendingMore] = useState<boolean>(false);
    const [rechargePendingLimit, setRechargePendingLimit] = useState<number>(2);
    const [rechargePendingOffset, setRechargePendingOffset] = useState<number>(0);
    const [rechargePendingCount, setRechargePendingCount] = useState<number | null>(null);

    const rechargePendingPush = (recharge: PaymentMethodsAttributesReturn[]) => {
        setRechargePending([...rechargePending, ...recharge]);
    }

    const getMoreRechargePending = async () => {
        try {
            setFetchingRechargePendingMore(true);
            const data = await usePaymentMethods.api.actions.getWalletPending(rechargePendingLimit, rechargePendingOffset);
            if(data && data.success){
                const offset = rechargePending.length + data.data.items.length;
                rechargePendingPush(data.data.items);
                setRechargePendingCount(data.data.totalCount);
                setRechargePendingOffset(offset);
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            setFetchingRechargePendingMore(false);
        }
    }

    useEffect(() => {
            const fetchRechargePending = async () => {
                try {
                    setIsReadyRechargePending(false);
                    const data = await usePaymentMethods.api.actions.getWalletPending(rechargePendingLimit, rechargePendingOffset);
                    if(data && data.success){
                        const offset = rechargePending.length + data.data.items.length;
                        setRechargePending(data.data.items);
                        setRechargePendingCount(data.data.totalCount);
                        setRechargePendingOffset(offset);
                    } else{
                        setRechargePending([]);
                        setRechargePendingCount(null);
                        setRechargePendingOffset(0);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setRechargePending([]);
                    setRechargePendingCount(null);
                    setRechargePendingOffset(0);
                    setIsReadyRechargePending(true);
                } finally {
                    setIsReadyRechargePending(true);
                }
            }

            fetchRechargePending();
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div 
                style={{
                    margin: '0px auto 6em auto',
                }}
            > 
                {!isReadyRechargePending ? <Loading /> :
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1em 0px',
                            width: '90%',
                            margin: 'auto',
                        }}> 
                            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Lista de Recargas por Aprobar</h1>
                            <Link href='/' style={{
                                textDecoration: 'none',
                                display: 'flex',
                                }}>
                                <FiChevronLeft 
                                    className={arrowStyle}
                                />
                            </Link>
                        </div>
                        
                        <div
                            style = {{
                                border: '1px solid #e6e6e6',
                                padding: '10px',
                                borderRadius: '0px 0px 15px 15px',
                                margin: '2em auto',
                                width: '90%',
                                
                            }}
                        >
                                    <h1 style={{textAlign: 'left', padding: '0.3em', width: '95%', margin: 'auto', fontSize: '0.7em'}} className={title1AppStyles}>Recargas</h1>
                                        
                                        {rechargePending.length > 0 ? rechargePending.map((payment, index) => { 
                                            
                                                return (
                                                        <>
                                                            <div
                                                                style={{
                                                                    border: '0.5px solid #ebebeb',
                                                                    borderRadius: '15px',
                                                                    margin: '0px 0px 2% 0px',
                                                                    backgroundColor: '#fff',
                                                                    fontSize: '0.8em'
                                                                }}
                                                                key={index}
                                                            >
                                                                <Link
                                                                    href="/recharge/[id]" as={`/recharge/${payment.postsId}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        margin: '0px'
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            margin: 'auto',
                                                                            padding: '2em 2%',
                                                                            
                                                                        }}
                                                                    ><div
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                width: '70%',
                                                                                overflow: 'hidden',
                                                                            }}
                                                                        >
                                                                            <span style={{
                                                                                fontWeight: '600',
                                                                                textAlign: 'left',
                                                                                fontFamily: 'Poppins',
                                                                            }}>{`${payment.nameSend}`}</span>
                                                                            <span style={{
                                                                                fontWeight: '400',
                                                                                textAlign: 'left',
                                                                                color: '#324375',
                                                                                fontFamily: 'Poppins',
                                                                                margin: '0.5em 0px'
                                                                            }}>{payment.number}</span>
                                                                            <span
                                                                                style={{
                                                                                    fontSize: '0.7em',
                                                                                    textAlign: 'left'

                                                                                }}
                                                                            >{formatDate(payment.posts.createdAt)}</span>
                                                                            <span className={cx(statusButtonStyles('rgb(0, 20, 53)', 'rgb(230, 224, 217)'))}>Pendiente</span>
                                                                        </div>
                                                                        <span
                                                                    style={{
                                                                        width: '30%',
                                                                        textAlign: 'right',
                                                                        fontWeight: '600',
                                                                        color: '#324375'
                                                                    }}
                                                                    >{decimalFormatPriceConverter(
                                                                            payment.change || 0,
                                                                            siteOptions.DECIMAL_NUMBERS,
                                                                            siteOptions.CURRENCY_SYMBOL,
                                                                            siteOptions.CURRENCY_LOCATION
                                                                        )}</span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            
                                                        </>
                                                );
                                        
                                        }) :
                                        <>
                                            <div
                                                style={{
                                                    border: '0.5px solid #ebebeb',
                                                    borderRadius: '15px',
                                                    margin: '0px 0px 2% 0px',
                                                    backgroundColor: '#fff',
                                                    fontSize: '0.8em'
                                                }}  
                                            >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            margin: 'auto',
                                                            padding: '2em 2%',
                                                            
                                                        }}
                                                    >
                                                        <span
                                                        style={{
                                                            width: '100%',
                                                            textAlign: 'center',
                                                            fontWeight: '600',
                                                            
                                                        }}
                                                        >No hay Recargas Pendientes</span>
                                                        
                                                    </div>
                                            </div>
                                        
                                        </> 
                                    
                                    }
                                    {rechargePendingCount !== null &&rechargePendingCount > rechargePending.length &&
                                        <div>
                                            {fetchingRechargePendingMore ? 
                                            <Loading 
                                                mainStyles={{
                                                    padding: '0px',
                                                }}
                                                divStyle={{
                                                    border: '3px solid #eee',
                                                    borderTop: '3px solid #077bb4',
                                                    width: '30px',
                                                    height: '30px',
                                                }}
                                                
                                            /> :
                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                    onClick={() => getMoreRechargePending()}
                                                >
                                                    <span
                                                        style={{
                                                            textAlign: 'center',
                                                            fontSize: '0.7rem',
                                                            color: '#07b2e7',
                                                            fontWeight: '600'
                                                        }}
                                                    >Ver mas</span>
                                                </div>
                                            }
                                        </div>
                                    }
                        </div>
                    </>
                } 
            </div>
        </>
    )
}


