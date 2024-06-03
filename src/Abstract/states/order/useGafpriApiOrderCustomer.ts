import { AddressAttributesReturn } from "../user/address/useGafpriApiAddress";

export type OrderCustomerAttributesReturn = {
    id: string;
    orderPostsId: string;
    customerId: string;
    email?: string;
    phone?: string;
    name: string;
    lastName?: string;
    address: AddressAttributesReturn[];
    documentIndex: string | null;
    documentDigit: string,
    documentType: string,

}