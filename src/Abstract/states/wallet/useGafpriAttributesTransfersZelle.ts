import { useState } from 'react';
import { truncarTexto } from 'gafprilibui';
import { WalletBeneficiariesAttributesReturn } from './useGafpriApiWalletAccount';
import { generalValidationButtonNext, validationInput } from '../../helpers';

type account = {
    id: string;
    name: string;
    balance: string;
}

type states = {
    email: string;
    emailValid: boolean;
    phone: string;
    phoneValid: boolean;
    beneficiary: WalletBeneficiariesAttributesReturn | null;
    account: account | null;
    amount: string;
    name: string;
    findValue: string;
    note: string;
}

type actions = {
    validationEmail: (value: string) => boolean;
    validationPhone: (value: string) => boolean;
    changeEmail: (value: string) => void;
    changePhone: (value: string) => void;

    infoReset: () => void;
    setBeneficiary: (beneficiary: WalletBeneficiariesAttributesReturn | null) => void;
    setAccount: (account: account | null) => void;
    setAmount: (amount: string) => void;
    
    setName: (name: string) => void;
    validationButtonBeneficiaryAdd:() => boolean;
    setFindValue: (findValue: string) => void;
    validationButtonAmount: () => boolean;
    changeNote: (value: string) => void;
}



export type UseGafpriAttributesTransfersZelleReturn = {states: states, actions: actions};



export const useGafpriAttributesTransfersZelle = (): UseGafpriAttributesTransfersZelleReturn => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState<boolean>(false);
    const [beneficiary, setBeneficiary] = useState<WalletBeneficiariesAttributesReturn | null>(null);
    const [account, setAccount] = useState<account | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [findValue, setFindValue] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const validationEmail = (value: string): boolean => {
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

    const validationPhone = (value: string): boolean => {
        const valid = validationInput(
          value,
          /^[0-9]{10}$/,
          true
        );
        if (valid !== phoneValid) {
          setPhoneValid(valid);
        }
        return valid;
    }

    const validationButtonBeneficiaryAdd = (): boolean => {
        return generalValidationButtonNext({
            validations: [
                (emailValid || phoneValid),
                name !== '',
            ],
            inputId: 'beneficiary-add-button'
        })
    }

    const validationButtonAmount = (): boolean => {
        return generalValidationButtonNext({
            validations: [
                amount !== '',
                account !== null,
                beneficiary !== null
            ],
            inputId: 'amount-button'
        })
    }

    const infoReset = () => {
        setEmail('');
        setName('');
        setBeneficiary(null);
        setAccount(null);
        setAmount('');
        setPhone('');
        setFindValue('');
        setNote('');
    }

    const changeEmail = (value: string) => {
        const newValue = value.toLowerCase();
        validationEmail(newValue);
        setEmail(value);
    }

    const changePhone = (value: string) => {
        validationPhone(value);
        setPhone(value);
    }

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    

    const states = { 
        email, 
        emailValid,
        beneficiary, 
        account, 
        amount, 
        phone,
        phoneValid, 
        name, 
        findValue, 
        note 
    };

    const actions = { 
        validationEmail,
        validationPhone,
        changeEmail,
        changePhone,
        infoReset, 
        setBeneficiary, 
        setAccount, 
        setAmount, 
        setName, 
        validationButtonBeneficiaryAdd, 
        setFindValue, 
        validationButtonAmount, 
        changeNote 
    };

    return { states, actions };

}