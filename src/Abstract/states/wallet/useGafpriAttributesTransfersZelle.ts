import { useState } from 'react';
import { truncarTexto } from 'gafprilibui';
import { WalletBeneficiariesAttributesReturn } from './useGafpriApiWalletAccount';
import { generalValidationButtonNext } from '../../helpers';

type account = {
    id: string;
    name: string;
    balance: string;
}

type states = {
    email: string;
    beneficiary: WalletBeneficiariesAttributesReturn | null;
    account: account | null;
    amount: string;
    phone: string;
    name: string;
    findValue: string;
    note: string;
}

type actions = {
    setEmail: (email: string) => void;
    infoReset: () => void;
    setBeneficiary: (beneficiary: WalletBeneficiariesAttributesReturn | null) => void;
    setAccount: (account: account | null) => void;
    setAmount: (amount: string) => void;
    setPhone: (phone: string) => void;
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
    const [phone, setPhone] = useState('');
    const [beneficiary, setBeneficiary] = useState<WalletBeneficiariesAttributesReturn | null>(null);
    const [account, setAccount] = useState<account | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [findValue, setFindValue] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const validationButtonBeneficiaryAdd = (): boolean => {
        return generalValidationButtonNext({
            validations: [
                (email !== '' || phone !== ''),
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

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    const states = { email, beneficiary, account, amount, phone, name, findValue, note };

    const actions = { setEmail, infoReset, setBeneficiary, setAccount, setAmount, setPhone, setName, validationButtonBeneficiaryAdd, setFindValue, validationButtonAmount, changeNote };

    return { states, actions };

}