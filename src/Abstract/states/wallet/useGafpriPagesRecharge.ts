import { useState } from 'react';
import { UseGafpriAttributesRechargeReturn } from './useGafpriAttributesRecharge';

type states = {
    isInit: boolean;
    isInfo: boolean;
    isConfirmation: boolean;
    isSuccess: boolean;
    isFetching: boolean;
}

type actions = {
    onInit: () => void;
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
    const [isInfo, setIsInfo] = useState<boolean>(false);
    const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    
    const onFetching = (): void => {
        setIsFetching(true);
    }

    const onInit = (): void => {
        setIsInit(true);
        setIsInfo(false);
        setIsConfirmation(false);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onInfo = (): void => {
        setIsInit(false);
        setIsInfo(true);
        setIsConfirmation(false);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onConfirmation = (): void => {
        setIsInit(false);
        setIsInfo(false);
        setIsConfirmation(true);
        setIsSuccess(false);
        setIsFetching(false);
    }

    const onSuccess = (): void => {
        setIsInit(false);
        setIsInfo(false);
        setIsConfirmation(false);
        setIsSuccess(true);
        setIsFetching(false);
    }

    const returnInit = (): void => {
        attributesRecharge.actions.infoReset();
        onInit();
    }

    const states = { isInit, isInfo, isConfirmation, isSuccess, isFetching };

    const actions = { onInit, onInfo, onConfirmation, returnInit, onSuccess, onFetching };

    return { states, actions };
}