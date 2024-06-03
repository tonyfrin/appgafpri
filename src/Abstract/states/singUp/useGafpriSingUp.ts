import { useGafpriPagesSingUp, UseGafpriPagesSingUpReturn } from "./useGafpriPagesSingUp";
import { useGafpriAttributesSingUp, UseGafpriAttributesSingUpReturn } from "./useGafpriAttributesSingUp";
import { UseGafpriApiSingUpReturn, useGafpriApiSingUp } from "./useGafpriApiSingUp";
import { UseGafpriErrorReturn } from "../useGafpriError";

export type UseGafpriSingUpReturn = {
    pages: UseGafpriPagesSingUpReturn;
    attributes: UseGafpriAttributesSingUpReturn;
    api: UseGafpriApiSingUpReturn;
}

export type UseGafpriSingUpProps = {
    useError: UseGafpriErrorReturn;
}

export const useGafpriSingUp = ({useError}: UseGafpriSingUpProps): UseGafpriSingUpReturn => {
    const attributes: UseGafpriAttributesSingUpReturn = useGafpriAttributesSingUp({useError});
    const pages: UseGafpriPagesSingUpReturn = useGafpriPagesSingUp({attributes});
    const api: UseGafpriApiSingUpReturn = useGafpriApiSingUp({attributes});
    
    
    return {
        pages,
        attributes,
        api
    }
}