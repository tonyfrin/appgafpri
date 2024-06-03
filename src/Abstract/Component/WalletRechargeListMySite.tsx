import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { RechargeListMySites } from '../Wallet/RechargeListMySites';

export function WalletRechargeListMySite({id}: {id: string | string[] | undefined}) {
  
  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <RechargeListMySites id={id} />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}