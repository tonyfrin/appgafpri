import { useEffect } from 'react';
import { gafpriFetch } from '../../helpers';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { CURRENCIES_ROUTE } from '../../constants';
import { UseGafpriAttributesCurrenciesReturn } from './useGafpriAttributesCurrencies';


export interface CurrenciesAttributesReturn {
  id: number;
  name: string;
  symbol: string;
  exchangeRate: string;
  commissionType: string;
  commissionRate: string;
  createdAt: Date;
  modifiedAt: Date;
}

type Actions = {
  getCurrencies: () => Promise<any>;
  addCurrencies: () => Promise<any>;
  getCurrency: (id: string) => Promise<any>;
  updateCurrencies: (id: string) => Promise<any>;
} 

export type UseGafpriApiCurrenciesReturn = {
  actions: Actions;
};

export type UseGafpriApiCurrenciesProps = {
  useLogin: UseGafpriLoginReturn;
  attributes: UseGafpriAttributesCurrenciesReturn;
};

export function useGafpriApiCurrencies({
  useLogin,
  attributes
}: UseGafpriApiCurrenciesProps): UseGafpriApiCurrenciesReturn {
    
  const getCurrencies = async (): Promise<any> => {
        try {
    
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'GET',
              initRoute: CURRENCIES_ROUTE,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
  };

  const addCurrencies = async (): Promise<any> => {
      try {

          const dataCurrencies = {
              name: attributes.states.name,
              symbol: attributes.states.symbol,
              exchangeRate: attributes.states.exchangeRate,
              commissionType: attributes.states.commissionType,
              commissionRate: attributes.states.commissionRate 
          }

          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'POST',
              initRoute: CURRENCIES_ROUTE,
              initToken: { token: useLogin.data.states.token },
              initCredentials: dataCurrencies
            });
            return data;
          }
        } catch (error) {
          return error;
        }
  };

  const updateCurrencies = async (id: string): Promise<any> => {
    try {

        const dataCurrencies = {
            name: attributes.states.name,
            symbol: attributes.states.symbol,
            exchangeRate: attributes.states.exchangeRate,
            commissionType: attributes.states.commissionType,
            commissionRate: attributes.states.commissionRate 
        }

        if(useLogin.data.states.token){
          const data = await gafpriFetch({
            initMethod: 'PATCH',
            initRoute: `${CURRENCIES_ROUTE}/${id}`,
            initToken: { token: useLogin.data.states.token },
            initCredentials: dataCurrencies
          });
          return data;
        }
      } catch (error) {
        return error;
      }
};

  const getCurrency = async (id: string): Promise<any> => {
    try {

      if(useLogin.data.states.token){
        const data = await gafpriFetch({
          initMethod: 'GET',
          initRoute: `${CURRENCIES_ROUTE}/${id}`,
          initToken: { token: useLogin.data.states.token }
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!attributes.states.isReadyCurrencies && useLogin.data.states.token) {
        const fechtCurrencies = async () => {
            const data = await getCurrencies();
            if(data && data.success){
              attributes.actions.setCurrencies(data.data.items);
                attributes.actions.setIsReadyCurrencies(true);
            } else{
                attributes.actions.setCurrencies(null);
                attributes.actions.setIsReadyCurrencies(false);
            }
        }

        fechtCurrencies();
    }
  }, [attributes.states.isReadyCurrencies, useLogin.data.states.token]); // eslint-disable-line

  /**
   * Export
   *
   *
   */
 

  const actions = {
    getCurrencies,
    addCurrencies,
    getCurrency,
    updateCurrencies
  };

  return {
    actions,
  };
}
