export type OrderItemsAttributesReturn = {
    id: string;
    orderPostsId: string;
    productsPostsId: string;
    storagePostsId: string | null;
    movementStorageId: string | null;
    sku: string;
    name: string;
    cost: string;
    totalCost: string;
    qty: string;
    price: string;
    subTotal: string;
    subTotalTax: string;
    total: string;
    type: string;
    taxClass: string;
};
