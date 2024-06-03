import { UseGafpriApiAddressReturn, useGafpriApiAddress } from "./useGafpriApiAddress";
import { UseGafpriAttributesAddressReturn, useGafpriAttributesAddress } from "./useGafpriAttributesAddress";
import { UseGafpriLoginReturn } from "../../login/useGafpriLogin";
import { UseGafpriApiUserReturn } from "../useGafpriApiUser";

export type UseGafpriAddressProps = {
    useLogin: UseGafpriLoginReturn;
    apiUser: UseGafpriApiUserReturn;
} 

export type UseGafpriAddressReturn = {
    attributes: UseGafpriAttributesAddressReturn;
    api: UseGafpriApiAddressReturn;
}

export const useGafpriAddress = ({
    useLogin,
    apiUser
}: UseGafpriAddressProps): UseGafpriAddressReturn => {
    const attributes = useGafpriAttributesAddress({apiUser});
    const api = useGafpriApiAddress({useLogin, attributes});
    
    return {
        attributes,
        api,
    }
}