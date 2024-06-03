import { UseGafpriApiCartReturn, useGafpriApiCart } from "./useGafpriApiCart";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";

export type UseGafpriCartReturn = {
    api: UseGafpriApiCartReturn;
}

export type UseGafpriCartProps = {
    useLogin: UseGafpriLoginReturn;
}

export const useGafpriCart = ({
    useLogin,
}: UseGafpriCartProps): UseGafpriCartReturn => {
    const api = useGafpriApiCart({useLogin});
    
    return {
        api,
    }
}