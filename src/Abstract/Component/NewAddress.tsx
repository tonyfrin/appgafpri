import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { AddressAdd } from '../Address/AddressAdd';

export function NewAddress() {
  const { useProfile } = useTheme();

  return (
    <>
      <LayoutAppProfile>
        <>
              { useProfile.pages.states.isFetching ? <Loading /> :
                <div>
                    <AddressAdd />
                </div>
              }
        </>
      </LayoutAppProfile>
    </>
  );
}