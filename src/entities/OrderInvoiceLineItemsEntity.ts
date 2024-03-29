import { CustomBaseEntity } from "./CustomBaseEntity";
import { OrderInvoice } from "./OrderInvoiceEntity";
import { ProductSku } from "./ProductSkuEntity";

export class OrderInvoiceLineItem extends CustomBaseEntity {
    invoice!: OrderInvoice;
    product!: ProductSku;
    quantity!: number;
    price!: number;
    taxPc!: number;
    taxAmount!: number;
    lineItemTotal!: number;
    hsnCode?: string;       
}