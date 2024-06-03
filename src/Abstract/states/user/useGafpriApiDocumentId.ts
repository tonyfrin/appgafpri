import { TypeDocumentIdAttributesReturn } from './useGafpriApiTypeDocumentId';

export type DocumentIdAttributesReturn = {
    id: string;
    index: string;
    digit: string;
    photo: string;
    entityId: number;
    typeDocumentIdId: number;
    typeDocumentId: TypeDocumentIdAttributesReturn;
}