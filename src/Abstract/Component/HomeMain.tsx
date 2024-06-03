import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { InitWallet } from '../Wallet/InitWallet';
import { LayoutAppProfile } from './LayoutAppProfile';
import { Home } from '../Home/Home';

export function HomeMain() {
  const { useWallet } = useTheme();

  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            {!useWallet.attributes.states.entityIsReady || !useWallet.attributes.states.walletAccountIsReady ? <Loading /> : <Home />}
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}