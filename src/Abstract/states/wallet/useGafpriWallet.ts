import { UseGafpriPagesRechargeReturn, useGafpriPagesRecharge } from "./useGafpriPagesRecharge";
import { UseGafpriAttributesRechargeReturn, useGafpriAttributesRecharge } from "./useGafpriAttributesRecharge";
import { UseGafpriPagesTransfersReturn, useGafpriPagesTransfers } from "./useGafpriPagesTransfers";
import { UseGafpriAttributesTransfersReturn, useGafpriAttributesTransfers } from "./useGafpriAttributesTransfers";
import { UseGafpriApiWalletAccountReturn, useGafpriApiWalletAccount } from "./useGafpriApiWalletAccount";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriAttributesWalletReturn, useGafpriAttributesWallet } from "./useGafpriAttributesWallet";
import { UseGafpriUserReturn } from "../user/useGafpriUser";
import { SiteOptions } from "../../config/gafpriConfig";
import { UseGafpriPagesTransfersZelleReturn, useGafpriPagesTransfersZelle } from "./useGafpriPagesTransfersZelle";
import { UseGafpriAttributesTransfersZelleReturn, useGafpriAttributesTransfersZelle } from "./useGafpriAttributesTransfersZelle";
import { UseGafpriAttributesTransfersPagoMovilReturn, useGafpriAttributesTransfersPagoMovil } from "./useGafpriAttributesTransfersPagoMovil";
import { UseGafpriPagesTransfersPagoMovilReturn, useGafpriPagesTransfersPagoMovil } from "./useGafpriPagesTransfersPagoMovil";
import { UseGafpriAttributesCashAdvanceReturn, useGafpriAttributesCashAdvance } from './useGafpriAttributesCashAdvance';
import { UseGafpriPagesCashAdvanceReturn, useGafpriPagesCashAdvance } from "./useGafpriPagesCashAdvance";


type actions = {
    globalResetInfo: () => void;
}

export type UseGafpriWalletReturn = {
    pagesRecharge: UseGafpriPagesRechargeReturn;
    attributesRecharge: UseGafpriAttributesRechargeReturn;
    pagesTransfers: UseGafpriPagesTransfersReturn;
    pagesTransfersZelle: UseGafpriPagesTransfersZelleReturn;
    attributesTransfers: UseGafpriAttributesTransfersReturn;
    account: UseGafpriApiWalletAccountReturn;
    attributes: UseGafpriAttributesWalletReturn;
    attributesTransfersZelle: UseGafpriAttributesTransfersZelleReturn;
    attributesTransfersPagoMovil: UseGafpriAttributesTransfersPagoMovilReturn;
    pagesTransfersPagoMovil: UseGafpriPagesTransfersPagoMovilReturn;
    attributesCashAdvance: UseGafpriAttributesCashAdvanceReturn;
    pagesCashAdvance: UseGafpriPagesCashAdvanceReturn;
    actions: actions;
}

export type UseGafpriWalletProps = {
    useLogin: UseGafpriLoginReturn;
    useUser: UseGafpriUserReturn;
    siteOptions: SiteOptions;
}



export const useGafpriWallet = ({useLogin, useUser, siteOptions}: UseGafpriWalletProps): UseGafpriWalletReturn => {
    const attributesRecharge = useGafpriAttributesRecharge();
    const pagesRecharge = useGafpriPagesRecharge({attributesRecharge});
    const attributesTransfers = useGafpriAttributesTransfers();
    const pagesTransfers = useGafpriPagesTransfers({attributesTransfers});
    const attributesTransfersZelle = useGafpriAttributesTransfersZelle();
    const attributesTransfersPagoMovil = useGafpriAttributesTransfersPagoMovil();
    const pagesTransfersPagoMovil = useGafpriPagesTransfersPagoMovil({attributesTransfersPagoMovil});
    const attributesCashAdvance = useGafpriAttributesCashAdvance();
    const account = useGafpriApiWalletAccount({useLogin, attributesRecharge, siteOptions, attributesTransfers, attributesTransfersZelle, attributesTransfersPagoMovil, attributesCashAdvance});
    const attributes = useGafpriAttributesWallet({account, useLogin, useUser});
    const pagesTransfersZelle = useGafpriPagesTransfersZelle({attributesTransfersZelle});
    
    const pagesCashAdvance = useGafpriPagesCashAdvance({attributes: attributesCashAdvance});
    
    const globalResetInfo = (): void => {
        attributes.actions.infoReset();
        pagesRecharge.actions.returnInit();
        pagesTransfers.actions.returnInit();
        pagesTransfersZelle.actions.returnInit();
        pagesTransfersPagoMovil.actions.returnInit();
        pagesCashAdvance.actions.returnInit();
    }
    
    const actions: actions = {
        globalResetInfo
    }

    return { 
        pagesRecharge, 
        attributesRecharge,
        pagesTransfers,
        attributesTransfers,
        account,
        pagesTransfersZelle,
        pagesTransfersPagoMovil,
        attributes,
        attributesTransfersZelle,
        attributesTransfersPagoMovil,
        attributesCashAdvance,
        pagesCashAdvance,
        actions,
    };
}