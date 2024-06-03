import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriApiPaymentMethodsReturn, useGafpriApiPaymentMethods } from "./useGafpriApiPaymentMethods";

export type UseGafpriPaymentMethodsProps = {
    useLogin: UseGafpriLoginReturn;
}

export type UseGafpriPaymentMethodsReturn = {
    api: UseGafpriApiPaymentMethodsReturn;
}

export const useGafpriPaymentMethods = ({useLogin}: UseGafpriPaymentMethodsProps): UseGafpriPaymentMethodsReturn => {
    return {
        api: useGafpriApiPaymentMethods({useLogin})
    }
}