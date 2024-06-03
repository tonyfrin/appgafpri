import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { Phone } from '../Profile/Phone';

export function MainPhone() {
  const { useProfile } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
              { useProfile.pages.states.isFetching ? <Loading /> :
                <div>

                   <Phone />
                
                </div>
              }
        </>
      </LayoutAppProfile>
    </>
  );
}