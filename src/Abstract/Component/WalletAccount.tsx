import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { Account } from '../Wallet/Account';
import { LayoutAppProfile } from './LayoutAppProfile';

export function WalletAccount({id}: {id: string | string[] | undefined}) {
  const { useWallet } = useTheme();

  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            {!useWallet.attributes.states.entityIsReady || !useWallet.attributes.states.walletAccountIsReady ? <Loading /> : <Account id={id}/>}
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}