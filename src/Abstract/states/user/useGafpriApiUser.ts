import { useState, useEffect} from 'react';
import { gafpriFetch } from '../../helpers';
import { USER_ROUTE } from '../../constants';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { EntityAttributesReturn } from './useGafpriApiEntity';
import { SiteOptions } from '../../config/gafpriConfig';
import { UseGafpriAttributesUserReturn } from './useGafpriAttributesUser';

export type UserAttributesReturn = {
    id: string;
    login: string;
    email: string;
    phone: string;
    rolesId: string;
    name: string;
    lastName: string | null;
    photo: string | null;
    emailConfirmation: boolean;
    phoneConfirmation: boolean;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    entity: EntityAttributesReturn[];
}

type States = {
    user: UserAttributesReturn | null;
    userIsReady: boolean;
}

type Actions = {
    getUser: () => Promise<any>;
    getUserPending: (offset: number, limit:  number) => Promise<any>;
    getUserById: (id: string) => Promise<any>;
    userAproval: (id: string) => Promise<any>;
    userCancel: (id: string) => Promise<any>;
    changePassword: () => Promise<any>; 
    setUser: (value: UserAttributesReturn | null) => void;
    getUserByEmail: (email: string) => Promise<any>;
    passwordReset: () => Promise<any>;
    updatePhone: () => Promise<any>;
}

export type UseGafpriApiUserReturn = {
    actions: Actions;
    states: States;
}

export type UseGafpriApiUserProps = {
    useLogin: UseGafpriLoginReturn;
    siteOptions: SiteOptions;
    attributes: UseGafpriAttributesUserReturn;
}

export function useGafpriApiUser({
    useLogin,
    siteOptions,
    attributes,
}: UseGafpriApiUserProps): UseGafpriApiUserReturn {
  const [user, setUser] = useState<UserAttributesReturn | null>(null);
  const [userIsReady, setUserIsReady] = useState<boolean>(false);

    const getUser = async (): Promise<any> => {
        try {
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'GET',
              initRoute: `${USER_ROUTE}/current`,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    };

    const getUserById = async (id: string): Promise<any> => {
        try {
    
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'GET',
              initRoute: `${USER_ROUTE}/${id}`,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    }

    const getUserPending = async (offset: number, limit:  number): Promise<any> => {
        try {
    
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'GET',
              initRoute: `${USER_ROUTE}?status=pending&orderBy=id&order=ASC&offset=${offset}&limit=${limit}&include=entity`,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    }

    const userAproval = async (id: string): Promise<any> => {
        try {
    
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'PATCH',
              initRoute: `${USER_ROUTE}/aproved/${id}`,
              initToken: { token: useLogin.data.states.token },
              initCredentials: {
                currenciesId: siteOptions.currencyId,
                entityId: attributes.states.entityId,
                roleName: attributes.states.roleName
              }
            });
            return data;
          }
        } catch (error) {
          return error;
        }
    }

    const userCancel = async (id: string): Promise<any> => {
        try {
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'DELETE',
              initRoute: `${USER_ROUTE}/${id}`,
              initToken: { token: useLogin.data.states.token }
            });
            return data;
          }
          return null;
        } catch (error) {
          return error;
        }
    }

    const changePassword = async (): Promise<any> => {
        try {
          if(useLogin.data.states.token){
            const data = await gafpriFetch({
              initMethod: 'PATCH',
              initRoute: `${USER_ROUTE}/password`,
              initToken: { token: useLogin.data.states.token },
              initCredentials: {
                currentPassword: attributes.states.currentPassword,
                newPassword: attributes.states.newPassword
              }
            });
            return data;
          }
          return null;
        } catch (error) {
          return error;
        }
    }

    const updatePhone = async (): Promise<any> => {
      try {
        if(useLogin.data.states.token){
          const data = await gafpriFetch({
            initMethod: 'PATCH',
            initRoute: `${USER_ROUTE}/phone`,
            initToken: { token: useLogin.data.states.token },
            initCredentials: {
              phone: attributes.states.phone,
              code: attributes.states.phoneCode
            }
          });
          return data;
        }
        return null;
      } catch (error) {
        return error;
      }
    }

    const passwordReset = async (): Promise<any> => {
      try {
       
          const data = await gafpriFetch({
            initMethod: 'PUT',
            initRoute: `${USER_ROUTE}/reset-password?email=${attributes.states.email}`,
            
          });
          return data;
        
      } catch (error) {
        return error;
      }
  }

    const getUserByEmail = async (email: string): Promise<any> => {
      try {
        if(useLogin.data.states.token){
          const data = await gafpriFetch({
            initMethod: 'GET',
            initRoute: `${USER_ROUTE}/email/${email}`,
            initToken: { token: useLogin.data.states.token }
          });
          return data;
        }
      } catch (error) {
        return error;
      }
  };

    useEffect(() => {
        const fetchDataUser = async () => {
            setUserIsReady(false);
            const data = await getUser();
            if(data && data.success) {
                setUser(data.item);
                setUserIsReady(true);
            }
        }
        fetchDataUser();
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    const states = {
        user,
        userIsReady
    }

    const actions = {
        getUser,
        getUserPending,
        getUserById,
        userAproval,
        userCancel,
        changePassword,
        setUser,
        getUserByEmail,
        passwordReset,
        updatePhone
    }

    return {
        actions,
        states
    }
}