import { useState } from "react";
import { generalValidationButtonNext, validationInput } from '../../helpers';

type state = {
    roleName: string;
    roleNameOptions: { value: string; label: string }[];
    entityId: string;
    currentPassword: string;
    newPassword: string;
    email: string;
    emailValid: boolean;
    phone: string;
    phoneValid: boolean;
    phoneCode: string;
    phoneCodeValid: boolean;
}

type actions = {
    setRoleName: (value: string) => void;
    setEntityId: (value: string) => void;
    setCurrentPassword: (value: string) => void;
    setNewPassword: (value: string) => void;
    validationPasswordBotton: () => boolean;
    validationPasswordResetBotton: () => boolean;
    validationEmail: (value: string) => boolean;
    changeEmail: (value: string) => void;
    validationPhone: (value: string) => boolean;
    changePhone: (value: string) => void;
    validationCheckPhone: (value: string) => boolean;
    changePhoneCode: (value: string) => void;
    validationPhoneBotton1: () => boolean;
    validationPhoneBotton2: () => boolean;
}

export type UseGafpriAttributesUserReturn = {
    states: state;
    actions: actions;
}


export const useGafpriAttributesUser = (): UseGafpriAttributesUserReturn => {
    const [entityId, setEntityId] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const roleNameOptions = [
        {value: 'Customer', label: 'Customer'},
        {value: 'Employee', label: 'Employee'},
        {value: 'Technical', label: 'Technical'},
    ];
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [phoneValid, setPhoneValid] = useState<boolean>(false);
    const [phoneCode, setPhoneCode] = useState<string>('');
    const [phoneCodeValid, setPhoneCodeValid] = useState<boolean>(false);


    const validationPasswordBotton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                currentPassword !== '',
                newPassword !== '',
                newPassword.length >= 8,
            ],
            inputId: 'password',
        });
        return valid;
    }

    const validationPasswordResetBotton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                emailValid
            ],
            inputId: 'password-reset',
        });
        return valid;
    }

    const validationPhoneBotton1 = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                phoneValid
            ],
            inputId: 'phone-1',
        });
        return valid;
    }

    const validationPhoneBotton2 = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                phoneValid,
                phoneCodeValid
            ],
            inputId: 'phone-2',
        });
        return valid;
    }

    const validationEmail = (value: string) => {
        const valid = validationInput(
            value,
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            true
        );
        if (valid !== emailValid) {
            setEmailValid(valid);
        }
        return valid;
    }

    const validationPhone = (value: string) => {
        const valid = validationInput(
          value,
          /^[0-9]{12}$/,
          true
        );
        if (valid !== phoneValid) {
          setPhoneValid(valid);
        }
        return valid;
      }
    
      const validationCheckPhone = (value: string) => {
        const valid = value.length === 4;
        if (valid !== phoneCodeValid) {
          setPhoneCodeValid(valid);
        }
        return valid;
      }

    const changeEmail = (value: string) => {
        const newValue = value.toLowerCase();
        validationEmail(newValue);
        setEmail(value);
    }

    const changePhone = (value: string) => {
        let newValue = value;
        if(value !== ''){
          newValue = `58${value}`;
        }
        validationPhone(newValue);
        setPhone(newValue);
      }
    
      const changePhoneCode = (value: string) => {
        validationCheckPhone(value);
        setPhoneCode(value);
      }

    return {
        states: {
            roleName,
            roleNameOptions,
            entityId,
            currentPassword,
            newPassword,
            email,
            emailValid,
            phone,
            phoneValid,
            phoneCode,
            phoneCodeValid
        },
        actions: {
            setRoleName,
            setEntityId,
            setCurrentPassword,
            setNewPassword,
            validationPasswordBotton,
            validationPasswordResetBotton,
            validationEmail,
            changeEmail,
            validationPhone,
            changePhone,
            validationCheckPhone,
            changePhoneCode,
            validationPhoneBotton1,
            validationPhoneBotton2
        }
    }

}