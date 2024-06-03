import React from 'react';;
import { useTheme } from '../context/ThemeContext';
import { InitTransfers } from './Transfers/InitTransfers';
import { Beneficiary } from './Transfers/Beneficiary';
import { AmountTransfert } from './Transfers/AmountTransfert';
import { ConfirmationTransfers } from './Transfers/ConfirmationTransfers';
import { SuccessTransfers } from './Transfers/SuccessTransfers';
import { LayoutAppProfile } from '../Component/LayoutAppProfile';


export function Transfers() {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
         <div>
            {useWallet.pagesTransfers.states.isInit && <InitTransfers />}

            {useWallet.pagesTransfers.states.isBeneficiary && <Beneficiary />}

            { useWallet.pagesTransfers.states.isInfo && <AmountTransfert />}

            { useWallet.pagesTransfers.states.isConfirmation && <ConfirmationTransfers />}

            { useWallet.pagesTransfers.states.isSuccess && <SuccessTransfers />}
         </div>
        </>
      </LayoutAppProfile>
    </>
  );
}