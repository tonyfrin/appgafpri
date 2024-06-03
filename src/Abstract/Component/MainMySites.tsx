import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { MySitesList } from '../MySites/MySitesList';

export function MainMySites() {

  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <MySitesList />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}