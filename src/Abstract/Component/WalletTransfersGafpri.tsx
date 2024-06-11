import React from 'react';;
import { useTheme } from '../context/ThemeContext';
import { Beneficiary } from '../Wallet/Transfers/Beneficiary';
import { AmountTransfert } from '../Wallet/Transfers/AmountTransfert';
import { ConfirmationTransfers } from '../Wallet/Transfers/ConfirmationTransfers';
import { SuccessTransfers } from '../Wallet/Transfers/SuccessTransfers';
import { LayoutAppProfile } from '../Component/LayoutAppProfile';
import { TransferError } from '../Wallet/Transfers/TransferError';


export function WalletTransfersGafpri() {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
         <div>
            {useWallet.pagesTransfers.states.isBeneficiary && <Beneficiary />}

            { useWallet.pagesTransfers.states.isInfo && <AmountTransfert />}

            { useWallet.pagesTransfers.states.isConfirmation && <ConfirmationTransfers />}

            { useWallet.pagesTransfers.states.isSuccess && <SuccessTransfers />}

            { useWallet.pagesTransfers.states.isError && <TransferError />}
         </div>
        </>
      </LayoutAppProfile>
    </>
  );
}