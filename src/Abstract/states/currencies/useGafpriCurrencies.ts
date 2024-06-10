import { UseGafpriApiCurrenciesReturn, useGafpriApiCurrencies } from "./useGafpriApiCurrencies";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriPaginationsCurrenciesReturn, useGafpriPaginationsCurrencies } from "./useGafpriPaginationsCurrencies";
import { UseGafpriAttributesCurrenciesReturn, useGafpriAttributesCurrencies } from "./useGafpriAttributesCurrencies";

export type UseGafpriCurrenciesProps = {
    useLogin: UseGafpriLoginReturn;
} 

export type UseGafpriCurrenciesReturn = {
    api: UseGafpriApiCurrenciesReturn;
    paginations: UseGafpriPaginationsCurrenciesReturn;
    attributes: UseGafpriAttributesCurrenciesReturn;
}

export const useGafpriCurrencies = ({
    useLogin,
}: UseGafpriCurrenciesProps): UseGafpriCurrenciesReturn => {
    const paginations = useGafpriPaginationsCurrencies();
    const attributes = useGafpriAttributesCurrencies();
    const api = useGafpriApiCurrencies({useLogin, attributes});
    
    


    return {
        api,
        paginations,
        attributes
    }
}