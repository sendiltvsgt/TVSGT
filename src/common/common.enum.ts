export enum OrderStatus {
    PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
    PARTIALLY_SHIPPED = "PARTIALLY_SHIPPED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}

export enum ShippingStatus {
    INITIATED = "INITIATED",
    IN_PROGRESS = "IN_PROGRESS",
    DELIVERED = "DELIVERED",
    DELIVERY_FAILED = "DELIVERY_FAILED",
}

export enum InvoiceStatus {
    CREATED = "CREATED",
    FULLFILLED = "FULLFILLED",
    CANCELLED = "CANCELLED"
}

export enum UserType {
    MANUFACTURER = "MANUFACTURER",
    STOCKIST = "STOCKIST",
    ADMIN = "ADMIN"
}

export enum OrderRenderMode {
    ADD = "ADD",    
    EDIT = "EDIT",
    VIEW = "VIEW"
}

export enum OrderRenderModeRole {
    ADMIN = "ADMIN",    
    MANUFACTURER = "MANUFACTURER"
}

export enum ShipmentRenderMode {
    ADD = "ADD",    
    VIEW = "VIEW"
}

export enum UserRole {
    MANUFACTURER = "MANUFACTURER",
    STOCKIST = "STOCKIST",
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}