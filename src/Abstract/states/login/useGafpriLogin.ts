import { useGafpriAttributesLogin, UseGafpriAttributesLoginReturn } from "./useGafpriAttributesLogin";
import { UseGafpriDataLoginReturn, useGafpriDataLogin } from "./useGafpriDataLogin";
import { UseGafpriErrorReturn } from "../useGafpriError";

export type UseGafpriLoginReturn = {
    data: UseGafpriDataLoginReturn;
    attributes: UseGafpriAttributesLoginReturn;
}

export type UseGafpriLoginProps = {
    setIsFetchingGlobal: (value: boolean) => void;
    globalResetInfo: () => void;
    useError: UseGafpriErrorReturn;
}

export const useGafpriLogin = ({
    setIsFetchingGlobal,
    globalResetInfo,
    useError,
}: UseGafpriLoginProps): UseGafpriLoginReturn => {
    const attributes = useGafpriAttributesLogin();
    const data = useGafpriDataLogin({ setIsFetchingGlobal, globalResetInfo, attributes, useError});
    
    return {
        data,
        attributes,
    }
}