import {useState, useEffect }from 'react';
import { truncarTexto } from 'gafprilibui';
import { generalValidationButtonNext } from '../../helpers';
import { CurrenciesAttributesReturn } from '../currencies/useGafpriApiCurrencies';
import { parse } from 'path';


type states = {
    paymentType: string;
    amount: string;
    paymentTypeOptions: {label: string, value: string}[];
    commission: string;
    commissionRate: number;
    total: string;
    nameSend: string;
    number: string;
    walletAccountPostsId: string;
    note: string;
    currency: CurrenciesAttributesReturn | null;
    responsability: boolean;
    change: string;
    date: string;
    instructions: string;
}

type actions = {
    setPaymentType: (paymentType: string) => void;
    setAmount: (amount: string) => void;
    infoReset: () => void;
    validationAmountButton: () => boolean;
    setNameSend: (nameSend: string) => void;
    setNumber: (number: string) => void;
    validationInfoButton: () => boolean;
    setWalletAccountPostsId: (walletAccountPostsId: string) => void;
    validationAmountMySiteButton: () => boolean;
    changeNote: (note: string) => void;
    setExchangeRate: (exchangeRate: number) => void;
    setCommisionType: (commisionType: string) => void;
    setCommissionRate: (commissionRate: number) => void;
    setDate: (date: string) => void;
    setInstructions: (instructions: string) => void;
    setCurrency: (currency: CurrenciesAttributesReturn | null) => void;
    setResponsability: (responsability: boolean) => void;
    validationResponsabilitytButton: () => boolean;
}

export type UseGafpriAttributesRechargeReturn = {states: states, actions: actions};

export const useGafpriAttributesRecharge = ():UseGafpriAttributesRechargeReturn  => {
    const [paymentType, setPaymentType] = useState<string>('');
    const paymentTypeOptions: {label: string, value: string}[] = [
        {label: 'Seleccione metodo (Zelle o Paypal)', value: ''},
        {label: 'Zelle', value: 'zelle'},
        {label: 'Paypal', value: 'paypal'},
    ];
    const [amount, setAmount] = useState<string>('');
    const [change, setChange] = useState<string>('');
    const [commission, setCommission] = useState<string>('');
    const [commissionRate, setCommissionRate] = useState<number>(0);
    const [commisionType, setCommisionType] = useState<string>('');
    const [total, setTotal] = useState<string>('');
    const [nameSend, setNameSend] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [walletAccountPostsId, setWalletAccountPostsId] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [currency, setCurrency] = useState<CurrenciesAttributesReturn | null>(null);
    const [responsability, setResponsability] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');

    const changeTotal = (): void => {
        if(commisionType === 'none') {
            setCommission('0.00');
            const newTotal = parseFloat(amount) / exchangeRate;
            setChange(newTotal.toFixed(2));
            setTotal(newTotal.toFixed(2));
        } 

        if(commisionType === 'percentage') {
            const newCommission = (parseFloat(amount) / exchangeRate) * (commissionRate/100);
            const newTotal = ((parseFloat(amount) - newCommission) / exchangeRate).toFixed(2);
            const newChange = parseFloat(amount) * exchangeRate;
            setChange(newChange.toFixed(2));
            setCommission(newCommission.toFixed(2));
            setTotal(newTotal);
        }

        if(commisionType === 'fixed') {
            const newCommission = (parseFloat(amount) / exchangeRate) * commissionRate;
            setCommission(newCommission.toFixed(2));
            const newTotal = parseFloat(amount) / (exchangeRate + commissionRate);
            setTotal(newTotal.toFixed(2));
            setChange(newTotal.toFixed(2));
        }
    }

    const changeNote = (value: string): void => {
        setNote(truncarTexto(value, 100));
    }

    const validationAmountButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                parseFloat(amount) > 0,
                paymentType !== '',
                walletAccountPostsId !== '',
            ],
            inputId: 'amount-recharge-button',
        })
        return valid;
    }

    const validationResponsabilitytButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                responsability
            ],
            inputId: 'responsability-recharge-button',
        })
        return valid;
    }

    const validationInfoButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                nameSend !== '',
                number.length > 5,
            ],
            inputId: 'info-recharge-button',
        })
        return valid;
    }

    const validationAmountMySiteButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                parseFloat(amount) > 0,
                paymentType !== '',
            ],
            inputId: 'amount-recharge-my-site-button',
        })
        return valid;
    }


    const infoReset = (): void => {
        setPaymentType('');
        setAmount('');
        setCommission('');
        setTotal('');
        setCommissionRate(0);
        setNameSend('');
        setNumber('');
        setWalletAccountPostsId('');
        setNote('');
        setCurrency(null);
        setCommisionType('');
        setResponsability(false);
    }

    useEffect(() => {
        changeTotal();
    }, [paymentType, amount]); // eslint-disable-line react-hooks/exhaustive-deps

    const states = { paymentType, amount, paymentTypeOptions, commission, total, commissionRate, nameSend, number, walletAccountPostsId, note, currency, exchangeRate, commisionType, responsability, change, date, instructions };
    const actions = { setPaymentType, setAmount, infoReset, validationAmountButton, setNameSend, setNumber, validationInfoButton, setWalletAccountPostsId, validationAmountMySiteButton, changeNote, setExchangeRate, setCommisionType, setCommissionRate, setCurrency, setResponsability, validationResponsabilitytButton, setDate, setInstructions };

    return { states, actions };

}