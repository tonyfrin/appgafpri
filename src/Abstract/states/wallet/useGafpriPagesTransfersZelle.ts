import { useState } from 'react';
import { UseGafpriAttributesTransfersZelleReturn } from './useGafpriAttributesTransfersZelle';

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

export type UseGafpriPagesTranfersZelleProps = {
    attributesTransfersZelle: UseGafpriAttributesTransfersZelleReturn;
}

export type UseGafpriPagesTransfersZelleReturn = {states: states, actions: actions};

export const useGafpriPagesTransfersZelle = ({
    attributesTransfersZelle
}: UseGafpriPagesTranfersZelleProps): UseGafpriPagesTransfersZelleReturn => {
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
        attributesTransfersZelle.actions.infoReset();
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