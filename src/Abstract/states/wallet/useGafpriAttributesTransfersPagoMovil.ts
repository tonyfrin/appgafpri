import { useState } from 'react';
import { truncarTexto } from 'gafprilibui';
import { WalletBeneficiariesAttributesReturn } from './useGafpriApiWalletAccount';
import { generalValidationButtonNext, validationInput } from '../../helpers';
import { CurrenciesAttributesReturn } from '../currencies/useGafpriApiCurrencies';

type account = {
    id: string;
    name: string;
    balance: string;
}

type states = {
    accountNumber: string;
    accountNumberValid: boolean;
    bankName: string;
    phone: string;
    phoneValid: boolean;
    beneficiary: WalletBeneficiariesAttributesReturn | null;
    account: account | null;
    amount: string;
    change: string;
    commission: string;
    name: string;
    findValue: string;
    note: string;
    currency: CurrenciesAttributesReturn | null;
    responsability: boolean;
    date: string;
    instructions: string;
}

type actions = {
    validationAccountNumber: (value: string) => boolean;
    validationPhone: (value: string) => boolean;
    changeAccountNumber: (value: string) => void;
    changePhone: (value: string) => void;

    infoReset: () => void;
    setBeneficiary: (beneficiary: WalletBeneficiariesAttributesReturn | null) => void;
    setAccount: (account: account | null) => void;
    setAmount: (amount: string) => void;
    setChange: (change: string) => void;
    setCommission: (commission: string) => void;
    
    setName: (name: string) => void;
    setBankName: (bankName: string) => void;
    validationButtonBeneficiaryAdd:() => boolean;
    setFindValue: (findValue: string) => void;
    validationButtonAmount: () => boolean;
    changeNote: (value: string) => void;
    setCurrency: (currency: CurrenciesAttributesReturn | null) => void;
    setResponsability: (value: boolean) => void;
    validationResponsabilitytButton: () => boolean;
    setDate: (date: string) => void;
    setInstructions: (instructions: string) => void;
}



export type UseGafpriAttributesTransfersPagoMovilReturn = {states: states, actions: actions};



export const useGafpriAttributesTransfersPagoMovil = (): UseGafpriAttributesTransfersPagoMovilReturn => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState('');
    const [bankName, setBankName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [accountNumberValid, setAccountNumberValid] = useState<boolean>(false);
    const [phoneValid, setPhoneValid] = useState<boolean>(false);
    const [beneficiary, setBeneficiary] = useState<WalletBeneficiariesAttributesReturn | null>(null);
    const [account, setAccount] = useState<account | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [change, setChange] = useState<string>('');
    const [commission, setCommission] = useState<string>('');
    const [findValue, setFindValue] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [currency, setCurrency] = useState<CurrenciesAttributesReturn | null>(null);
    const [responsability, setResponsability] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');

    const validationPhone = (value: string): boolean => {
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

    const validationAccountNumber = (value: string): boolean => {
        const valid = validationInput(
          value,
          /^[0-9]{6,}$/,
          true
        );
        if (valid !== accountNumberValid) {
          setAccountNumberValid(valid);
        }
        return valid;
    }

    const validationButtonBeneficiaryAdd = (): boolean => {
        return generalValidationButtonNext({
            validations: [
                phoneValid,
                bankName !== '',
                accountNumberValid,
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

    const validationResponsabilitytButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                responsability
            ],
            inputId: 'responsability-pago-movil-button',
        })
        return valid;
    }

    const infoReset = () => {
        setBankName('');
        setAccountNumber('');
        setAccountNumberValid(false);
        setName('');
        setBeneficiary(null);
        setAccount(null);
        setAmount('');
        setPhone('');
        setPhoneValid(false);
        setFindValue('');
        setNote('');
        setCurrency(null);
        setResponsability(false);
        setDate('');
        setInstructions('');
    }

    const changeAccountNumber = (value: string) => {
        validationAccountNumber(value);
        setAccountNumber(value);
    }

    const changePhone = (value: string) => {
        let newValue = value;
        if(value !== ''){
          newValue = `58${value}`;
        }
        validationPhone(newValue);
        setPhone(newValue);
      }

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    

    const states = { 
        accountNumber,
        accountNumberValid,
        bankName,
        beneficiary, 
        account, 
        change,
        commission,
        amount, 
        phone,
        phoneValid, 
        name, 
        findValue, 
        note,
        currency,
        responsability,
        date,
        instructions,
    };

    const actions = { 
        validationAccountNumber,
        changeAccountNumber,
        validationPhone,
        setBankName,
        changePhone,
        infoReset, 
        setBeneficiary, 
        setAccount, 
        setAmount, 
        setChange,
        setCommission,
        setName, 
        validationButtonBeneficiaryAdd, 
        setFindValue, 
        validationButtonAmount, 
        changeNote,
        setCurrency,
        setResponsability,
        validationResponsabilitytButton,
        setDate,
        setInstructions,
    };

    return { states, actions };

}