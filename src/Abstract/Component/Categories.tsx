import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { LayoutApp } from './LayoutApp';
import { ProductList } from '../List/ProductList';
import { useTheme } from '../context/ThemeContext';
import { ProductsAttributesReturn } from '../states/products/useGafpriApiProducts';
import { Loading } from '../Loading';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const mainStyles = css`
  margin-bottom: 100px;
`

export function Categories({id}: {id: string | string[] | undefined}) {
  const { useProducts, useLogin } = useTheme();
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);
  const [items, setItems] = useState<ProductsAttributesReturn[]>([]);
  const [offset, setOffset] = useState<number>(0);


  const pushProducts = (products: ProductsAttributesReturn[]) => {
    setItems([...items, ...products]);
  }

  const getMoreProducts = (productId: string) => {
    try {
      setFetchingMore(true);
      useProducts.api.actions.getProductsByCategoryId(productId, pushProducts, offset, setOffset);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchingMore(false);
    }
  }

  useEffect(() => {
    if(id && typeof id === 'string') {
      const fetchData = async () => {
        try {
          useProducts.api.actions.getProductsByCategoryId(id, pushProducts, offset, setOffset);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setFetching(false);
        }
      };

      fetchData();
    }
  }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LayoutApp>
        <>
          <main className={mainStyles}>
          <div>
              <h1 className={title1AppStyles}>Todos los Productos</h1>
          </div>
            <div>
              {fetching ? <Loading /> :
                <ProductList items={items} />
              }
              {fetchingMore && <Loading />}
            </div>
            {!fetching && typeof id === 'string' &&
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ButtonAppMobile 
                  containerProps={{
                    onClick: () => getMoreProducts(id)
                  }}
                  title="Cargar más"
                />
              </div>
            }
          </main>
        </>
      </LayoutApp>
    </>
  );
}
