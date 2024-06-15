import React, { use } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { LayoutAppProfile } from './LayoutAppProfile';
import { AmountCashAdvance } from '../Wallet/CashAdvance/AmountCashAdvance';
import { StoreCashAdvance } from '../Wallet/CashAdvance/StoreCashAdvance';
import { TimeCashAdvance } from '../Wallet/CashAdvance/TimeCashAdvance';
import { ConfirmationCashAdvance } from '../Wallet/CashAdvance/ConfirmationCashAdvance';
import { SuccessCashAdvance } from '../Wallet/CashAdvance/SuccessCashAdvance';
import { ErrorCashAdvance } from '../Wallet/CashAdvance/ErrorCashAdvance';

export function WalletCashAdvance() {
  const { useWallet } = useTheme();


  return (
    <>
      <LayoutAppProfile>
        <>
          <div>
            {useWallet.pagesCashAdvance.states.isFetching ? <Loading /> : 
              <>

                   {
                      useWallet.pagesCashAdvance.states.isAmount &&
                      <>
                        <AmountCashAdvance />
                      </>
                   }

                  {
                      useWallet.pagesCashAdvance.states.isStore &&
                      <>
                        <StoreCashAdvance />
                      </>
                  }

                  {
                      useWallet.pagesCashAdvance.states.isTime &&
                      <>
                        <TimeCashAdvance />
                      </>
                  }

                  {
                    useWallet.pagesCashAdvance.states.isCheck &&
                    <>
                      <ConfirmationCashAdvance />
                    </>
            
                  }

                  {
                    useWallet.pagesCashAdvance.states.isSuccess &&
                    <>
                      <SuccessCashAdvance />
                    </>
                  }

                  {
                    useWallet.pagesCashAdvance.states.isError &&
                    <>
                      <ErrorCashAdvance />
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