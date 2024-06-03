import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { css, cx } from '@emotion/css'
import { FiChevronLeft } from 'react-icons/fi';
import { decimalFormatPriceConverter, formatDate } from '../helpers'
import { useTheme } from '../context/ThemeContext';
import { WalletAccountAtrributesReturn, WalletTransactionsAttributesReturn } from '../states/wallet/useGafpriApiWalletAccount';
import { Loading } from '../Loading';

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

const amountTitleAppStyles = css`
  font-size: 1.1em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
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

export const Account = ({id}: {id: string | string[] | undefined}) => {
    const { siteOptions, useWallet, useLogin } = useTheme();
    const [walletAccount, setWalletAccount] = useState<WalletAccountAtrributesReturn | null>(null);
    const [isReadyWalletAccount, setIsReadyWalletAcount] = useState<boolean>(false);

    const [transactionsPending, setTransactionsPending] = useState<WalletTransactionsAttributesReturn[]>([]);
    const [isReadyTransactionsPending, setIsReadyTransactionsPending] = useState<boolean>(false);
    const [transactionsPendingCount, setTransactionsPendingCount] = useState<number | null>(null);
    const transactionsPendingLimit = 2;
    const [transactionsPendingOffset, setTransactionsPendingOffset] = useState<number>(0);
    const [fetchingPendingMore, setFetchingPendingMore] = useState<boolean>(false);

    const [transactionsCompleted, setTransactionsCompleted] = useState<WalletTransactionsAttributesReturn[]>([]);
    const [isReadyTransactionsCompleted, setIsReadyTransactionsCompleted] = useState<boolean>(false);
    const [transactionsCompletedCount, setTransactionsCompletedCount] = useState<number | null>(null);
    const transactionsCompletedLimit = 20;
    const [transactionsCompletedOffset, setTransactionsCompletedOffset] = useState<number>(0);
    const [fetchingCompletedMore, setFetchingCompletedMore] = useState<boolean>(false);

    const transactionsPendindPush = (transactions: WalletTransactionsAttributesReturn[]) => {
        setTransactionsPending([...transactionsPending, ...transactions]);
    }

    const transactionsCompletedPush = (transactions: WalletTransactionsAttributesReturn[]) => {
        setTransactionsCompleted([...transactionsCompleted, ...transactions]);
    }
 
    const getMoreTransactionsPending = async (id: string) => {
        try {
            setFetchingPendingMore(true);
            const data = await useWallet.account.actions.getWalletTransactionsByPostsId(id, 'pending', transactionsPendingLimit, transactionsPendingOffset);
            const offset = transactionsPending.length + data.data.items.length;
            transactionsPendindPush(data.data.items);
            setTransactionsPendingCount(data.data.totalCount);
            setTransactionsPendingOffset(offset);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            setFetchingPendingMore(false);
        }
    }


    const getMoreTransactionsCompleted = async (id: string) => {
        try {
            setFetchingCompletedMore(true);
            const data = await useWallet.account.actions.getWalletTransactionsByPostsId(id, 'complete', transactionsCompletedLimit, transactionsCompletedOffset);
            const offset = transactionsCompleted.length + data.data.items.length;
            transactionsCompletedPush(data.data.items);
            setTransactionsCompletedCount(data.data.totalCount);
            setTransactionsCompletedOffset(offset);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            setFetchingCompletedMore(false);
        }
    }

    useEffect(() => {
        if(id && typeof id === 'string') {
            const fetchWalletAccount = async () => {
            try {
                setIsReadyWalletAcount(false);
                const data = await useWallet.account.actions.getWalletAccountByPostsId(id);
                if(data && data.success){
                    setWalletAccount(data.item);
                } else{
                    setWalletAccount(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setWalletAccount(null);
                setIsReadyWalletAcount(true);
            } finally {
                setIsReadyWalletAcount(true);
            }
            }

            const fetchWalletTransactionsPending = async () => {
                try {
                    setIsReadyTransactionsPending(false);
                    const data = await useWallet.account.actions.getWalletTransactionsByPostsId(id, 'pending', transactionsPendingLimit, transactionsPendingOffset);
                    if(data && data.success){
                        const offset = transactionsPending.length + data.data.items.length;
                        transactionsPendindPush(data.data.items);
                        setTransactionsPendingCount(data.data.totalCount);
                        setTransactionsPendingOffset(offset);
                    } else{
                        setTransactionsPending([]);
                        setTransactionsPendingCount(null);
                        setTransactionsPendingOffset(0);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setTransactionsPending([]);
                    setTransactionsPendingCount(null);
                    setTransactionsPendingOffset(0);
                    
                } finally {
                    setIsReadyTransactionsPending(true);
                }
            }

            const fetchWalletTransactionsCompleted = async () => {
                try {
                    setIsReadyTransactionsCompleted(false);
                    const data = await useWallet.account.actions.getWalletTransactionsByPostsId(id, 'complete', transactionsCompletedLimit, transactionsCompletedOffset);
                    if(data && data.success){
                        const offset = transactionsCompleted.length + data.data.items.length;
                        transactionsCompletedPush(data.data.items);
                        setTransactionsCompletedCount(data.data.totalCount);
                        setTransactionsCompletedOffset(offset);
                    } else{
                        setTransactionsCompleted([]);
                        setTransactionsCompletedCount(null);
                        setTransactionsCompletedOffset(0);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setTransactionsCompleted([]);
                    setTransactionsCompletedCount(null);
                    setTransactionsCompletedOffset(0);
                } finally {
                    setIsReadyTransactionsCompleted(true);
                }
            }
            

            fetchWalletAccount();
            fetchWalletTransactionsPending();
            fetchWalletTransactionsCompleted();
      };
    }, [useLogin.data.states.token, id]); // eslint-disable-line react-hooks/exhaustive-deps

    
    // const transactionsCompleted = walletTransactions.filter((transaction) => transaction.status === 'completed');

    return (
        <>
            <div 
                style={{
                    margin: '0px auto 6em auto',
                }}
            > 
                {!id || typeof id !== 'string' || !isReadyWalletAccount || !isReadyTransactionsPending || !isReadyTransactionsCompleted ? <Loading /> :
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1em 0px',
                            width: '90%',
                            margin: 'auto',
                        }}> 
                            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Detalle de cuenta</h1>
                            <Link href='/billetera' style={{
                            textDecoration: 'none',
                            display: 'flex',
                            }}>
                            <FiChevronLeft 
                                className={arrowStyle}
                            />
                            </Link>
                        </div>
                        <div
                            style={{
                                width: '90%',
                                margin: 'auto',
                                border: 'solid 1px #e1e1e1',
                                borderRadius: '15px',
                                backgroundColor: '#fff'
                            }}
                        >
                            {/* <h1 style={{textAlign: 'left', padding: '0.5em', width: '85%', margin: 'auto', fontSize: '0.7em'}} className={title1AppStyles}>Saldo</h1> */}
                            <div
                                style={{
                                    padding: '0.5em'
                                }}
                            >
                                <div 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontWeight: '600',
                                    }}
                                >
                                    <span className={amountTitleAppStyles}>Disponible:</span>
                                    <span className={amountTitleAppStyles}>{decimalFormatPriceConverter(
                                                            walletAccount?.available || 0,
                                                            siteOptions.DECIMAL_NUMBERS,
                                                            siteOptions.CURRENCY_SYMBOL,
                                                            siteOptions.CURRENCY_LOCATION
                                                        )}</span>
                                </div>
                                <div 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: 'rgb(177 177 177)'
                                    }}
                                >
                                    <span className={amountTitleAppStyles}>Pendiente:</span>
                                    <span className={amountTitleAppStyles}>{decimalFormatPriceConverter(
                                                            walletAccount?.pending || 0,
                                                            siteOptions.DECIMAL_NUMBERS,
                                                            siteOptions.CURRENCY_SYMBOL,
                                                            siteOptions.CURRENCY_LOCATION
                                                        )}</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontWeight: '600',
                                    }}
                                >
                                    <span className={amountTitleAppStyles}>Total:</span>
                                    <span className={amountTitleAppStyles}>{decimalFormatPriceConverter(
                                                            walletAccount?.balance || 0,
                                                            siteOptions.DECIMAL_NUMBERS,
                                                            siteOptions.CURRENCY_SYMBOL,
                                                            siteOptions.CURRENCY_LOCATION
                                                        )}</span>
                                </div>
                            </div>
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
                                    <h1 style={{textAlign: 'left', padding: '0.3em', width: '95%', margin: 'auto', fontSize: '0.7em'}} className={title1AppStyles}>Transacciones Pendientes</h1>
                                        
                                        {transactionsPending.length > 0 ? transactionsPending.map((transaction, index) => { 
                                            
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
                                                                                width: '70%'
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    fontSize: '0.7em',
                                                                                    textAlign: 'left'

                                                                                }}
                                                                            >{formatDate(transaction.createdAt)}</span>
                                                                            <span style={{
                                                                                fontWeight: '600',
                                                                                textAlign: 'left',
                                                                            }}>{transaction.description}</span>
                                                                            
                                                                            <span className={cx(statusButtonStyles('rgb(0, 20, 53)', 'rgb(230, 224, 217)'))}>Pendiente</span>
                                                                        </div>
                                                                        <span
                                                                        style={{
                                                                            width: '30%',
                                                                            textAlign: 'right',
                                                                            fontWeight: '600',
                                                                            color: transaction.type === 'debit' ? '#c12429' : '#324375'
                                                                        }}
                                                                        >{`${transaction.type === 'debit' ? '-' : ''} ${decimalFormatPriceConverter(
                                                                                transaction.change || 0,
                                                                                siteOptions.DECIMAL_NUMBERS,
                                                                                siteOptions.CURRENCY_SYMBOL,
                                                                                siteOptions.CURRENCY_LOCATION
                                                                            )}`}</span>
                                                                        
                                                                    </div>
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
                                                        >No hay Transacciones Pendientes</span>
                                                        
                                                    </div>
                                            </div>
                                        
                                        </> 
                                    
                                    }
                                    {transactionsPendingCount !== null && transactionsPendingCount > transactionsPending.length &&
                                        <div>
                                            {fetchingPendingMore ? 
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
                                                    onClick={() => getMoreTransactionsPending(id)}
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

                        <div
                            style = {{
                                border: '1px solid #e6e6e6',
                                padding: '10px',
                                borderRadius: '0px 0px 15px 15px',
                                margin: '2em auto',
                                width: '90%',
                                
                            }}
                        >
                                    <h1 style={{textAlign: 'left', padding: '0.3em', width: '95%', margin: 'auto', fontSize: '0.7em'}} className={title1AppStyles}>Transacciones</h1>
                                        
                                        {transactionsCompleted.length > 0 ?
                                        
                                        transactionsCompleted.map((transaction, index) => { 

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
                                                                            width: '70%'
                                                                        }}
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                fontSize: '0.7em',
                                                                                textAlign: 'left'

                                                                            }}
                                                                        >{formatDate(transaction.createdAt)}</span>
                                                                        <span style={{
                                                                            fontWeight: '600',
                                                                            textAlign: 'left',
                                                                        }}>{transaction.description}</span>
                                                                        
                                                                        <span className={cx(statusButtonStyles())}>Completado</span>
                                                                        {transaction.attachment && 
                                                                            <a 
                                                                                href={transaction.attachment} 
                                                                                className={cx(statusButtonStyles())}
                                                                                style={{
                                                                                    backgroundColor: '#07b2e7',
                                                                                    textDecoration: 'none',
                                                                                    color: '#fff',
                                                                                }}
                                                                                target="_blank"
                                                                            >Capture</a>}
                                                                    </div>
                                                                    <span
                                                                        style={{
                                                                            width: '30%',
                                                                            textAlign: 'right',
                                                                            fontWeight: '600',
                                                                            color: transaction.type === 'debit' ? '#c12429' : '#324375'
                                                                        }}
                                                                    >{`${transaction.type === 'debit' ? '-' : ''} ${decimalFormatPriceConverter(
                                                                            transaction.change || 0,
                                                                            siteOptions.DECIMAL_NUMBERS,
                                                                            siteOptions.CURRENCY_SYMBOL,
                                                                            siteOptions.CURRENCY_LOCATION
                                                                        )}`}</span>
                                                                    
                                                                </div>
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
                                                        >No hay Transacciones</span>
                                                        
                                                    </div>
                                            </div>
                                        
                                        </> 
                                    
                                    }
                                   {transactionsCompletedCount !== null && transactionsCompletedCount > transactionsCompleted.length &&
                                        <div>
                                            {fetchingCompletedMore ? 
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
                                                    onClick={() => getMoreTransactionsCompleted(id)}
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


