import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AmountRechargeMySite } from './Recharge/AmountRechargeMySite';
import { InfoRecharge } from './Recharge/InfoRecharge';
import { ConfirmationRecharge } from './Recharge/ConfirmationRecharge';
import { SuccessRecharge } from './Recharge/SuccessRecharge';
import { Loading } from '../Loading';
import { LayoutAppProfile } from '../Component/LayoutAppProfile';


export function RechargeMySites({id}: {id: string | string[] | undefined}) {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
          {useWallet.pagesRecharge.states.isFetching ? <Loading /> : 
            <div>
                {useWallet.pagesRecharge.states.isInit && <AmountRechargeMySite id={id} />}

                {useWallet.pagesRecharge.states.isInfo && <InfoRecharge />}

                {useWallet.pagesRecharge.states.isConfirmation && <ConfirmationRecharge />}

                {useWallet.pagesRecharge.states.isSuccess && <SuccessRecharge />}
            </div>
          }
        </>
      </LayoutAppProfile>
    </>
  );
}