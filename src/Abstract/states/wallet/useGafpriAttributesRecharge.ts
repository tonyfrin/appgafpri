import {useState, useEffect }from 'react';
import { truncarTexto } from 'gafprilibui';
import { generalValidationButtonNext } from '../../helpers';


type states = {
    paymentType: string;
    amount: string;
    paymentTypeOptions: {label: string, value: string}[];
    commission: string;
    commissionRate: string;
    total: string;
    nameSend: string;
    number: string;
    walletAccountPostsId: string;
    note: string;
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
    const [commission, setCommission] = useState<string>('');
    const [commissionRate, setCommissionRate] = useState<string>('');
    const [total, setTotal] = useState<string>('');
    const [nameSend, setNameSend] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [walletAccountPostsId, setWalletAccountPostsId] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const changeTotal = (): void => {
        if (paymentType === 'zelle') {
            setCommissionRate('0 %');
            setCommission('0.00');
            setTotal(amount);
        } else if (paymentType === 'paypal') {
            setCommissionRate('3 %');
            const newCommission = (parseFloat(amount) * 0.03).toFixed(2);
            const newTotal = (parseFloat(amount) - parseFloat(newCommission)).toFixed(2);
            setCommission(newCommission);
            setTotal(newTotal);
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
                walletAccountPostsId !== ''
            ],
            inputId: 'amount-recharge-button',
        })
        return valid;
    }

    const validationInfoButton = (): boolean => {
        const valid = generalValidationButtonNext({
            validations: [
                nameSend !== '',
                number !== ''
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
        setCommissionRate('');
        setNameSend('');
        setNumber('');
        setWalletAccountPostsId('');
        setNote('');
    }

    useEffect(() => {
        changeTotal();
    }, [paymentType, amount]); // eslint-disable-line react-hooks/exhaustive-deps

    const states = { paymentType, amount, paymentTypeOptions, commission, total, commissionRate, nameSend, number, walletAccountPostsId, note};
    const actions = { setPaymentType, setAmount, infoReset, validationAmountButton, setNameSend, setNumber, validationInfoButton, setWalletAccountPostsId, validationAmountMySiteButton, changeNote};

    return { states, actions };

}