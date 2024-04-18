export const BASE_API_URL = 'http://3.109.208.14:4000';
export const STORE_URL = 'http://tvsgt.com';

export const CATEGORY_VIEW_API = '/category/view';
export const CATEGORY_LIST_API = '/category/list';
export const CATEGORY_ADD_API = '/category/add';
export const CATEGORY_DELETE_API = '/category/delete';

export const AUTOMOBILE_TYPE_VIEW_API = '/automobile_type/view';
export const AUTOMOBILE_TYPE_LIST_API = '/automobile_type/list';
export const AUTOMOBILE_TYPE_ADD_API = '/automobile_type/add';
export const AUTOMOBILE_TYPE_DELETE_API = '/automobile_type/delete';

export const VEHICLE_BRAND_VIEW_API = '/vehicle_brand/view';
export const VEHICLE_BRAND_LIST_API = '/vehicle_brand/list';
export const VEHICLE_BRAND_ADD_API = '/vehicle_brand/add';
export const VEHICLE_BRAND_DELETE_API = '/vehicle_brand/delete';

export const VEHICLE_MODEL_LIST_API = '/vehicle_model/list';
export const VEHICLE_MODEL_ADD_API = '/vehicle_model/add';
export const VEHICLE_MODEL_DELETE_API = '/vehicle_model/delete';
export const VEHICLE_MODEL_VIEW_API = '/vehicle_model/view';

export const SERVICEABLE_STATE_VIEW_API = '/serviceable_state/view';
export const SERVICEABLE_STATE_LIST_API = '/serviceable_state/list';
export const SERVICEABLE_STATE_ADD_API = '/serviceable_state/add';
export const SERVICEABLE_STATE_DELETE_API = '/serviceable_state/delete';

export const SERVICEABLE_PINCODE_VIEW_API = '/serviceable_pincode/view';
export const SERVICEABLE_PINCODE_LIST_API = '/serviceable_pincode/list';
export const SERVICEABLE_PINCODE_ADD_API = '/serviceable_pincode/add';
export const SERVICEABLE_PINCODE_DELETE_API = '/serviceable_pincode/delete';

export const MANUFACTURER_LIST_API = '/manufacturer/list';
export const MANUFACTURER_ADD_API = '/manufacturer/add';
export const MANUFACTURER_DELETE_API = '/manufacturer/delete';
export const MANUFACTURER_VIEW_API = '/manufacturer/view';

export const MANUFACTURER_ADDRESS_LIST_API = '/manufacturer/address/list';
export const MANUFACTURER_ADDRESS_ADD_API = '/manufacturer/address/add';
export const MANUFACTURER_ADDRESS_DELETE_API = '/manufacturer/address/delete';

export const STOCKIST_LIST_API = '/stockist/list';
export const STOCKIST_ADD_API = '/stockist/add';
export const STOCKIST_DELETE_API = '/stockist/delete';
export const STOCKIST_VIEW_API = '/stockist/view';

export const STOCKIST_ADDRESS_LIST_API = '/stockist/address/list';
export const STOCKIST_ADDRESS_ADD_API = '/stockist/address/add';
export const STOCKIST_ADDRESS_DELETE_API = '/stockist/address/delete';

export const PRODUCT_SKU_LIST_API = '/product_sku/list';
export const PRODUCT_SKU_VIEW_API = '/product_sku/view';
export const PRODUCT_SKU_ADD_API = '/product_sku/add';
export const PRODUCT_SKU_EDIT_API = '/product_sku/edit';
export const PRODUCT_SKU_DELETE_API = '/product_sku/delete';

export const ORDER_LIST_API = '/order/list';
export const ORDER_VIEW_API = '/order/view';
export const ORDER_ADD_API = '/order/create';
export const ORDER_EDIT_API = '/order/edit';
export const ORDER_DELETE_API = '/order/delete';
export const ORDER_STATUS_CHANGE_API = '/order/change_status';

export const DELIVERY_PARTNER_LIST_API = '/delivery_partner/list';

export const ORDER_SHIPMENT_ADD_API = '/shipment/create';
export const ORDER_SHIPMENT_LIST_API = '/order/shipments';
export const ORDER_SHIPMENT_VIEW_API = '/shipment/view';
export const ORDER_SHIPMENT_STATUS_CHANGE_API = '/shipment/change_status';

export const ORDER_REPORT = '/order/report';
export const ORDER_LINE_ITEM_REPORT = '/order/reportLineItems';
export const SHIPMENT_REPORT = '/shipment/report';

export const SHIPMENT_LIST_API = '/shipment/list';

export const TAX_RATE_LIST_API = '/tax_rate/list';

export const USER_LOGIN = '/authentication/login';
export const USER_LOGIN_STATUS = '/authentication/loginStatus';

export const USER_LIST_API = '/users/list';
export const USER_ADD_API = '/users/add';
export const USER_EDIT_API = '/users/edit';
export const USER_DELETE_API = '/users/delete';
export const USER_VIEW_API = '/users/view';
export const USER_ADMIN_RESET_PASSWORD_API = '/users/admin_reset_password';

export const OPEN_ORDER_STATS = '/dashboard/openOrdersStatsByStatus';
export const ORDER_DELIVERY_STATS = '/dashboard/orderStats';
export const SALES_STATS_BY_PRODUCT = '/dashboard/salesStatsByProduct';
export const SALES_STATS_BY_BRAND = '/dashboard/salesStatsByBrand';
export const SALES_STATS_BY_MONTH = '/dashboard/salesStatsByMonth';
export const SALES_STATS_BY_STOCKIST = '/dashboard/salesStatsByStockist';

export const COUPON_BATCH_VIEW = (id: number | string) => '/coupon-batch/carton/view/' + id;
export const GENERATE_COUPON = '/coupon-batch/carton/coupon/add';
export const VIEW_GENERATE_COUPONS = (id: number | string) => '/coupon-batch/carton/listCoupons/' + id;
export const COUPAN_CREATE_BATCH = '/coupon-batch/carton/add';
export const COUPAN_BATCH_LIST = '/coupon-batch/carton/list';
