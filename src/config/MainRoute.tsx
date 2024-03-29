import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { OrderStatus } from '../common/common.enum';
import Dashboard from '../components/Dashboard';
import AutomobileTypeAdd from '../components/master/automobile_type/AutomobileTypeAdd';
import AutomobileTypeList from '../components/master/automobile_type/AutomobileTypeList';
import CategoryAdd from '../components/master/category/CategoryAdd';
import CategoryList from '../components/master/category/CategoryList';
import ManufacturerAdd from '../components/master/manufacturer/ManufacturerAdd';
import ManufacturerList from '../components/master/manufacturer/ManufacturerList';
import ProductSkuAdd from '../components/master/product_sku/ProductSkuAdd';
import ProductSkuList from '../components/master/product_sku/ProductSkuList';
import ServiceablePincodeAdd from '../components/master/serviceable_pincode/ServiceablePincodeAdd';
import ServiceablePincodeList from '../components/master/serviceable_pincode/ServiceablePincodeList';
import ServiceableStateAdd from '../components/master/serviceable_state/ServiceableStateAdd';
import ServiceableStateList from '../components/master/serviceable_state/ServiceableStateList';
import StockistAdd from '../components/master/stockist/StockistAdd';
import StockistList from '../components/master/stockist/StockistList';
import VehicleBrandAdd from '../components/master/vehicle_brand/VehicleBrandAdd';
import VehicleBrandList from '../components/master/vehicle_brand/VehicleBrandList';
import VehicleModelAdd from '../components/master/vehicle_model/VehicleModelAdd';
import VehicleModelList from '../components/master/vehicle_model/VehicleModelList';
import OrderAdd from '../components/operation/order/OrderAdd';
import OrderEdit from '../components/operation/order/OrderEdit';
import OrderList from '../components/operation/order/OrderList';
import OrderShipmentAdd from '../components/operation/shippment/ShipmentAdd';
import OrderShipmentView from '../components/operation/shippment/ShipmentView';
import {
    FURL_AUTOMOBILE_TYPE_ADD,
    FURL_AUTOMOBILE_TYPE_LIST,
    FURL_CATEGORY_ADD,
    FURL_CATEGORY_LIST,
    FURL_MANUFACTURER_ADD,
    FURL_MANUFACTURER_LIST,
    FURL_ORDER_ADD,
    FURL_ORDER_DELIVERED_LIST,
    FURL_ORDER_EDIT,
    FURL_ORDER_LINEITEM_REPORT,
    FURL_ORDER_LIST,
    FURL_ORDER_PAYMENT_DUE_LIST,
    FURL_ORDER_PENDING_CONFIRMATION_LIST,
    FURL_ORDER_PENDING_FULFILLMENT_LIST,
    FURL_ORDER_REPORT,
    FURL_ORDER_SHIPMENT_ADD,
    FURL_ORDER_SHIPMENT_VIEW,
    FURL_PRODUCT_SKU_ADD,
    FURL_PRODUCT_SKU_EDIT,
    FURL_PRODUCT_SKU_LIST,
    FURL_QR_CODE_GENERATOR,
    FURL_QR_CODE_GENERATOR_BATCH,
    FURL_SERVICEABLE_PINCODE_ADD,
    FURL_SERVICEABLE_PINCODE_LIST,
    FURL_SERVICEABLE_STATE_ADD,
    FURL_SERVICEABLE_STATE_LIST,
    FURL_SHIPMENT_LIST,
    FURL_SHIPMENT_REPORT,
    FURL_STOCKIST_ADD,
    FURL_STOCKIST_LIST,
    FURL_USER_ADD,
    FURL_USER_EDIT,
    FURL_USER_LIST,
    FURL_USER_RESET_PASSWORD,
    FURL_VEHICLE_BRAND_ADD,
    FURL_VEHICLE_BRAND_LIST,
    FURL_VEHICLE_MODEL_ADD,
    FURL_VEHICLE_MODEL_LIST,
    FURL_QR_CODE_BATCHADD,
    FURL_QR_CODE_BATCH
} from './route.config';
import ShipmentList from '../components/operation/shippment/ShipmentList';
import UserList from '../components/user/UserList';
import ProductSkuEdit from '../components/master/product_sku/ProductSkuEdit';
import UserAdd from '../components/user/UserAdd';
import UserEdit from '../components/user/UserEdit';
import UserAdminResetPassword from '../components/user/UserAdminResetPassword';
import OrderReport from '../components/operation/order/OrderReport';
import ShipmentReport from '../components/operation/shippment/ShipmentReport';
import OrderLineItemReport from '../components/operation/order/OrderLineItemReport';
import Qrcode from '../components/master/qrcode';
import Newbatch from '../components/master/qrcode/batch/Newbatch';
import Batch from '../components/master/qrcode/batch/Batch';
import QRGenerator from '../components/master/qrcode/qr_generator/QRGenerator';
import BatchDetails from '../components/master/qrcode/qr_generator/BatchDetails';

export const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path={FURL_CATEGORY_ADD} element={<CategoryAdd />} />
            <Route path={FURL_CATEGORY_LIST} element={<CategoryList />} />
            <Route path={FURL_AUTOMOBILE_TYPE_LIST} element={<AutomobileTypeList />} />
            <Route path={FURL_AUTOMOBILE_TYPE_ADD} element={<AutomobileTypeAdd />} />
            <Route path={FURL_VEHICLE_BRAND_LIST} element={<VehicleBrandList />} />
            <Route path={FURL_VEHICLE_BRAND_ADD} element={<VehicleBrandAdd />} />
            <Route path={FURL_VEHICLE_MODEL_LIST} element={<VehicleModelList />} />
            <Route path={FURL_VEHICLE_MODEL_ADD} element={<VehicleModelAdd />} />
            <Route path={FURL_SERVICEABLE_STATE_LIST} element={<ServiceableStateList />} />
            <Route path={FURL_SERVICEABLE_STATE_ADD} element={<ServiceableStateAdd />} />
            <Route path={FURL_SERVICEABLE_PINCODE_LIST} element={<ServiceablePincodeList />} />
            <Route path={FURL_SERVICEABLE_PINCODE_ADD} element={<ServiceablePincodeAdd />} />
            <Route path={FURL_MANUFACTURER_LIST} element={<ManufacturerList />} />
            <Route path={FURL_MANUFACTURER_ADD} element={<ManufacturerAdd />} />
            <Route path={FURL_STOCKIST_LIST} element={<StockistList />} />
            <Route path={FURL_STOCKIST_ADD} element={<StockistAdd />} />
            <Route path={FURL_PRODUCT_SKU_LIST} element={<ProductSkuList />} />
            <Route path={FURL_PRODUCT_SKU_ADD} element={<ProductSkuAdd />} />
            <Route path={FURL_PRODUCT_SKU_EDIT} element={<ProductSkuEdit />} />
            <Route path={FURL_ORDER_ADD} element={<OrderAdd />} />
            <Route path={FURL_ORDER_LIST} element={<OrderList />} />
            <Route path={FURL_ORDER_PENDING_CONFIRMATION_LIST} element={<OrderList status={[OrderStatus.PENDING_CONFIRMATION]} />} />
            <Route path={FURL_ORDER_PAYMENT_DUE_LIST} element={<OrderList status={[OrderStatus.CONFIRMED]} />} />
            <Route path={FURL_ORDER_PENDING_FULFILLMENT_LIST} element={<OrderList status={[OrderStatus.PAYMENT_RECEIVED, OrderStatus.PARTIALLY_SHIPPED]} />} />
            <Route path={FURL_ORDER_DELIVERED_LIST} element={<OrderList status={[OrderStatus.DELIVERED, OrderStatus.SHIPPED]} />} />
            <Route path={FURL_ORDER_EDIT} element={<OrderEdit />} />
            <Route path={FURL_ORDER_SHIPMENT_ADD} element={<OrderShipmentAdd />} />
            <Route path={FURL_ORDER_SHIPMENT_VIEW} element={<OrderShipmentView />} />
            <Route path={FURL_SHIPMENT_LIST} element={<ShipmentList />} />
            <Route path={FURL_USER_LIST} element={<UserList />} />
            <Route path={FURL_USER_ADD} element={<UserAdd />} />
            <Route path={FURL_USER_EDIT} element={<UserEdit />} />
            <Route path={FURL_USER_RESET_PASSWORD} element={<UserAdminResetPassword />} />
            <Route path={FURL_ORDER_LINEITEM_REPORT} element={<OrderLineItemReport />} />
            <Route path={FURL_ORDER_REPORT} element={<OrderReport />} />
            <Route path={FURL_SHIPMENT_REPORT} element={<ShipmentReport />} />
            <Route path={FURL_QR_CODE_BATCH} element={<Batch />} />
            <Route path={FURL_QR_CODE_BATCHADD} element={<Newbatch />} />
            <Route path={FURL_QR_CODE_GENERATOR} element={<QRGenerator />} />
            <Route path={FURL_QR_CODE_GENERATOR_BATCH + ':id'} element={<BatchDetails />} />
        </Routes>
    );
};
