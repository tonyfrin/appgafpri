import React, { useEffect, useState } from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { FadeIn } from '../Fade/FadeIn';
import { InitProfile } from '../Profile/InitProfile';
import { Orders } from '../Profile/Orders';
import { OrderAttributesReturn } from '../states/order/useGafpriApiOrder';
import { Password } from '../Profile/Password';
import { SuccessPassword } from '../Profile/SuccessPassword';

export function Profile() {
  const { useProfile, useOrder, useLogin } = useTheme();
  const [orders, setOrders] = useState<OrderAttributesReturn[]>([]);

  useEffect(() => {
      
    const getOrders = async () => {
      useProfile.pages.actions.onFetching();
      const data = await useOrder.api.actions.getOrders();
      if(data && data.success){
        setOrders(data.items);
        useProfile.pages.actions.onInit();
      }
  }

  getOrders();
}, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <LayoutAppProfile>
        <>
              { useProfile.pages.states.isFetching ? <Loading /> :
                <div>

                    {
                      useProfile.pages.states.isInit &&
                      <FadeIn keyName='isInit' isVisible={useProfile.pages.states.isInit}>
                        <InitProfile />
                      </FadeIn>
                    }

                    {
                      useProfile.pages.states.isOrderList &&
                      <FadeIn keyName='isOrderList' isVisible={useProfile.pages.states.isOrderList}>
                        <Orders orders={orders}/>
                      </FadeIn>
                    }

                    {
                      useProfile.pages.states.isPassword &&
                      <FadeIn keyName='isPassword' isVisible={useProfile.pages.states.isPassword}>
                        <Password />
                      </FadeIn>
                    }

                    {
                      useProfile.pages.states.isSuccessPassword &&
                      <FadeIn keyName='isSuccessPassword' isVisible={useProfile.pages.states.isSuccessPassword}>
                        <SuccessPassword />
                      </FadeIn>
                    }
                
                </div>
              }
        </>
      </LayoutAppProfile>
    </>
  );
}