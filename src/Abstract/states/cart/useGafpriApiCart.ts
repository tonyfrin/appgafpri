import { gafpriFetch } from '../../helpers';
import {
  CART_ROUTE,
} from '../../constants';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { CartItemsAttributesReturn } from '../cartItems/useGafpriApiCartItems';

export type CartAttributesReturn = {
  postsId: string,
  userId: string,
  paymentInit: string,
  subTotal: string,
  subTotalTax: string,
  total: string,
  cartItems: CartItemsAttributesReturn[],
};

type Actions = {
  getCart: (
  ) => Promise<any | null>;
};

export type UseGafpriApiCartReturn = {
  actions: Actions;
};

export type UseGafpriApiCartProps = {
  useLogin: UseGafpriLoginReturn;
};

export function useGafpriApiCart({
  useLogin,
}: UseGafpriApiCartProps): UseGafpriApiCartReturn {

  const getCart = async (
  ): Promise<any | null> => {
    try {
      if(useLogin.data.states.token){
        const resp = await gafpriFetch({
          initMethod: 'GET',
          initRoute: CART_ROUTE,
          initToken: { token: useLogin.data.states.token },
        });
        return resp;
      } 

      return null;
    } catch (error) {
      return error;
    }
  };

  /**
   * Export
   *
   *
   */

  const actions = {
    getCart
  };

  return {
    actions,
  };
}
