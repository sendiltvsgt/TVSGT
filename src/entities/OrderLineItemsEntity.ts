import { CustomBaseEntity } from "./CustomBaseEntity";
import { Order } from "./OrderEntity";
import { ProductSku } from "./ProductSkuEntity";

export class OrderLineItem extends CustomBaseEntity {
    order?: Order;
    productSku!: ProductSku;
    orderedQuantity!: number;
    acceptedQuantity?: number;
    fullfilledQuantity?: number;
    price?: number;
    lineItemTaxTotal?: number;
    taxRatePc?: number;
    lineItemTotal?: number;
    hsnCode?: string;       
}