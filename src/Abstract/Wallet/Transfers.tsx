import React from 'react';
import { InitTransfers } from './Transfers/InitTransfers';
import { LayoutAppProfile } from '../Component/LayoutAppProfile';


export function Transfers() {

  return (
    <>
      <LayoutAppProfile>
        <>
         <div>
            <InitTransfers />
         </div>
        </>
      </LayoutAppProfile>
    </>
  );
}