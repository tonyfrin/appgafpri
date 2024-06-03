import { PostsAttributesReturn } from '../posts/useGafpriApiPosts';
import { OrderItemsAttributesReturn } from './useGafpriApiOrderItems';
import { OrderCustomerAttributesReturn } from './useGafpriApiOrderCustomer';
import { UseGafpriLoginReturn } from '../login/useGafpriLogin';
import { gafpriFetch } from '../../helpers';
import { UseGafpriCheckOutReturn } from '../checkout/useGafpriCheckOut';
import { ORDER_ROUTE, PAYMENT_ORDER_APP_ROUTE } from '../../constants';
import { SiteOptions } from '../../config/gafpriConfig';

export type OrderAttributesReturn = {
    postsId: string;
    customerId: string;
    referredId: string;
    paymentPostsId: string;
    salesChannel: string;
    note: string | null;
    subTotal: string;
    subTotalTax: string;
    costTotal: string;
    total: string;
    refundAmount: string;
    posts: PostsAttributesReturn;
    orderItems: OrderItemsAttributesReturn[];
    orderCustomer: OrderCustomerAttributesReturn[];
}

type actions = {
    createOrder: () => Promise<any>;
    getOrders: () => Promise<any>;
}

export type UseGafpriApiOrderReturn = {
    actions: actions;
}

export type UseGafpriApiOrderProps = {
    useLogin: UseGafpriLoginReturn;
    useCheckOut: UseGafpriCheckOutReturn;
    siteOptions: SiteOptions;
}

export function useGafpriApiOrder ({
    useLogin,
    useCheckOut,
    siteOptions
}: UseGafpriApiOrderProps): UseGafpriApiOrderReturn {
    
    
    const createOrder = async (): Promise<any> => {
        const dataOrder = {
            shippingType: useCheckOut.attributes.states.shippingType,
            paymentMethod: useCheckOut.attributes.states.paymentMethod,
            mainSitesId: useCheckOut.attributes.states.mainSitesId,
            salesChannel: useCheckOut.attributes.states.salesChannel,
        }

        const updateDataOrder = {
            ...dataOrder,
            ...useCheckOut.attributes.states.addressId !== '' ? { addressId: useCheckOut.attributes.states.addressId } : {},
            ...useCheckOut.attributes.states.sitesId !== '' ? { sitesId: useCheckOut.attributes.states.sitesId } : {},
        }

        const updateData = {
            total: useCheckOut.attributes.states.total,
            note: 'Venta online',
            posts: {
                visibility: 'public',
            },
            order: updateDataOrder,
            ...useCheckOut.attributes.states.paymentMethod === 'wallet' ? {paymentMethods: [
                {
                    paymentMethods:{
                        type: 'deposit',
                        methodType: 'wallet',
                        paymentType: 'wallet-payment-app',
                        currenciesId: siteOptions.currencyId,
                        amount: useCheckOut.attributes.states.total,
                        change: useCheckOut.attributes.states.total,
                        nameSend: useCheckOut.attributes.states.customerWalletAccount?.name,
                        note: 'Transferencia de saldo',
                        posts: {
                            visibility: 'public',
                        },
                    },
                    walletTransactions: {
                        walletAccountPostsId: useCheckOut.attributes.states.sitesWalletAccount?.postsId,
                        type: 'deposit',
                        transactionsType: 'sales',
                        amount: useCheckOut.attributes.states.total,
                    }
                },
                {
                    paymentMethods: {
                        type: 'debit',
                        methodType: 'wallet',
                        paymentType: 'wallet-payment-app',
                        currenciesId: siteOptions.currencyId,
                        amount: useCheckOut.attributes.states.total,
                        change: useCheckOut.attributes.states.total,
                        nameSend: useCheckOut.attributes.states.sitesWalletAccount?.name,
                        note: 'Compra online',
                        posts: {
                            visibility: 'public',
                        },
                    },
                    walletTransactions: {
                        walletAccountPostsId: useCheckOut.attributes.states.customerWalletAccount?.postsId,
                        type: 'debit',
                        transactionsType: 'purchase',
                        amount: useCheckOut.attributes.states.total,
                    }
                }    
            ]} : {},
        }


        try {
            if(useLogin.data.states.token){
                const data = await gafpriFetch({
                    initMethod: 'POST',
                    initCredentials: updateData,
                    initRoute: PAYMENT_ORDER_APP_ROUTE,
                    initToken: { token: useLogin.data.states.token }
                });
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    const getOrders = async (): Promise<any> => {
        try {
            if(useLogin.data.states.token){
                const data = await gafpriFetch({
                    initMethod: 'GET',
                    initRoute: `${ORDER_ROUTE}/app`,
                    initToken: { token: useLogin.data.states.token }
                });
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    return {
        actions: {
            createOrder,
            getOrders,
        }
    }
}