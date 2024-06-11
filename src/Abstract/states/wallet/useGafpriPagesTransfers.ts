import { useState } from 'react';
import { UseGafpriAttributesTransfersReturn } from './useGafpriAttributesTransfers';

type states = {
    isInit: boolean;
    isCode: boolean;
    isInfo: boolean;
    isBeneficiary: boolean;
    isConfirmation: boolean;
    isError: boolean;
    isSuccess: boolean;
}

type actions = {
    onInit: () => void;
    onCode: () => void;
    onInfo: () => void;
    onBeneficiary: () => void;
    onConfirmation: () => void;
    onSuccess: () => void;
    onError: () => void;
    returnInit: () => void;
}

export type UseGafpriPagesTransfersProps = {
    attributesTransfers: UseGafpriAttributesTransfersReturn;
}

export type UseGafpriPagesTransfersReturn = {states: states, actions: actions};

export const useGafpriPagesTransfers = ({
    attributesTransfers
}: UseGafpriPagesTransfersProps): UseGafpriPagesTransfersReturn => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [isCode, setIsCode] = useState<boolean>(false);
    const [isInfo, setIsInfo] = useState<boolean>(false);
    const [isBeneficiary, setIsBeneficiary] = useState<boolean>(true);
    const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const onInit = () => {
        setIsInit(true);
        setIsCode(false);
        setIsInfo(false);
        setIsBeneficiary(false);
        setIsConfirmation(false);
        setIsError(false);
        setIsSuccess(false);
    }

    const onCode = () => {
        setIsInit(false);
        setIsCode(true);
        setIsInfo(false);
        setIsBeneficiary(false);
        setIsConfirmation(false);
        setIsError(false);
        setIsSuccess(false);
    }

    const onInfo = () => {
        setIsInit(false);
        setIsCode(false);
        setIsInfo(true);
        setIsBeneficiary(false);
        setIsConfirmation(false);
        setIsError(false);
        setIsSuccess(false);
    }  

    const onBeneficiary = () => {
        setIsInit(false);
        setIsCode(false);
        setIsInfo(false);
        setIsBeneficiary(true);
        setIsConfirmation(false);
        setIsError(false);
        setIsSuccess(false);
    }

    const onConfirmation = () => {
        setIsInit(false);
        setIsCode(false);
        setIsInfo(false);
        setIsBeneficiary(false);
        setIsConfirmation(true);
        setIsError(false);
        setIsSuccess(false);
    }

    const onError = () => {
        setIsInit(false);
        setIsCode(false);
        setIsInfo(false);
        setIsBeneficiary(false);
        setIsConfirmation(false);
        setIsError(true);
        setIsSuccess(false);
    }

    const onSuccess = () => {
        setIsInit(false);
        setIsCode(false);
        setIsInfo(false);
        setIsBeneficiary(false);
        setIsConfirmation(false);
        setIsError(false);
        setIsSuccess(true);
    }

    const returnInit = (): void => {
        attributesTransfers.actions.infoReset();
        onBeneficiary();
    }

    const states = {
        isInit,
        isCode,
        isInfo,
        isBeneficiary,
        isConfirmation,
        isError,
        isSuccess
    };

    const actions = { 
        onInit, 
        onCode,
        onInfo,
        onBeneficiary,
        onConfirmation,
        returnInit,
        onError,
        onSuccess
     };

    return { states, actions };
}