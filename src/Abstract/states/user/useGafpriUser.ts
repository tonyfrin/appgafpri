import { UseGafpriApiUserReturn, useGafpriApiUser } from "./useGafpriApiUser";
import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
import { UseGafpriApiEntityReturn, useGafpriApiEntity } from "./useGafpriApiEntity";
import { UseGafpriAttributesUserReturn, useGafpriAttributesUser } from "./useGafpriAttributesUser";
import { SiteOptions } from "../../config/gafpriConfig";
import { UseGafpriApiTypeDocumentIdReturn, useGafpriApiTypeDocumentId } from "./useGafpriApiTypeDocumentId";
import { UseGafpriPagesPasswordResetReturn, useGafpriPagesPasswordReset } from "./useGafpriPagesPasswordReset";

export type UseGafpriUserProps = {
    useLogin: UseGafpriLoginReturn;
    siteOptions: SiteOptions;
} 

export type UseGafpriUserReturn = {
    api: UseGafpriApiUserReturn;
    apiEntity: UseGafpriApiEntityReturn;
    attributes: UseGafpriAttributesUserReturn;
    apiTypeDocumentId: UseGafpriApiTypeDocumentIdReturn;
    pagesPasswordReset: UseGafpriPagesPasswordResetReturn;
}

export const useGafpriUser = ({
    useLogin,
    siteOptions,
}: UseGafpriUserProps): UseGafpriUserReturn => {
    const attributes = useGafpriAttributesUser();
    const api = useGafpriApiUser({useLogin, attributes, siteOptions});
    const apiEntity = useGafpriApiEntity({useLogin});
    const apiTypeDocumentId = useGafpriApiTypeDocumentId();
    const pagesPasswordReset = useGafpriPagesPasswordReset();
    
    
    
    return {
        api,
        apiEntity,
        attributes,
        apiTypeDocumentId,
        pagesPasswordReset,
    }
}