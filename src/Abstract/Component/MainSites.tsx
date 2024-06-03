import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { SitesList } from '../Sites/SitesList';


export function MainSites() {

  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

           <SitesList />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}