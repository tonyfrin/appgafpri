import { useState } from 'react';
import { useRouter } from 'next/router';
import { gafpriFetch } from '../../helpers';
import { getItem, saveItem } from '../../context';
import {
  TOKEN_STORAGE,
  CURRENT_USER_STORAGE,
  LOGIN_ROUTE,
  LOGIN_TOKEN_ROUTE,
} from '../../constants';
import { UseGafpriAttributesLoginReturn } from './useGafpriAttributesLogin';
import { UseGafpriErrorReturn, ErrorResponseProps, CustomErrorResponseProps } from '../useGafpriError';

type CurrentUserAttributes = {
  id: number;
  role: string;
  name: string;
  lastName: string;
  photo: string;
  phone: string;
  phoneConfirmation: boolean;
};

interface LoginCredentials {
  userName: string;
  password: string;
}

type State = {
  isLogin: boolean;
  token: string | null;
  currentUser: CurrentUserAttributes | null;
};

type Actions = {
  login: () => Promise<void>;

  logout: () => void;

  checkLoginToken: () => Promise<any>;

  onCheckLoginToken: (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }) => void;

  onCheckLoginTokenLogin: (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }) => void;

  onCheckLoginTokenRefresh: (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }) => void;
};

export type UseGafpriDataLoginReturn = {
  states: State;
  actions: Actions;
};

export type UseGafpriDataLoginProps = {
  setIsFetchingGlobal: (value: boolean) => void;
  globalResetInfo: () => void;
  attributes: UseGafpriAttributesLoginReturn;
  useError: UseGafpriErrorReturn;
};

export function useGafpriDataLogin({
  setIsFetchingGlobal,
  globalResetInfo,
  attributes,
  useError,
}: UseGafpriDataLoginProps): UseGafpriDataLoginReturn {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const [token, setToken] = useState<string | null>(
    getItem(TOKEN_STORAGE, null)
  );
  const [currentUser, setCurrentUser] = useState<CurrentUserAttributes | null>(
    getItem(CURRENT_USER_STORAGE, null)
  );

  
  // Funciones de cambios

  
  const changeToken = (value: string | null): void => {
    setToken(value);
    saveItem(TOKEN_STORAGE, value);
  };

  const changeCurrentUser = (value: CurrentUserAttributes | null): void => {
    setCurrentUser(value);
    saveItem(CURRENT_USER_STORAGE, value);
  };

  /**
   * Actions
   *
   *
   */

  const onFetching = (): void => {
    setIsFetchingGlobal(true);
  }

  const onLoginSuccess = (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }): void => {
    if (data && data.user && data.token) {
      changeToken(data.token);
      changeCurrentUser(data.user);
      setIsLogin(true);
      setIsFetchingGlobal(false);
      router.push('/inicio');
      attributes.actions.resetInfo();
    }
  };

  const onCheckLoginTokenRefresh = (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }): void => {
    if (data && data.user && data.token) {
      changeCurrentUser(data.user);
      setIsLogin(true);
      setIsFetchingGlobal(false);
      attributes.actions.resetInfo();
    } else {
      logout();
    }
  };

  const logout = (): void => {
    setIsLogin(false);
    changeToken(null);
    changeCurrentUser(null);
    globalResetInfo();
    setIsFetchingGlobal(false);
    router.push('/login');
  };

  const newError = (
    newErrorValue: unknown | ErrorResponseProps | CustomErrorResponseProps
  ): void => {
    useError.actions.newError({
      newErrorValue,
      functionAction: logout,
    });
  };

  const login = async (): Promise<void> => {
    if (attributes.states.userNameValid && attributes.states.passwordValid) {
      gafpriFetch({
        initMethod: 'POST',
        initRoute: LOGIN_ROUTE,
        initCredentials: {
          userName: attributes.states.userName,
          password: attributes.states.password,
        },
        functionFetching: onFetching,
        functionSuccess: onLoginSuccess as (data: LoginCredentials) => void,
        functionError: newError,
      });
    }
  };

  const onCheckLoginToken = (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }): void => {
    if (data && data.user && data.token) {
      setIsLogin(true);
      setIsFetchingGlobal(false);
      attributes.actions.resetInfo();
    } else {
      logout();
    }
  };

  const onCheckLoginTokenLogin = (data: {
    user?: CurrentUserAttributes | undefined;
    token?: string | undefined;
  }): void => {
    if (data && data.user && data.token) {
      setIsLogin(true);
      setIsFetchingGlobal(false);
      attributes.actions.resetInfo();
      router.push('/inicio');
    } else {
      setIsLogin(false);
      changeToken(null);
      changeCurrentUser(null);
    }
  };

  const checkLoginToken = async (): Promise<any> => {
    if (token) {
      const data = await gafpriFetch({
        initMethod: 'GET',
        initRoute: LOGIN_TOKEN_ROUTE,
        initToken: {
          token,
        },
      });
      return data;
    }
  };

  /**
   * Export
   *
   *
   */
  const states = {
    isLogin,
    token,
    currentUser,
  };

  const actions = {
    login,

    logout,

    checkLoginToken,

    onCheckLoginToken,

    onCheckLoginTokenLogin,

    onCheckLoginTokenRefresh
  };

  return {
    states,
    actions,
  };
}
