import { useState } from 'react';
import { UseGafpriAttributesRechargeReturn } from './useGafpriAttributesRecharge';

type states = {
    isInit: boolean;
    isAlert: boolean;
    isInfo: boolean;
    isConfirmation: boolean;
    isSuccess: boolean;
    isFetching: boolean;
}

type actions = {
    onInit: () => void;
    onAlert: () => void;
    onInfo: () => void;
    onConfirmation: () => void;
    returnInit: () => void;
    onSuccess: () => void;
    onFetching: () => void;
}

export type UseGafpriPagesRechargeProps = {
    attributesRecharge: UseGafpriAttributesRechargeReturn;
}

export type UseGafpriPagesRechargeReturn = {states: states, actions: actions};

export const useGafpriPagesRecharge = ({attributesRecharge}: UseGafpriPagesRechargeProps ): UseGafpriPagesRechargeReturn => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(true);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [isInfo, setIsInfo] = useState<boolean>(false);
    const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    
    const onFetching = (): void => {
        setIsFetching(true);
    }

    const onInit = (): void => {
        setIsInit(true);
        setIsAlert(false);
        setIsInfo(false);
        setIsConfirmation(false);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onAlert = (): void => {
        setIsInit(false);
        setIsAlert(true);
        setIsInfo(false);
        setIsConfirmation(false);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onInfo = (): void => {
        setIsInit(false);
        setIsAlert(false);
        setIsInfo(true);
        setIsConfirmation(false);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onConfirmation = (): void => {
        setIsInit(false);
        setIsAlert(false);
        setIsInfo(false);
        setIsConfirmation(true);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onSuccess = (): void => {
        setIsInit(false);
        setIsAlert(false);
        setIsInfo(false);
        setIsConfirmation(false);
        setIsSuccess(true);
        setIsFetching(false);
    }

    const returnInit = (): void => {
        attributesRecharge.actions.infoReset();
        onInit();
    }

    const states = { isInit, isAlert, isInfo, isConfirmation, isSuccess, isFetching };

    const actions = { onInit, onAlert, onInfo, onConfirmation, returnInit, onSuccess, onFetching };

    return { states, actions };
}