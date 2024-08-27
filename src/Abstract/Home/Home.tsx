import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import { decimalFormatPriceConverter } from '../helpers';
import { Loading } from '../Loading';
import { EmptyWallet } from '../Wallet/EmptyWallet';
import { ProductsAttributesReturn } from '../states/products/useGafpriApiProducts';
import { ProductList } from '../List/ProductList';
import { RiRefund2Line } from 'react-icons/ri';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { HomeWalletButton } from '../Button/HomeWalletButton';
import { IoWalletOutline } from 'react-icons/io5';
import { Error } from 'gafprilibui';
import { WhatsApp } from '../Notification/WhatsApp';


const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`

export const Home = () => {
    const { siteOptions, useWallet, useProducts, useLogin } = useTheme();
    const [fetching, setFetching] = useState<boolean>(false);
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    const [items, setItems] = useState<ProductsAttributesReturn[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number | null>(null);
    const [totalBalanceAvailable, setTotalBalanceAvailable] = useState<number>(0);
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

      useEffect(() => {
        if(entities.length > 0){
            let total = 0;
            entities.map((entity, index) => {
                if(entity.walletAccount.length === 0) return (<></>);
                    
                const totalBalance = entity.walletAccount.reduce((acc, account) => {
                    return acc + parseFloat(account.available.toString());
                }, 0);
    
                total = total + totalBalance;
            
            });
            setTotalBalanceAvailable(total);
        }
    }, [entities]); 
        
      
     

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
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#324375',
                                width: '85%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                padding: '1em',
                                margin: '1em auto',
                                borderRadius: '20px',
                                flexDirection: 'column'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '0.3em'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '0.6rem',
                                        fontWeight: '400',
                                        fontFamily: 'Poppins',
                                    }}
                                >Saldo disponible</span>
                                <span
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                    }}
                                >{decimalFormatPriceConverter(
                                    totalBalanceAvailable || 0,
                                    siteOptions.DECIMAL_NUMBERS,
                                    siteOptions.CURRENCY_SYMBOL,
                                    siteOptions.CURRENCY_LOCATION
                                )}</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    marginTop: '1em',
                                    marginBottom: '0.2em'
                                }}
                            >
                                {/* <HomeWalletButton 
                                    href='/billetera/recarga'
                                    Icon={RiRefund2Line}
                                    title='Recargar'
                                /> */}
                                <HomeWalletButton 
                                    href='/billetera/enviar'
                                    Icon={IoPaperPlaneOutline}
                                    title='Retirar'
                                />
                                <HomeWalletButton 
                                    href='/billetera'
                                    Icon={IoWalletOutline}
                                    title='Cuentas'
                                />
                            </div>
                        </div>
                        <Error 
                            error={['La opción de recarga no está disponible por mantenimiento en la plataforma.']}
                        />
                        
                        <WhatsApp />
                        
                        
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