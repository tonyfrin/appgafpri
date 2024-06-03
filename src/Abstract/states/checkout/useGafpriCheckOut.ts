import { useGafpriPagesCheckOut, UseGafpriPagesCheckOutReturn } from "./useGafpriPagesCheckOut";
import { useGafpriAttributesCheckOut, UseGafpriAttributesCheckOutReturn } from "./useGafpriAttributesCheckOut";

type Actions = {
    globalResetInfo: () => void;
}

export type UseGafpriCheckOutReturn = {
    pages: UseGafpriPagesCheckOutReturn;
    attributes: UseGafpriAttributesCheckOutReturn;
    actions: Actions;
}

export const useGafpriCheckOut = (): UseGafpriCheckOutReturn => {
    const pages = useGafpriPagesCheckOut();
    const attributes = useGafpriAttributesCheckOut({usePages: pages});

    const globalResetInfo = (): void => {
        attributes.actions.infoReset();
    }

    const actions = {
        globalResetInfo
    }
    
    return {
        actions,
        pages,
        attributes
    }
}