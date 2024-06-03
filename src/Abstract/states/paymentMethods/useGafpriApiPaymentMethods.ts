 import { PostsAttributesReturn } from "../posts/useGafpriApiPosts";
 import { UseGafpriLoginReturn } from "../login/useGafpriLogin";
 import { gafpriFetch } from "../../helpers";
 import { PAYMENT_METHODS_ROUTE } from "../../constants";
 import { WalletTransactionsAttributesReturn } from "../wallet/useGafpriApiWalletAccount";
 
 export type PaymentMethodsAttributesReturn = {
    postsId: string;
    paymentPostsId: string;
    type: string;
    methodType: string;
    paymentType: string;
    currenciesId: string;
    bank: string;
    number: string;
    nameSend: string;
    amount: string;
    change: string;
    note: string;
    posts: PostsAttributesReturn;
    walletTransactions: WalletTransactionsAttributesReturn[];
 }

 type DataReturn = {
    data: {
        items: PaymentMethodsAttributesReturn[];
        totalCount: number;
    };
    success: boolean;
 }

 type DataItemReturn = {
    item: PaymentMethodsAttributesReturn;
    success: boolean;
 }

 type actions = {
    getWalletPending: (limit: number, offset: number) => Promise<DataReturn | null>;
    getWalletPendingByPostsId: (
        postsId: string,
    ) => Promise<DataItemReturn | null >;
    getWalletTransactionsByWAPostsId: (
        limit: number,
        offset: number,
        transactionType: string,
        walletAccountPostsId: string,
        sitesId?: string,
    ) => Promise<DataReturn | null >;
 }

 export type UseGafpriApiPaymentMethodsReturn = {
    actions: actions;
 }

 export type UseGafpriApiPaymentMethodsProps = {
    useLogin: UseGafpriLoginReturn;
 }

 export const useGafpriApiPaymentMethods = ({
    useLogin
 }: UseGafpriApiPaymentMethodsProps): UseGafpriApiPaymentMethodsReturn => {

    const getWalletPending = async (
        limit: number,
        offset: number,
    ): Promise<DataReturn | null > => {
        try {
            if(useLogin.data.states.token){
                const data: DataReturn = await gafpriFetch({
                    initMethod: 'GET',
                    initRoute: `${PAYMENT_METHODS_ROUTE}?status=pending&methodType=wallet&limit=${limit}&offset=${offset}&orderBy=postsId&order=DESC`,
                    initToken: { token: useLogin.data.states.token }
                });
                return data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    const getWalletPendingByPostsId = async (
        postsId: string,
    ): Promise<DataItemReturn | null > => {
        try {
            if(useLogin.data.states.token){
                const data: DataItemReturn = await gafpriFetch({
                    initMethod: 'GET',
                    initRoute: `${PAYMENT_METHODS_ROUTE}/${postsId}?walletTransactions=true`,
                    initToken: { token: useLogin.data.states.token }
                });
                return data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    const getWalletTransactionsByWAPostsId = async (
        limit: number,
        offset: number,
        transactionType: string,
        walletAccountPostsId: string,
        sitesId?: string,
    ): Promise<DataReturn | null > => {
        let route = `${PAYMENT_METHODS_ROUTE}/wallet-app?walletTransactions=true&walletAccountPostsId=${walletAccountPostsId}&transactionType=${transactionType}&limit=${limit}&offset=${offset}&orderBy=postsId&order=DESC&methodType=wallet`;
        if(sitesId){
            route = `${route}&sitesId=${sitesId}`;
        }

        try {
            if(useLogin.data.states.token){
                const data: DataReturn = await gafpriFetch({
                    initMethod: 'GET',
                    initRoute: route,
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
        getWalletPending,
        getWalletPendingByPostsId,
        getWalletTransactionsByWAPostsId
    }

    return {
        actions,
    }
 }