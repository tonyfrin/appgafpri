import { useState } from 'react';
import { UseGafpriAttributesTransfersPagoMovilReturn } from './useGafpriAttributesTransfersPagoMovil';

type states = {
    isBeneficiary: boolean;
    isBeneficiaryAdd: boolean;
    isAmount: boolean;
    isCheck: boolean;
    isSuccess: boolean;
    isFetching: boolean;
}

type actions = {
    onBeneficiary: () => void;
    onBeneficiaryAdd: () => void;
    onAmount: () => void;
    onCheck: () => void;
    onSuccess: () => void;
    onFetching: () => void;
    returnInit: () => void;
}

export type UseGafpriPagesTranfersPagoMovilProps = {
    attributesTransfersPagoMovil: UseGafpriAttributesTransfersPagoMovilReturn;
}

export type UseGafpriPagesTransfersPagoMovilReturn = {states: states, actions: actions};

export const useGafpriPagesTransfersPagoMovil = ({
    attributesTransfersPagoMovil
}: UseGafpriPagesTranfersPagoMovilProps): UseGafpriPagesTransfersPagoMovilReturn => {
    const [isBeneficiary, setIsBeneficiary] = useState<boolean>(true);
    const [isBeneficiaryAdd, setIsBeneficiaryAdd] = useState<boolean>(false);
    const [isAmount, setIsAmount] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const onBeneficiary = () => {
        setIsFetching(false);
        setIsBeneficiary(true);
        setIsBeneficiaryAdd(false);
        setIsAmount(false);
        setIsCheck(false);
        setIsSuccess(false);
    }

    const onBeneficiaryAdd = () => {
        setIsFetching(false);
        setIsBeneficiary(false);
        setIsBeneficiaryAdd(true);
        setIsAmount(false);
        setIsCheck(false);
        setIsSuccess(false);
    }

    const onAmount = () => {
        setIsFetching(false);
        setIsBeneficiary(false);
        setIsBeneficiaryAdd(false);
        setIsAmount(true);
        setIsCheck(false);
        setIsSuccess(false);
    }

    const onCheck = () => {
        setIsFetching(false);
        setIsBeneficiary(false);
        setIsBeneficiaryAdd(false);
        setIsAmount(false);
        setIsCheck(true);
        setIsSuccess(false);
    }

    const onSuccess = () => {
        setIsFetching(false);
        setIsBeneficiary(false);
        setIsBeneficiaryAdd(false);
        setIsAmount(false);
        setIsCheck(false);
        setIsSuccess(true);
    }

    const onFetching = () => {
        setIsFetching(true);
        setIsBeneficiary(false);
        setIsBeneficiaryAdd(false);
        setIsAmount(false);
        setIsCheck(false);
        setIsSuccess(false);
    }

    const returnInit = (): void => {
        attributesTransfersPagoMovil.actions.infoReset();
        onBeneficiary();
    }

    const states: states = {
        isBeneficiary,
        isBeneficiaryAdd,
        isAmount,
        isCheck,
        isSuccess,
        isFetching
    }

    const actions: actions = {
        onBeneficiary,
        onBeneficiaryAdd,
        onAmount,
        onCheck,
        onSuccess,
        onFetching,
        returnInit
    }


    return { states, actions };
}