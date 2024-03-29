import { ShippingStatus } from "../common/common.enum";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { DeliveryPartner } from "./DeliveryPartnerEntity";
import { Order } from "./OrderEntity";
import { OrderInvoice } from "./OrderInvoiceEntity";
import { OrderShipmentItem } from "./OrderShipmentItemsEntity";
import { ServiceableState } from "./ServiceableStateEntity";
import { StockistAddress } from "./StockistAddressEntity";

export class OrderShipment extends CustomBaseEntity {
    shipmentNumber!: string;
    order!: Order;
    orderInvoice!: OrderInvoice;
    deliveryPartner!: DeliveryPartner;
    trackingNumber?: string;
    shippingDate!: Date;
    deliveryDate?: Date;
    shippingStatus!: ShippingStatus;
    shippingAddress!: StockistAddress;
    shippingName!: string;
    shippingAddressText!: string;
    shippingCity!: string;
    shippingState!: ServiceableState;
    shippingZip!: string;
    lineItems!: OrderShipmentItem[];
}