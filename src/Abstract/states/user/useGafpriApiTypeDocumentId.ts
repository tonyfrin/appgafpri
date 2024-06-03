import { useEffect, useState } from 'react';
import { gafpriFetch } from '../../helpers';
import { TYPE_DOCUMENT_ID_ROUTE } from '../../constants';

export type TypeDocumentIdAttributesReturn = {
    id: string;
    name: string;
    country: string;
    createdAt: string;
    modifiedAt: string;
}

type states = {
    typeDocumentId: TypeDocumentIdAttributesReturn[] | null;
    isReadyTypeDocumentId: boolean;
}

type Actions = {
    getTypeDocumentId: () => Promise<any>;
}   

export type UseGafpriApiTypeDocumentIdReturn = {
    actions: Actions;
    states: states;
}

export const useGafpriApiTypeDocumentId = () => {
    const [typeDocumentId, setTypeDocumentId] = useState<TypeDocumentIdAttributesReturn[] | null>(null);
    const [isReadyTypeDocumentId, setIsReadyTypeDocumentId] = useState<boolean>(false);

    const getTypeDocumentId = async (): Promise<any> => {
        try {
            const data = await gafpriFetch({
                initMethod: 'GET',
                initRoute: `${TYPE_DOCUMENT_ID_ROUTE}`
            });
            return data;
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (!isReadyTypeDocumentId) {
            const fechtTypeDocumentId = async () => {
                const data = await getTypeDocumentId();
                if(data && data.success){
                    setTypeDocumentId(data.data.items);
                    setIsReadyTypeDocumentId(true);
                } else{
                    setTypeDocumentId(null);
                    setIsReadyTypeDocumentId(false);
                }
            }

            fechtTypeDocumentId();
        }
    }, [isReadyTypeDocumentId]);

    return {
        states: {
            typeDocumentId,
            isReadyTypeDocumentId
        },
        actions: {
            getTypeDocumentId
        }
    }
}