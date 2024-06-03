import { UseGafpriApiProductsReturn, useGafpriApiProducts } from "./useGafpriApiProducts";
import { UseGafpriErrorReturn } from "../useGafpriError";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";

export type UseGafpriProductsReturn = {
    api: UseGafpriApiProductsReturn;
}

export type UseGafpriProductsProps = {
    useLogin: UseGafpriLoginReturn;
    useError: UseGafpriErrorReturn;
}

export const useGafpriProducts = ({
    useLogin,
    useError,
}: UseGafpriProductsProps): UseGafpriProductsReturn => {
    const api = useGafpriApiProducts({useError, useLogin});
    
    return {
        api,
    }
}