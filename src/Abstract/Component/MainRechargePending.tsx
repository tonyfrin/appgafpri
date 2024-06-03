import React from 'react';
import { LayoutAdmin } from './LayoutAdmin';
import { RechargeListPending } from '../Wallet/RechargeListPending';

export function MainRechargePending() {

  return (
    <>
      <LayoutAdmin>
        <>
          <div>

            <RechargeListPending />
          
          </div>
        </>
      </LayoutAdmin>
    </>
  );
}