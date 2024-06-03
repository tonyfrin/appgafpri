import { UseGafpriApiCartItemsReturn, useGafpriApiCartItems } from "./useGafpriApiCartItems";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";

export type UseGafpriCartItemsReturn = {
    api: Promise<UseGafpriApiCartItemsReturn>;
}

export type UseGafpriCartItemsProps = {
    useLogin: UseGafpriLoginReturn;
}

export const useGafpriCartItems = ({
    useLogin,
}: UseGafpriCartItemsProps): UseGafpriCartItemsReturn => {
    const api = useGafpriApiCartItems({useLogin});
    
    return {
        api,
    }
}