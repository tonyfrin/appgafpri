import { useState } from 'react';
import { truncarTexto } from 'gafprilibui';
import { WalletAccountAtrributesReturn } from './useGafpriApiWalletAccount';

type account = {
    id: string;
    name: string;
    balance: string;
}

type states = {
    email: string;
    beneficiary: WalletAccountAtrributesReturn | null;
    account: account | null;
    amount: string;
    number: string;
    note: string;
}

type actions = {
    setEmail: (email: string) => void;
    infoReset: () => void;
    setBeneficiary: (beneficiary: WalletAccountAtrributesReturn | null) => void;
    setAccount: (account: account | null) => void;
    setAmount: (amount: string) => void;
    setNumber: (number: string) => void;
    changeNote: (value: string) => void;
}

export type UseGafpriAttributesTransfersReturn = {states: states, actions: actions};

export const useGafpriAttributesTransfers = (): UseGafpriAttributesTransfersReturn => {
    const [email, setEmail] = useState('');
    const [beneficiary, setBeneficiary] = useState<WalletAccountAtrributesReturn | null>(null);
    const [account, setAccount] = useState<account | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const infoReset = () => {
        setEmail('');
        setBeneficiary(null);
        setAccount(null);
        setAmount('');
        setNumber('');
        setNote('');
    }

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    const states = { email, beneficiary, account, amount, number, note };

    const actions = { setEmail, infoReset, setBeneficiary, setAccount, setAmount, setNumber, changeNote };

    return { states, actions };

}