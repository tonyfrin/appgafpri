import { gafpriFetch } from '../../helpers';
import {
  CATEGORY_ROUTE,
} from '../../constants';
import { UseGafpriErrorReturn, ErrorResponseProps, CustomErrorResponseProps } from '../useGafpriError';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { ProductsAttributesReturn } from '../products/useGafpriApiProducts';

export type CategoryAttributesReturn = {
    id: string,
		slug: string,
	  parentId: string | null,
		name: string,
    description: string,
    photo: string,
    status: string,
    createdAt: string,
    modifiedAt: string,
    children: CategoryAttributesReturn[],
    products: ProductsAttributesReturn[],
};

type dataGetById = {
  item?: CategoryAttributesReturn,
  success?: boolean,
  initToken?: string | undefined,
}

type Actions = {
  getCategoryHomePage: (
    id: string,
    setItem: (item: CategoryAttributesReturn) => void,
  ) => Promise<void>;
};

export type UseGafpriApiCategoryReturn = {
  actions: Actions;
};

export type UseGafpriCategoryProps = {
  useLogin: UseGafpriLoginReturn;
  useError: UseGafpriErrorReturn;
};

export function useGafpriApiCategory({
  useLogin,
  useError,
}: UseGafpriCategoryProps): UseGafpriApiCategoryReturn {

  const getCategoryHomePage = async (
    id: string,
    setItem: (item: CategoryAttributesReturn) => void,
  ): Promise<void> => {

    const newError = (
      newErrorValue: unknown | ErrorResponseProps | CustomErrorResponseProps
    ): void => {
      useError.actions.newError({
        newErrorValue,
        functionAction: () => console.error(newErrorValue),
      });
    };
    try {

      const success = (data: dataGetById) => {
        if(data.item) setItem(data.item);
      }
      if(useLogin.data.states.token){
        gafpriFetch<dataGetById>({
          initMethod: 'GET',
          initRoute: `${CATEGORY_ROUTE}/${id}?limit=6&orderBy=name&order=ASC`,
          initToken: { token: useLogin.data.states.token },
          functionSuccess: success as (data: dataGetById) => void,
          functionError: newError,
        });
      }
    } catch (error) {
      newError(error);
    }
  };

  /**
   * Export
   *
   *
   */

  const actions = {
    getCategoryHomePage
  };

  return {
    actions,
  };
}
