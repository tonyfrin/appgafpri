import { useState } from 'react';
import { generalValidationButtonNext } from '../../helpers';
import { siteOptions } from '../../config/gafpriConfig';
import { UseGafpriPagesCheckOutReturn } from './useGafpriPagesCheckOut';
import { WalletAccountAtrributesReturn } from '../wallet/useGafpriApiWalletAccount';


type state = {
    shippingType: string;
    addressId: string;
    sitesId: string;
    paymentMethod: string;
    salesChannel: string;
    mainSitesId: number;
    sitesWalletAccount: WalletAccountAtrributesReturn | null;
    customerWalletAccount: WalletAccountAtrributesReturn | null;
    total: number;
}

type Actions = {
    setShippingType: (shippingType: string) => void;
    setAddressId: (addressId: string) => void;
    setSitesId: (sitesId: string) => void;
    setPaymentMethod: (paymentMethod: string) => void;
    validationButtonNext: () => boolean;
    setSitesWalletAccount: (walletAccount: WalletAccountAtrributesReturn | null) => void;
    setCustomerWalletAccount: (walletAccount: WalletAccountAtrributesReturn | null) => void;
    setTotal: (total: number) => void;
    infoReset: () => void; 
}

export type UseGafpriAttributesCheckOutReturn = {
    states: state;
    actions: Actions;
}

export type UseGafpriApiAttributesCheckOutProps = {
    usePages: UseGafpriPagesCheckOutReturn;
}

export function useGafpriAttributesCheckOut({usePages}: UseGafpriApiAttributesCheckOutProps): UseGafpriAttributesCheckOutReturn {
    const [shippingType, setShippingType] = useState<string>('');
    const [addressId, setAddressId] = useState<string>('');
    const [sitesId, setSitesId] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [sitesWalletAccount, setSitesWalletAccount] = useState<WalletAccountAtrributesReturn | null>(null);
    const [customerWalletAccount, setCustomerWalletAccount] = useState<WalletAccountAtrributesReturn | null>(null);
    const [total, setTotal] = useState<number>(0);
    const salesChannel = 'online';
    const mainSitesId = siteOptions.id;

    const infoReset = (): void => {
        setShippingType('');
        setAddressId('');
        setSitesId('');
        setPaymentMethod('');
        setSitesWalletAccount(null);
        setCustomerWalletAccount(null);
        setTotal(0);
        usePages.actions.onInit();
    }

    const validationButtonNext = () => {
       return generalValidationButtonNext({
        validations: [
            shippingType !== '',
            (addressId !== '' || sitesId !== ''),
            paymentMethod !== '',
            customerWalletAccount !== null && parseFloat(customerWalletAccount.balance) >= total,
        ],
        inputId: 'gs-button-purchase'
       })
    }


    const states = {
        shippingType,
        addressId,
        sitesId,
        paymentMethod,
        salesChannel,
        mainSitesId,
        sitesWalletAccount,
        customerWalletAccount,
        total
    }

    const actions = {
        setShippingType,
        setAddressId,
        setSitesId,
        setPaymentMethod,
        setSitesWalletAccount,
        setCustomerWalletAccount,
        validationButtonNext,
        setTotal,
        infoReset
    }

    return {
        states,
        actions
    }
}