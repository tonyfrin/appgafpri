import { UseGafpriApiSitesReturn, useGafpriApiSites } from "./useGafpriApiSites";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriAttributesSitesReturn, useGafpriAttributesSites } from "./useGafpriAttributesSites";

export type UseGafpriSitesProps = {
    useLogin: UseGafpriLoginReturn;
} 

export type UseGafpriSitesReturn = {
    api: UseGafpriApiSitesReturn;
    attributes: UseGafpriAttributesSitesReturn;
}

export const useGafpriSites = ({
    useLogin,
}: UseGafpriSitesProps): UseGafpriSitesReturn => {
    
    const attributes = useGafpriAttributesSites();
    const api = useGafpriApiSites({useLogin, attributes});
    
    return {
        api,
        attributes
    }
}