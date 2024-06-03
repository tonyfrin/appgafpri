import { AddressAttributesReturn } from "./address/useGafpriApiAddress";
import { gafpriFetch } from "../../helpers";
import { ENTITY_ROUTE } from "../../constants";
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { WalletAccountAtrributesReturn } from '../wallet/useGafpriApiWalletAccount';
import { DocumentIdAttributesReturn } from "./useGafpriApiDocumentId";

export type EntityAttributesReturn = {
    id: string;
    email: string | null;
    phone: string | null;
    type: string;
    name: string;
    lastName: string | null;
    photo: string | null;
    userId: number;
    createdAt: string;
    modifiedAt: string;
    address: AddressAttributesReturn[];
    walletAccount: WalletAccountAtrributesReturn[];
    documentId: DocumentIdAttributesReturn[];
}

type DataReturn = {
    items: EntityAttributesReturn[];
    success: boolean;
}

type actions = {
    getEntity: () => Promise<DataReturn | null >;
}

export type UseGafpriApiEntityReturn = {
    actions: actions;
}

export type UseGafpriApiEntityProps = {
    useLogin: UseGafpriLoginReturn;
}

export const useGafpriApiEntity = ({useLogin}: UseGafpriApiEntityProps): UseGafpriApiEntityReturn  => {
    
    const getEntity = async (): Promise<DataReturn | null > => {
        try {
            if(useLogin.data.states.token){
                const data: DataReturn = await gafpriFetch({
                    initMethod: 'GET',
                    initRoute: `${ENTITY_ROUTE}/app`,
                    initToken: { token: useLogin.data.states.token }
                });
                return data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }


    const actions = {
        getEntity
    }

    return {
        actions
    }


}