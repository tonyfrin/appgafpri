import { useState } from 'react';
import { UseGafpriAttributesCashAdvanceReturn } from './useGafpriAttributesCashAdvance';

type states = {
    isAmount: boolean;
    isStore: boolean;
    isTime: boolean;
    isCheck: boolean;
    isSuccess: boolean;
    isError: boolean;
    isFetching: boolean;
}

type actions = {
    onAmount: () => void;
    onStore: () => void;
    onTime: () => void;
    onCheck: () => void;
    onSuccess: () => void;
    onError: () => void;
    onFetching: () => void;
    returnInit: () => void;
}

export type UseGafpriPagesCashAdvanceProps = {
    attributes: UseGafpriAttributesCashAdvanceReturn;
}

export type UseGafpriPagesCashAdvanceReturn = {states: states, actions: actions};

export const useGafpriPagesCashAdvance = ({
    attributes
}: UseGafpriPagesCashAdvanceProps): UseGafpriPagesCashAdvanceReturn => {
    const [isAmount, setIsAmount] = useState<boolean>(true);
    const [isStore, setIsStore] = useState<boolean>(false);
    const [isTime, setIsTime] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const onAmount = () => {
        setIsFetching(false);
        setIsAmount(true);
        setIsStore(false);
        setIsTime(false);
        setIsCheck(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const onStore = () => {
        setIsFetching(false);
        setIsAmount(false);
        setIsStore(true);
        setIsTime(false);
        setIsCheck(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const onTime = () => {
        setIsFetching(false);
        setIsAmount(false);
        setIsStore(false);
        setIsTime(true);
        setIsCheck(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const onCheck = () => {
        setIsFetching(false);
        setIsAmount(false);
        setIsStore(false);
        setIsTime(false);
        setIsCheck(true);
        setIsSuccess(false);
        setIsError(false);
    }

    const onSuccess = () => {
        setIsFetching(false);
        setIsAmount(false);
        setIsStore(false);
        setIsTime(false);
        setIsCheck(false);
        setIsSuccess(true);
        setIsError(false);
    }

    const onError = () => {
        setIsFetching(false);
        setIsAmount(false);
        setIsStore(false);
        setIsTime(false);
        setIsCheck(false);
        setIsSuccess(false);
        setIsError(true);
    }

    const onFetching = () => {
        setIsFetching(true);
        setIsAmount(false);
        setIsStore(false);
        setIsTime(false);
        setIsCheck(false);
        setIsSuccess(false);
        setIsError(false);
    }

    const returnInit = (): void => {
        attributes.actions.infoReset();
        onAmount();
    }

    const states: states = {
        isAmount,
        isStore,
        isTime,
        isCheck,
        isSuccess,
        isError,
        isFetching
    }

    const actions: actions = {
        onAmount,
        onStore,
        onTime,
        onCheck,
        onSuccess,
        onError,
        onFetching,
        returnInit
    }


    return { states, actions };
}