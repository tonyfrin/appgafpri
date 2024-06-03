import { gafpriFetch } from '../../helpers';
import {
  CART_ITEMS_ROUTE,
} from '../../constants';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { ProductsAttributesReturn } from '../products/useGafpriApiProducts';

export type CartItemsAttributesReturn = {
  id: string,
  cartPostsId: string;
  productsPostsId: string;
  sku: string;
  name: string;
  qty: string;
  price: string;
  subTotal: string;
  subTotalTax: string;
  total: string;
  type: string;
  taxClass: string;
  products: ProductsAttributesReturn;
};

type Actions = {
  addItemToCart: (
    qty: string,
    productsPostsId: string,
  ) => Promise<any>;
  updateItemToCart: (
    qty: string,
    id: string,
  ) => Promise<any>;
};

export type UseGafpriApiCartItemsReturn = {
  actions: Actions;
};

export type UseGafpriApiCartItemsProps = {
  useLogin: UseGafpriLoginReturn;
};

export async function useGafpriApiCartItems({
  useLogin,
}: UseGafpriApiCartItemsProps): Promise<UseGafpriApiCartItemsReturn> {

  const addItemToCart = async (
    qty: string,
    productsPostsId: string,
  ): Promise<any> => {
    try {

      if(useLogin.data.states.token){
        const data = await gafpriFetch({
          initMethod: 'POST',
          initCredentials: {
            qty,
            productsPostsId,
          },
          initRoute: CART_ITEMS_ROUTE,
          initToken: { token: useLogin.data.states.token }
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  const updateItemToCart = async (
    qty: string,
    id: string,
  ): Promise<any> => {
    try {
      if(useLogin.data.states.token){
        const data = await gafpriFetch({
          initMethod: 'PATCH',
          initCredentials: {
            qty,
          },
          initRoute: `${CART_ITEMS_ROUTE}/${id}`,
          initToken: { token: useLogin.data.states.token }
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * Export
   *
   *
   */

  const actions = {
    addItemToCart,
    updateItemToCart
  };

  return {
    actions,
  };
}
