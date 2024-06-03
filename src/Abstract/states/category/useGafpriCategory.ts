import { UseGafpriApiCategoryReturn, useGafpriApiCategory } from "./useGafpriApiCategory";
import { UseGafpriErrorReturn } from "../useGafpriError";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";

export type UseGafpriCategoryReturn = {
    api: UseGafpriApiCategoryReturn;
}

export type UseGafpriCategoryProps = {
    useLogin: UseGafpriLoginReturn;
    useError: UseGafpriErrorReturn;
}

export const useGafpriCategory = ({
    useLogin,
    useError,
}: UseGafpriCategoryProps): UseGafpriCategoryReturn => {
    const api = useGafpriApiCategory({useError, useLogin});
    
    return {
        api,
    }
}