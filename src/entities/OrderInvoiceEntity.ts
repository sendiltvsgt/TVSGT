import { InvoiceStatus } from "../common/common.enum";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { Order } from "./OrderEntity";
import { OrderInvoiceLineItem } from "./OrderInvoiceLineItemsEntity";
import { OrderShipment } from "./OrderShipmentEntity";

export class OrderInvoice extends CustomBaseEntity {
    invoiceNumber!: string;
    order!: Order;
    shipment?: OrderShipment;
    invoiceDate!: Date;
    orderValue!: number;
    sgst!: number;
    cgst!: number;
    igst!: number;
    shippingCharges!: number;
    discount!: number;
    invoiceTotal!: number;
    invoiceStatus!: InvoiceStatus;
    lineItems!: OrderInvoiceLineItem[];
    invoiceFileLink?: string;
}