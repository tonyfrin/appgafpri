import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { AddressList } from '../Address/AddressList';
import { LayoutAppProfile } from './LayoutAppProfile';


export function ListAddress() {
  const { useProfile } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
              { useProfile.pages.states.isFetching ? <Loading /> :
                <div>
                
                    <AddressList />

                </div>
              }
        </>
      </LayoutAppProfile>
    </>
  );
}