import React, { useState, useEffect } from 'react';
import { LayoutApp } from '@/Abstract/Component/LayoutApp';
import { css } from '@emotion/css';
import { BoxCategoryApp } from '../Abstract/Box/BoxCategoryApp';
import { CategoryAttributesReturn } from '@/Abstract/states/category/useGafpriApiCategory';
import { useTheme } from '../Abstract/context/ThemeContext';
import { Loading } from '@/Abstract/Loading';

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

export default function Home() {
  const { useCategory, siteOptions } = useTheme();
  const [categoriesData, setCategoriesData] = useState<CategoryAttributesReturn[]>([]);
  const [fetching, setFetching] = useState(true);
  const { categoryIdsMainHome } = siteOptions;

  const pushItem = (item: CategoryAttributesReturn) => {
    setCategoriesData([...categoriesData, item]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all(
          categoryIdsMainHome.map(async (id) => { 
            await useCategory.api.actions.getCategoryHomePage(id, pushItem);
          }
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setFetching(false); 
      }
    };

    fetchData();
  }, []); // eslint-disable-line


  return (
    <>
      <LayoutApp>
        <>
          <main className={mainStyles}>
          <div>
              <h1 className={title1AppStyles}>Tienda</h1>
          </div>
          {!fetching && categoriesData.length > 0 ? 
            <div>
              {categoriesData.map((categoryData, index) => (
                <BoxCategoryApp
                  key={index}
                  category={categoryData}
                />
              ))}
            </div> :
            <Loading />
          }
          </main>
        </>
      </LayoutApp>
    </>
  );
}
