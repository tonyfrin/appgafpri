'use client'
import { useState } from 'react';
import { UseGafpriAttributesSingUpReturn } from './useGafpriAttributesSingUp';

type State = {
    isFetching: boolean;
    isInit: boolean;
    isEmail: boolean;
    isEmailCheck: boolean;
    isPhone: boolean;
    isPhoneCheck: boolean;
    isName: boolean;
    isLegal: boolean;
    isPhotoLegal: boolean;
    isSelfie: boolean;
    isFinal: boolean;
};

type Actions = {
    onFetching: () => void;
    onInit: () => void;
    onEmail: () => void;
    onEmailCheck: () => void;
    onPhone: () => void;
    onPhoneCheck: () => void;
    onName: () => void;
    onLegal: () => void;
    onPhotoLegal: () => void;
    onSelfie: () => void;
    onFinal: () => void;
    returnInit: () => void;
};



export type UseGafpriPagesSingUpReturn = {
  states: State;
  actions: Actions;
};

export type UseGafpriPagesSingUpProps = {
  attributes: UseGafpriAttributesSingUpReturn;
};

export function useGafpriPagesSingUp({attributes}: UseGafpriPagesSingUpProps): UseGafpriPagesSingUpReturn {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isPhoneCheck, setIsPhoneCheck] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isLegal, setIsLegal] = useState<boolean>(false);
  const [isPhotoLegal, setIsPhotoLegal] = useState<boolean>(false);
  const [isSelfie, setIsSelfie] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);

 
  const onFetching = () => {
    setIsFetching(true);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onInit = () => {
    setIsFetching(false);
    setIsInit(true);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onEmail = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(true);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onEmailCheck = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(true);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onPhone = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(true);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onPhoneCheck = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(true);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onName = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(true);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onLegal = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(true);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onPhotoLegal = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(true);
    setIsSelfie(false);
    setIsFinal(false);
  };

  const onSelfie = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(true);
    setIsFinal(false);
  };

  const onFinal = () => {
    setIsFetching(false);
    setIsInit(false);
    setIsEmail(false);
    setIsEmailCheck(false);
    setIsPhone(false);
    setIsPhoneCheck(false);
    setIsName(false);
    setIsLegal(false);
    setIsPhotoLegal(false);
    setIsSelfie(false);
    setIsFinal(true);
  };

  const returnInit = () => {
    attributes.actions.infoReset();
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
    isEmail,
    isEmailCheck,
    isPhone,
    isPhoneCheck,
    isName,
    isLegal,
    isPhotoLegal,
    isSelfie,
    isFinal,
  };

  const actions = {
    onFetching,
    onInit,
    onEmail,
    onEmailCheck,
    onPhone,
    onPhoneCheck,
    onName,
    onLegal,
    onPhotoLegal,
    onSelfie,
    onFinal,
    returnInit
  };

  return {
    states,
    actions,
  };
}
