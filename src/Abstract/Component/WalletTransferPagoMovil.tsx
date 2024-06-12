import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { LayoutAppProfile } from './LayoutAppProfile';
import { BeneficiaryPagoMovil } from '../Wallet/TransfersPagoMovil/BeneficiaryPagoMovil';
import { BeneficiaryPagoMovilAdd } from '../Wallet/TransfersPagoMovil/BeneficiaryPagoMovilAdd';
import { AmountTransfertPagoMovil } from '../Wallet/TransfersPagoMovil/AmountTransfertPagoMovil';
import { ConfirmationTransfersPagoMovil } from '../Wallet/TransfersPagoMovil/ConfirmationTransfersPagoMovil';
import { SuccessTransfersPagoMovil } from '../Wallet/TransfersPagoMovil/SuccessTransfersPagoMovil';

export function WalletTransferPagoMovil() {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
          <div>
            {useWallet.pagesTransfersPagoMovil.states.isFetching ? <Loading /> : 
              <>
                   {
                      useWallet.pagesTransfersPagoMovil.states.isBeneficiary &&   
                      <BeneficiaryPagoMovil />
                   }

                   { 
                      useWallet.pagesTransfersPagoMovil.states.isBeneficiaryAdd &&
                     <>
                      <BeneficiaryPagoMovilAdd />
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isAmount &&
                      <>
                      <AmountTransfertPagoMovil />
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isCheck &&
                      <>
                        <ConfirmationTransfersPagoMovil />
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isSuccess &&
                      <>
                        <SuccessTransfersPagoMovil />
                     </>

                   }

              </>
            }
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}