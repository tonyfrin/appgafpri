import { UseGafpriApiSitesReturn, useGafpriApiSites } from "./useGafpriApiSites";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriAttributesSitesReturn, useGafpriAttributesSites } from "./useGafpriAttributesSites";
import { UseCurrenciesReturn } from "gafprilibui";

export type UseGafpriSitesProps = {
    useLogin: UseGafpriLoginReturn;
    useCurrencies: UseCurrenciesReturn;
} 

export type UseGafpriSitesReturn = {
    api: UseGafpriApiSitesReturn;
    attributes: UseGafpriAttributesSitesReturn;
}

export const useGafpriSites = ({
    useLogin,
    useCurrencies
}: UseGafpriSitesProps): UseGafpriSitesReturn => {
    
    const attributes = useGafpriAttributesSites({useCurrencies});
    const api = useGafpriApiSites({useLogin, attributes});
    
    return {
        api,
        attributes
    }
}