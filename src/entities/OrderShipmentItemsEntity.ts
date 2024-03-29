import { CustomBaseEntity } from "./CustomBaseEntity";
import { OrderShipment } from "./OrderShipmentEntity";
import { ProductSku } from "./ProductSkuEntity";

export class OrderShipmentItem extends CustomBaseEntity {

    shipmentNumber!: string;
    orderShipment!: OrderShipment;
    productSku!: ProductSku;
    quantity!: number;
    orderedQuantity!: number;
    acceptedQuantity?: number;
    fullfilledQuantity?: number;
    price!: number;
    lineItemTaxTotal!: number;
    taxRatePc!: number;
    lineItemTotal!: number;
    hsnCode?: string;
    
}