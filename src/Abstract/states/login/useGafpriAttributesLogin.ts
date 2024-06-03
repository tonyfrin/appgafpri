'use client'
import { useState } from 'react';
import { generalValidationButtonNext, validationInput } from '../../helpers';

type State = {
   userName: string;
    userNameValid: boolean;
    password: string;
    passwordValid: boolean;
};

type Actions = {
  validationUserName: (value: string) => boolean;
  validationPassword: (value: string) => boolean;
  changeUserName: (value: string) => void;
  changePassword: (value: string) => void;
  validationButton: () => boolean;
  resetInfo: () => void;
};



export type UseGafpriAttributesLoginReturn = {
  states: State;
  actions: Actions;
};

export function useGafpriAttributesLogin(): UseGafpriAttributesLoginReturn {
  const [userName, setUserName] = useState<string>('');
  const [userNameValid, setUserNameValid] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const resetInfo = (): void => {
    setUserName('');
    setUserNameValid(false);
    setPassword('');
    setPasswordValid(false);
  }

  
  const validationUserName = (value: string) => {
    const valid = validationInput(
      value,
      /^[-a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_,./&'@-\s]+$/,
      true
    );
    if (valid !== userNameValid) {
      setUserNameValid(valid);
    }
    return valid;
  }


  const validationPassword = (value: string) => {
    const valid = validationInput(
      value,
      /^.+$/,
      true
    );
    if (valid !== passwordValid) {
      setPasswordValid(valid);
    }
    return valid;
  }



  //Change

  const changeUserName = (value: string) => {
    const newValue = value.toLowerCase();
    validationUserName(newValue);
    setUserName(newValue);
  }

  const changePassword = (value: string) => {
    validationPassword(value);
    setPassword(value);
  }

  const validationButton = () => {
    return generalValidationButtonNext({
      validations: [
        userNameValid,
        passwordValid,
      ],
      inputId: 'login-button',
    });
  }

  /**
   * Export
   *
   *
   */
  const states = {
    userName,
    userNameValid,
    password,
    passwordValid,
  };

  const actions = {
    validationUserName,
    validationPassword,
    changeUserName,
    changePassword,
    validationButton,
    resetInfo,
  };

  return {
    states,
    actions,
  };
}
