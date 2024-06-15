import { useState } from 'react';
import { truncarTexto } from 'gafprilibui';
import { generalValidationButtonNext } from '../../helpers';
import { SitesAttributesReturn } from '../sites/useGafpriApiSites';

type account = {
    id: string;
    name: string;
    balance: string;
}

type states = {
    account: account | null;
    amount: string;
    note: string;
    responsability: boolean;
    date: string;
    commission: string;
    store: SitesAttributesReturn | null;
    total: string;
    commissionOption: string;
    number: string;
    instructions: string;
}

type actions = {
    setAccount: (account: account | null) => void;
    setAmount: (amount: string) => void;
    setResponsability: (value: boolean) => void;
    setDate: (date: string) => void;
    setCommission: (commission: string) => void;
    setStore: (store: SitesAttributesReturn | null) => void;
    validationResponsabilitytButton: () => boolean;
    infoReset: () => void;
    changeNote: (value: string) => void;
    validationButtonAmount: () => boolean;
    setTotal: (value: string) => void;
    setCommissionOption: (value: string) => void;
    setNumber: (value: string) => void;
    setInstructions: (value: string) => void;
}



export type UseGafpriAttributesCashAdvanceReturn = {states: states, actions: actions};



export const useGafpriAttributesCashAdvance = (): UseGafpriAttributesCashAdvanceReturn => {
    const [account, setAccount] = useState<account | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [responsability, setResponsability] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [commission, setCommission] = useState<string>('');
    const [total, setTotal] = useState<string>('');
    const [store, setStore] = useState<SitesAttributesReturn | null>(null);
    const [commissionOption, setCommissionOption] = useState<string>('');
    const [number, setNumber] = useState<string>('');

    const validationResponsabilitytButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                responsability
            ],
            inputId: 'responsability-cash-button',
        })
        return valid;
    }

    const validationButtonAmount = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                parseFloat(amount) > 0,
                account !== null,
            ],
            inputId: 'amount-button-cash-advance',
        })
        return valid;
    }

    const infoReset = () => {
        setAccount(null);
        setAmount('');
        setNote('');
        setResponsability(false);
        setDate('');
        setCommission('');
        setStore(null);
        setTotal('');
        setCommissionOption('');
        setNumber('');
        setInstructions('');
    }

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    

    const states = { 
        account,
        amount,
        note,
        responsability,
        date,
        commission,
        store,
        total,
        commissionOption,
        number,
        instructions
    };

    const actions = { 
        setAccount,
        setAmount,
        setResponsability,
        setDate,
        setCommission,
        setStore,
        validationResponsabilitytButton,
        infoReset,
        changeNote,
        validationButtonAmount,
        setTotal,
        setCommissionOption,
        setNumber,
        setInstructions
    };

    return { states, actions };

}