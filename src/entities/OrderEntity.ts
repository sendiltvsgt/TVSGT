import { OrderStatus } from "../common/common.enum";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { ManufacturerAddress } from "./ManufacturerAddressEntity";
import { Manufacturer } from "./ManufacturerEntity";
import { OrderInvoice } from "./OrderInvoiceEntity";
import { OrderLineItem } from "./OrderLineItemsEntity";
import { OrderShipment } from "./OrderShipmentEntity";
import { ServiceableState } from "./ServiceableStateEntity";
import { StockistAddress } from "./StockistAddressEntity";
import { Stockist } from "./StockistEntity";
import { User } from "./UserEntity";

export class Order extends CustomBaseEntity { 
        orderNumber!: string;
        status!: OrderStatus;
        manufacturer!: Manufacturer;
        stockist!: Stockist;
        fulfilmentDate?: Date;
        estimatedShippingDate?: Date;
        estimatedDeliveryDate?: Date;
        placedBy!: User;
        confirmedBy?: User;
        billFromAddress!: ManufacturerAddress;
        billFromName!: string;
        billFromAddressText!: string;
        billFromCity!: string;
        billFromState!: ServiceableState;
        billFromZip!: string;
        billFromGstNumber?: string;
        billingAddress!: StockistAddress;
        billingName!: string;
        billingAddressText!: string;
        billingCity!: string;
        billingState!: ServiceableState;
        billingZip!: string;
        billingGstNumber?: string;
        billingPhone!: string;
        shippingAddress!: StockistAddress;
        shippingName!: string;
        shippingAddressText!: string;
        shippingCity!: string;
        shippingState!: ServiceableState;
        shippingZip!: string;
        shippingGstNumber?: string;
        shippingPhone!: string;
        orderValue!: number;
        sgst!: number;
        cgst!: number;
        igst!: number;
        shippingCharges!: number;
        orderTotal!: number;
        lineItems!: OrderLineItem[];
        invoices!: OrderInvoice[];
        shipments!: OrderShipment[];   
        discount?: number;
        customerNotes?: string;
        revision?: number;
}