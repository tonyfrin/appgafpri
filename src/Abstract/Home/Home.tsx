import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { WalletAccountAtrributesReturn } from '../states/wallet/useGafpriApiWalletAccount';
import { decimalFormatPriceConverter } from '../helpers';
import { Loading } from '../Loading';
import { EmptyWallet } from '../Wallet/EmptyWallet';
import { ProductsAttributesReturn } from '../states/products/useGafpriApiProducts';
import { ProductList } from '../List/ProductList';


const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

export const Home = () => {
    const { siteOptions, useWallet, useProducts, useLogin } = useTheme();
    const [fetching, setFetching] = useState<boolean>(false);
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    const [items, setItems] = useState<ProductsAttributesReturn[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number | null>(null);

    const entities = useWallet.attributes.states.entities;
    const countEntities = entities.length;
    const walletAccountCount = entities.reduce((acc, entity) => {
        return acc + entity.walletAccount.length;
    }, 0);

    const pushProducts = (products: ProductsAttributesReturn[]) => {
        setItems([...items, ...products]);
      }
    
    const getMoreProducts = async () => {
        try {
          setFetchingMore(true);
          const data = await useProducts.api.actions.getProductsAll({
            limit: '20',
            orderBy: 'name',
            order: 'ASC',
            offset: `${offset}`,
        });
        if(data.success){
            if(data && data.data.items){
                if(data.data.items.length > 0){
                    pushProducts(data.data.items);
                    const newOffset = parseInt(data.data.items.length, 10) + offset;
                    setOffset(newOffset);
                    setTotalItems(data.data.totalCount);
                } 
            } 
        } 
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setFetchingMore(false);
        }
    }

    useEffect(() => {
          const fetchData = async () => {
            try {
                setFetching(true);
                const data = await useProducts.api.actions.getProductsAll({
                    limit: '20',
                    orderBy: 'name',
                    order: 'ASC',
                    offset: `${offset}`,
                });
                if(data.success){
                    if(data && data.data.items){
                        if(data.data.items.length > 0){
                            setItems(data.data.items);
                            setOffset(data.data.items.length);
                            setTotalItems(data.data.totalCount);
                        } else{
                            setItems([]);
                            setTotalItems(null);
                            setOffset(0);
                        }
                    } else{
                        setItems([]);
                        setTotalItems(null);
                        setOffset(0);
                    }
                } else{
                    setItems([]);
                    setTotalItems(null);
                    setOffset(0);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setItems([]);
                setTotalItems(null);
                setOffset(0);
            } finally {
              setFetching(false);
            }
          };
    
          fetchData();
      }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {!useWallet.attributes.states.entityIsReady || !useWallet.attributes.states.walletAccountIsReady || fetching ? <Loading /> :  (
            <>
            {countEntities === 0 || walletAccountCount === 0 ? (
                
                        <EmptyWallet />
                
            ) : (
                <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '0px auto 100px auto',
                    }}>
                        <div>
                            <h1 className={title1AppStyles}>Tu saldo en Billetera</h1>
                        </div>
                        <div
                        style={{
                            width: '90%',
                            margin: '0 auto',
                        }}
                        >
                            
                            {entities.length > 0 && entities.map((entity, index) => {
                                if(entity.walletAccount.length === 0) return (<></>);
                                    
                                    const totalBalance = entity.walletAccount.reduce((acc, account) => {
                                        return acc + parseFloat(account.available.toString());
                                    }, 0);


                                return (
                                    <>
                                    <div
                                        style={{
                                            margin: '0 auto',
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    
                                                    width: '95%',
                                                    margin: 'auto',
                                                
                                                }}
                                            ><span style={{
                                                fontSize: '0.8em',
                                                padding: '5px',
                                                margin: '0',
                                                fontFamily: 'Poppins',
                                                textAlign: 'left',
                                            }}>{entity.name}</span></div>
                                        </div>

                                        <div
                                            style={{
                                                backgroundColor: '#334779',
                                                borderRadius: '10px 10px 0 0',
                                                padding: '0.5em',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '0.7em',
                                                margin: '0',
                                                fontFamily: 'Poppins',
                                                textAlign: 'left',
                                                color: '#fff'
                                            }}>{`Cuenta en billetera(${entity.walletAccount.length})`}</span>
                                            <div style={{
                                                fontSize: '0.7em',
                                                fontWeight: '300',
                                                margin: '0',
                                                fontFamily: 'Poppins',
                                                textAlign: 'right',
                                                color: '#fff'
                                            }}>{decimalFormatPriceConverter(
                                                totalBalance || 0,
                                                siteOptions.DECIMAL_NUMBERS,
                                                siteOptions.CURRENCY_SYMBOL,
                                                siteOptions.CURRENCY_LOCATION
                                            )}</div>
                                        </div>
                                        
                                        <div
                                            style = {{
                                                border: '1px solid #e6e6e6',
                                                padding: '10px',
                                                borderRadius: '0px 0px 15px 15px'
                                            }}
                                        >
                                            {entity.walletAccount.length > 0 && entity.walletAccount.map((account: WalletAccountAtrributesReturn, index: number) => {
                                                return (
                                                    <>
                                                        <div
                                                            style={{
                                                                border: '0.5px solid #ebebeb',
                                                                borderRadius: '15px',
                                                                margin: '0px 0px 2% 0px',
                                                                textDecoration: 'none',
                                                                color: 'inherit'
                                                            }}
                                                            
                                                            key={`wallet-account-${index}`}
                                                        >
                                                                <Link
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        margin: 'auto',
                                                                        padding: '2em 2%',
                                                                        textDecoration: 'none',
                                                                        color: 'inherit'
                                                                    }}
                                                                    href="/billetera/cuenta/[id]" as={`/billetera/cuenta/${account.postsId}`}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontSize: '0.8em',
                                                                            margin: 'auto 0px',
                                                                            fontFamily: 'Poppins',
                                                                            textAlign: 'left',
                                                                            width: '70%'
                                                                        }}
                                                                    >{account.name}</span>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            width: '30%',
                                                                            margin: 'auto 0px',
                                                                        }}
                                                                    >
                                                                        <span style={{
                                                                            fontWeight: '600',
                                                                            textAlign: 'center',
                                                                        }}>{`${decimalFormatPriceConverter(
                                                                            account.available || 0,
                                                                            siteOptions.DECIMAL_NUMBERS,
                                                                            siteOptions.CURRENCY_SYMBOL,
                                                                            siteOptions.CURRENCY_LOCATION
                                                                        )} >`}</span>
                                                                        <span
                                                                            style={{
                                                                                fontSize: '0.5em',
                                                                                textAlign: 'center'

                                                                            }}
                                                                        >Saldo disponible</span>
                                                                    </div>
                                                                </Link>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <div>
                                <h1 className={title1AppStyles}>Todos nuestros Productos</h1>
                            </div>
                            {fetching ? <Loading /> :
                                <ProductList items={items} />
                            }
                        </div>
                        {totalItems !== null && totalItems > items.length &&
                                        <div>
                                            {fetchingMore ? 
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
                                                        onClick={() => getMoreProducts()}
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
            )}
        </>
        )}
    </>
    )

}