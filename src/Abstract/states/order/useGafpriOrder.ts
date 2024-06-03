import { UseGafpriApiOrderReturn, useGafpriApiOrder } from "./useGafpriApiOrder";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriCheckOutReturn } from "../checkout/useGafpriCheckOut";
import { SiteOptions } from "../../config/gafpriConfig";

export type UseGafpriOrderProps = {
    useLogin: UseGafpriLoginReturn;
    useCheckOut: UseGafpriCheckOutReturn;
    siteOptions: SiteOptions;
} 

export type UseGafpriOrderReturn = {
    api: UseGafpriApiOrderReturn;
}

export const useGafpriOrder = ({
    useLogin,
    useCheckOut,
    siteOptions,
}: UseGafpriOrderProps): UseGafpriOrderReturn => {
    const api = useGafpriApiOrder({useLogin, useCheckOut, siteOptions});
    
    return {
        api,
    }
}