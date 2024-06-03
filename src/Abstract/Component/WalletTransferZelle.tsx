import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { LayoutAppProfile } from './LayoutAppProfile';
import { BeneficiaryZelle } from '../Wallet/TransfersZelle/BeneficiaryZelle';
import { BeneficiaryZelleAdd } from '../Wallet/TransfersZelle/BeneficiaryZelleAdd';
import { AmountTransfertZelle } from '../Wallet/TransfersZelle/AmountTransfertZelle';
import { ConfirmationTransfersZelle } from '../Wallet/TransfersZelle/ConfirmationTransfersZelle';
import { SuccessTransfersZelle } from '../Wallet/TransfersZelle/SuccessTransfersZelle';


export function WalletTransferZelle() {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
          <div>
            {useWallet.pagesTransfersZelle.states.isFetching ? <Loading /> : 
              <>
                   {
                      useWallet.pagesTransfersZelle.states.isBeneficiary &&   
                      <BeneficiaryZelle />
                   }

                   { 
                      useWallet.pagesTransfersZelle.states.isBeneficiaryAdd &&
                      <BeneficiaryZelleAdd />
                   }

                   {
                      useWallet.pagesTransfersZelle.states.isAmount &&
                      <AmountTransfertZelle />
                   }

                   {
                      useWallet.pagesTransfersZelle.states.isCheck &&
                      <ConfirmationTransfersZelle />
                   }

                   {
                      useWallet.pagesTransfersZelle.states.isSuccess &&
                      <SuccessTransfersZelle />

                   }

              </>
            }
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}