import { useState, useEffect } from 'react';
import { gafpriFetch } from '../../helpers';
import { SITES_ROUTE } from '../../constants';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { EntityAttributesReturn } from '../user/useGafpriApiEntity';
import { UseGafpriAttributesSitesReturn } from './useGafpriAttributesSites';
import { UserAttributesReturn } from '../user/useGafpriApiUser';

type SitesEntityAttributesReturn = {
    id: string;
    sitesId: string;
    entityId: string;
    entity: EntityAttributesReturn;
}

export interface SitesEmployeesAttributesReturn {
  id?: number;
  sitesId: number;
  userId: number;
  permissions: string[];
  user: UserAttributesReturn;
}

export type SitesAttributesReturn = {
    id: string;
    name: string;
    tradename: string;
    documentIndex: string;
    documentNumber: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    postCode: string | null;
    country: string;
    email: string | null;
    phone: string | null;
    currenciesId: number;
    currencyLocation: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    decimalNumbers: number;
    taxes: boolean;
    host: string;
    createdAt: string;
    modifiedAt: string;
    sitesEntity: SitesEntityAttributesReturn[];
    sitesEmployees: SitesEmployeesAttributesReturn[];
}

type States = {
    sites: SitesAttributesReturn[] | null;
    sitesIsReady: boolean;
    mySites: SitesAttributesReturn[] | null;
    mySitesIsReady: boolean;
}

type Actions = {
    getSites: () => Promise<any>;
    getMySites: () => Promise<any>;
    getMySiteById: (id: string) => SitesAttributesReturn | null;
    getSiteById: (id: string) => SitesAttributesReturn | null;
    addEmployees: (sitesId: string) => Promise<any>;
    deleteEmployees: (employessId: string) => Promise<any>;
    handleUpdatedMySites: (itemUpdate: SitesAttributesReturn) => void;
    
}

export type UseGafpriApiSitesReturn = {
    actions: Actions;
    states: States;
}

type UseGafpriApiSitesProps = {
    useLogin: UseGafpriLoginReturn;
    attributes: UseGafpriAttributesSitesReturn;
}

export const useGafpriApiSites = ({
    useLogin,
    attributes
}: UseGafpriApiSitesProps): UseGafpriApiSitesReturn => {
    const [sites, setSites] = useState<SitesAttributesReturn[] | null>(null);
    const [sitesIsReady, setSitesIsReady] = useState<boolean>(false);
    const [mySites, setMySites] = useState<SitesAttributesReturn[] | null>(null);
    const [mySitesIsReady, setMySitesIsReady] = useState<boolean>(false);
    
    
    const getSites = async (): Promise<any> => {
        try {
    
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'GET',
              initRoute: SITES_ROUTE,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    };

    const getMySites = async (): Promise<any> => {
      try {
        if(useLogin.data.states.token){
          const data = await gafpriFetch({
            initMethod: 'GET',
            initRoute: `${SITES_ROUTE}/app`,
            initToken: { token: useLogin.data.states.token }
          });
          return data;
        }
      } catch (error) {
        return error;
      }
    }

    function getMySiteById(id: string): SitesAttributesReturn | null {
      return mySites?.find((item) => `${item.id}` === `${id}`) || null;
    }

    function getSiteById(id: string): SitesAttributesReturn | null {
      return sites?.find((item) => `${item.id}` === `${id}`) || null;
    }

    const addEmployees = async (sitesId: string): Promise<any> => {
        try {
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'POST',
              initRoute: `${SITES_ROUTE}/add-employees`,
              initToken: { token: useLogin.data.states.token },
              initCredentials:{
                userId: attributes.states.userId,
                sitesId,
                permissions: [attributes.states.permissions]
              }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    }

    const deleteEmployees = async (employessId: string): Promise<any> => {
        try {
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'DELETE',
              initRoute: `${SITES_ROUTE}/employees`,
              initToken: { token: useLogin.data.states.token },
              initCredentials:{
                id: employessId,
              }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    }

    const handleUpdatedMySites = (itemUpdate: SitesAttributesReturn): void => {
      setMySites((prevState) => {
        if(!prevState) return [];
        const updatedItems =
          prevState.map((item) =>
            `${item.id}` === `${itemUpdate.id}` ? itemUpdate : item
          ) || [];
        return updatedItems;
      });
    };


    useEffect(() => {
      
        const fetchSites = async () => {
          try {
            setSitesIsReady(false);
            const data = await getSites();
            
            if(data && data.success){
              setSites(data.data.items);
            } else {
              setSites([]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setSitesIsReady(true);
          }
        }

        const fetchMySites = async () => {
          try {
            setMySitesIsReady(false);
            const data = await getMySites();
            if(data && data.success){
              setMySites(data.items);
            } else {
              setMySites([]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setMySitesIsReady(true);
          }
        }
    
   
    
        fetchSites();
        fetchMySites();
     
    }, [useLogin.data.states.token]);  // eslint-disable-line react-hooks/exhaustive-deps

    const actions = {
        getSites,
        getMySites,
        getMySiteById,
        addEmployees,
        deleteEmployees,
        handleUpdatedMySites,
        getSiteById
    }

    const states = {
        sites,
        sitesIsReady,
        mySites,
        mySitesIsReady
    }

    return {
        actions,
        states
    }
}