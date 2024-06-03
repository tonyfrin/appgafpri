import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext';
import { InitCheckOut } from '../CheckOut/InitCheckOut';
import { AddressList } from '../CheckOut/AddressList';
import { AddressAdd } from '../CheckOut/AddressAdd';
import { PaymentMethod } from '../CheckOut/PaymentMethod';
import { Summary } from '../CheckOut/Summary';
import { Loading } from '../Loading';
import { AddressUpdate } from '../CheckOut/AddressUpdate';
import { FadeIn } from '../Fade/FadeIn';
import { StoreList } from '../CheckOut/StoreList';
import { CartAttributesReturn } from '../states/cart/useGafpriApiCart';
import { Final } from '../CheckOut/Final';
import { OrderError } from '../CheckOut/OrderError';

const containerModalStyle = css`
  background-color: #ececec;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-top: 1px solid #e1e1e1;
  width: 100%;
  height: 100%;
  top: 20%;
  border-radius: 10px;
  overflow-y: auto;
  height: 81vh;
`

export type CheckOutProps = {
  setModal: (value: boolean) => void;
  modal: boolean;
  cart: CartAttributesReturn | null;
  setCart: (value: CartAttributesReturn | null) => void;
}

export function CheckOut({
    setModal,
    modal,
    cart,
    setCart
}: CheckOutProps) {
  const { useCheckOut, useUser, useSites, siteOptions } = useTheme();
  const user = useUser.api.states.user;

  const sites = useSites.api.states.sites;



  const returnItit = () => {
    setModal(false);
    useCheckOut.pages.actions.onInit();
  }

  useEffect(() => {
    if(sites && sites?.length > 0) {
      const mainSite = useSites.api.actions.getSiteById(siteOptions.id.toString());
      if(mainSite){
        useCheckOut.attributes.actions.setSitesWalletAccount(mainSite.sitesEntity[0].entity.walletAccount[0]);
      }
    }
  }, [sites]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <> 
          <div className={containerModalStyle}>
              <button 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 'auto',
                }}  
                onClick={() => returnItit()}
              >
                <AiOutlineCloseCircle style={{margin: '0.5em auto 0px auto', display: 'block', fontSize: '2em', color: '#909090'}}/> 
              </button>
                {useCheckOut.pages.states.isFetching || !useUser.api.states.userIsReady || !user || !sites ?
                  <Loading />
                  : 
                  <div>

                      {modal && useCheckOut.pages.states.isInit && user &&
                        <FadeIn keyName='isInit' isVisible={useCheckOut.pages.states.isInit}>
                          <InitCheckOut cart={cart} user={user} sites={sites} setCart={setCart}/>
                        </FadeIn>
                      }

                      {useCheckOut.pages.states.isAddressList && user &&
                        <FadeIn keyName='isAddressList' isVisible={useCheckOut.pages.states.isAddressList}>
                          <AddressList />
                        </FadeIn>
                      }

                      {useCheckOut.pages.states.isAddressUpdate && user &&
                        <FadeIn keyName='isAddressUpdate' isVisible={useCheckOut.pages.states.isAddressUpdate}>
                          <AddressUpdate />
                        </FadeIn>
                      }

                      {useCheckOut.pages.states.isAddressAdd && user &&
                        <FadeIn keyName='isAddressAdd' isVisible={useCheckOut.pages.states.isAddressAdd}>
                          <AddressAdd />
                        </FadeIn>
                      }

                      {
                        useCheckOut.pages.states.isPaymentList && user &&
                        <FadeIn keyName='isPaymentList' isVisible={useCheckOut.pages.states.isPaymentList}>
                          <PaymentMethod />
                        </FadeIn>
                      }

                      {
                        useCheckOut.pages.states.isSummary && user &&
                        <FadeIn keyName='isSummary' isVisible={useCheckOut.pages.states.isSummary}>
                          <Summary cart={cart}/>
                        </FadeIn>
                      }

                      {
                        useCheckOut.pages.states.isStoreList && user &&
                        <FadeIn keyName='isStoreList' isVisible={useCheckOut.pages.states.isStoreList}>
                          <StoreList />
                        </FadeIn>
                      }

                      {
                        useCheckOut.pages.states.isFinal && user &&
                        <FadeIn keyName='isFinal' isVisible={useCheckOut.pages.states.isFinal}>
                          <Final />
                        </FadeIn>
                      }

{
                        useCheckOut.pages.states.isError && user &&
                        <FadeIn keyName='isError' isVisible={useCheckOut.pages.states.isError}>
                          <OrderError />
                        </FadeIn>
                      }
                  </div>
                }
        </div>
    </>
  );
}