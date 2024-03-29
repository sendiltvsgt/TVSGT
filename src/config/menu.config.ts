import { UserRole } from '../common/common.enum';
import {
    FURL_AUTOMOBILE_TYPE_LIST,
    FURL_CATEGORY_LIST,
    FURL_MANUFACTURER_LIST,
    FURL_ORDER_ADD,
    FURL_ORDER_DELIVERED_LIST,
    FURL_ORDER_LINEITEM_REPORT,
    FURL_ORDER_LIST,
    FURL_ORDER_PAYMENT_DUE_LIST,
    FURL_ORDER_PENDING_CONFIRMATION_LIST,
    FURL_ORDER_PENDING_FULFILLMENT_LIST,
    FURL_ORDER_REPORT,
    FURL_PRODUCT_SKU_LIST,
    FURL_QR_CODE_BATCH,
    FURL_QR_CODE_GENERATOR,
    FURL_SERVICEABLE_PINCODE_LIST,
    FURL_SERVICEABLE_STATE_LIST,
    FURL_SHIPMENT_LIST,
    FURL_SHIPMENT_REPORT,
    FURL_STOCKIST_LIST,
    FURL_USER_LIST,
    FURL_VEHICLE_BRAND_LIST,
    FURL_VEHICLE_MODEL_LIST
} from './route.config';

export const MenuItem = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        to: '/',
        role: [UserRole.ADMIN, UserRole.MANUFACTURER]
    },
    {
        label: 'Master',
        icon: 'pi pi-star',
        items: [
            { label: 'Serviceable State', icon: 'pi pi-shield', to: FURL_SERVICEABLE_STATE_LIST, role: [UserRole.ADMIN] },
            { label: 'Serviceable Pincode', icon: 'pi pi-key', to: FURL_SERVICEABLE_PINCODE_LIST, role: [UserRole.ADMIN] },
            { label: 'Category', icon: 'pi pi-folder', to: FURL_CATEGORY_LIST, role: [UserRole.ADMIN] },
            { label: 'Automobile Type', icon: 'pi pi-truck', to: FURL_AUTOMOBILE_TYPE_LIST, role: [UserRole.ADMIN] },
            { label: 'Vehicle Brand', icon: 'pi pi-car', to: FURL_VEHICLE_BRAND_LIST, role: [UserRole.ADMIN] },
            { label: 'Vehicle Model', icon: 'pi pi-sitemap', to: FURL_VEHICLE_MODEL_LIST, role: [UserRole.ADMIN] },
            { label: 'Manufacturer', icon: 'pi pi-shield', to: FURL_MANUFACTURER_LIST, role: [UserRole.ADMIN] },
            { label: 'Stockist', icon: 'pi pi-truck', to: FURL_STOCKIST_LIST, role: [UserRole.ADMIN] },
            { label: 'Product SKU', icon: 'pi pi-box', to: FURL_PRODUCT_SKU_LIST, role: [UserRole.ADMIN] }
        ],
        role: [UserRole.ADMIN]
    },
    {
        label: 'User Management',
        icon: 'pi pi-users',
        items: [{ label: 'User List', icon: 'pi pi-user', to: FURL_USER_LIST, role: [UserRole.ADMIN] }],
        role: [UserRole.ADMIN]
    },
    {
        label: 'Orders',
        icon: 'pi pi-box',
        items: [
            { label: 'Add Order', icon: 'pi pi-plus', to: FURL_ORDER_ADD, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'All Orders', icon: 'pi pi-circle', to: FURL_ORDER_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Pending Confirmation', icon: 'pi pi-minus-circle', to: FURL_ORDER_PENDING_CONFIRMATION_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Payment Due', icon: 'pi pi-money-bill', to: FURL_ORDER_PAYMENT_DUE_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Pending Fulfillment', icon: 'pi pi-shopping-bag', to: FURL_ORDER_PENDING_FULFILLMENT_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Delivered', icon: 'pi pi-check', to: FURL_ORDER_DELIVERED_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] }
        ],
        role: [UserRole.ADMIN, UserRole.MANUFACTURER]
    },
    {
        label: 'Shipment',
        icon: 'pi pi-car',
        items: [{ label: 'All Shipment', icon: 'pi pi-circle', to: FURL_SHIPMENT_LIST, role: [UserRole.ADMIN, UserRole.MANUFACTURER] }],
        role: [UserRole.ADMIN, UserRole.MANUFACTURER]
    },
    {
        label: 'Report',
        icon: 'pi pi-file-excel',
        items: [
            { label: 'Order Report', icon: 'pi pi-circle', to: FURL_ORDER_REPORT, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Order Lineitem', icon: 'pi pi-circle', to: FURL_ORDER_LINEITEM_REPORT, role: [UserRole.ADMIN, UserRole.MANUFACTURER] },
            { label: 'Shipment Report', icon: 'pi pi-circle', to: FURL_SHIPMENT_REPORT, role: [UserRole.ADMIN, UserRole.MANUFACTURER] }
        ],
        role: [UserRole.ADMIN, UserRole.MANUFACTURER]
    },
    {
        label: 'QR Code',
        icon: 'pi pi-qrcode',
        // to: '/qrcode',
        items: [
            { label: 'Batch', icon: 'pi pi-calendar-times', to: FURL_QR_CODE_BATCH, role: [UserRole.MANUFACTURER] },
            { label: 'QR Generate', icon: 'pi pi-box', to: FURL_QR_CODE_GENERATOR, role: [UserRole.ADMIN, UserRole.MANUFACTURER] }
        ],
        role: [UserRole.ADMIN, UserRole.MANUFACTURER]
    }
];
