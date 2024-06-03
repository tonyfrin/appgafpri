'use client'
import { useState } from 'react';

type State = {
    isFetching: boolean;
    isInit: boolean;
    isSuccess: boolean;
    isError: boolean;
};

type Actions = {
    onFetching: () => void;
    onInit: () => void;
    onSuccess: () => void;
    onError: () => void;
    infoReset: () => void;
};



export type UseGafpriPagesPasswordResetReturn = {
  states: State;
  actions: Actions;
};

export function useGafpriPagesPasswordReset(): UseGafpriPagesPasswordResetReturn {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onFetching = () => {
    setIsFetching(true);
    setIsInit(false);
    setIsSuccess(false);
    setIsError(false);
  }

  const onInit = () => {
    setIsFetching(false);
    setIsInit(true);
    setIsSuccess(false);
    setIsError(false);
  }

  const onSuccess = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsSuccess(true);
    setIsError(false);
  }

  const onError = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsSuccess(false);
    setIsError(true);
  }

    const infoReset = (): void => {
      onInit();
    }



   /**
   * Export
   *
   *
   */

  const states = {
    isFetching,
    isInit,
    isSuccess,
    isError
  };

  const actions = {
    onFetching,
    onInit,
    onSuccess,
    onError,
    infoReset,
  };

  return {
    states,
    actions,
  };
}
