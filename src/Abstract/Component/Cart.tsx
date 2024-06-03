import React, { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import Link from 'next/link';
import { LayoutAppProfile } from './LayoutAppProfile';
import { css } from '@emotion/css';
import { BoxCart } from '../Box/BoxCart';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { Modal } from '../Modal/Modal';
import { CheckOut } from './CheckOut';
import { CartAttributesReturn } from '../states/cart/useGafpriApiCart';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';


const mainStyles = css`
  margin-bottom: 100px;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
    z-index: 996;
    display: flex;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
`

export function Cart() {
  const [modal, setModal] = React.useState(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [item, setItem] = useState<CartAttributesReturn | null>(null);
  const { useCart, useCheckOut } = useTheme();

  useEffect(() => {
      const fetchData = async () => {
          try{
            const data = await (useCart.api.actions).getCart();
            if(data && data.success){
              setItem(data.item);
              useCheckOut.attributes.actions.setTotal(data.item.total);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setFetching(false);
          }
      }
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LayoutAppProfile>
        <>
          <main className={mainStyles}>
            {fetching ? ( <Loading /> ) : !item ?
                ( <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '20%',
                }}>
                   <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <IoCartOutline style={{
                      fontSize: '2em',
                    }}/>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                      <h1 className={title1AppStyles}>El Carrito esta vacío</h1>
                  </div>
                    <Link href="/inicio" style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                      <ButtonAppMobile 
                        title="Ir a la tienda"
                      />
                    </Link>
                </div> ) : (
                
                <>
                <div><h1 className={title1AppStyles}>Carrito</h1></div>
                  <BoxCart 
                    cart={item}
                    setFetching={setFetching}
                    setCart={setItem}
                  />
                  <div className={containerButtonCheckOutStyle}>
                    <ButtonAppMobile 
                      title="Comprar"

                      containerProps={{
                        onClick: () => setModal(true),
                      }}
                    />
                  </div>
              </>
            )}
          </main>
        </>
      </LayoutAppProfile>
    
        <Modal open={modal}>
          <CheckOut setModal={setModal} modal={modal} cart={item} setCart={setItem}/>
        </Modal>
      
    </>
  );
}