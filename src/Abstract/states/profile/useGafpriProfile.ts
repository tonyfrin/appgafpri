import { useGafpriPagesProfile, UseGafpriPagesProfileReturn } from "./useGafpriPagesProfile";

export type UseGafpriProfileReturn = {
    pages: UseGafpriPagesProfileReturn;
}

export const useGafpriProfile = (): UseGafpriProfileReturn => {
    return {
        pages: useGafpriPagesProfile(),
    }
}