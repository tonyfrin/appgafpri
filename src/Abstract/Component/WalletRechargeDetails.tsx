import React from 'react';
import { Recharge } from '../Wallet/Recharge/Recharge';
import { LayoutAppProfile } from './LayoutAppProfile';

export function WalletRechargeDetails({id}: {id: string | string[] | undefined}) {

  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <Recharge id={id}/>
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}