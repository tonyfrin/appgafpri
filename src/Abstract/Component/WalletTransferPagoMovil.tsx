import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { LayoutAppProfile } from './LayoutAppProfile';
import { BeneficiaryPagoMovil } from '../Wallet/TransfersPagoMovil/BeneficiaryPagoMovil';

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
                     
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isAmount &&
                      <>
                     
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isCheck &&
                      <>
                     
                     </>
                   }

                   {
                      useWallet.pagesTransfersPagoMovil.states.isSuccess &&
                      <>
                     
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