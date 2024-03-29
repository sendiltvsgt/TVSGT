import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrderStatus, OrderRenderMode, OrderRenderModeRole } from '../../../common/common.enum';
import { getApiData, putApiData } from '../../../common/DataService';
import { ORDER_EDIT_API, ORDER_SHIPMENT_STATUS_CHANGE_API, ORDER_STATUS_CHANGE_API, ORDER_VIEW_API } from '../../../config/api.config';
import { FURL_ORDER_SHIPMENT_ADD_WITHOUT_PARAMS } from '../../../config/route.config';
import { Order } from '../../../entities/OrderEntity';
import OrderShipmentList from '../shippment/OrderShipmentList';
import { ConfirmOrderDialog, OrderDetails, OrderLineItemElememt, OrderOtherDetails, OrderStatusBadge } from './OrderComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { orderCancelFn } from '../../general/ComponentFunctions';

const OrderEdit = () => {
    const {id} = useParams(); 
    const [reload, setReload] = useState<boolean>(false);
    const [orderData, setOrderData] = useState<Order>({} as Order);
    const [orderRenderMode, setOrderRenderMode] = useState<OrderRenderMode>(OrderRenderMode.VIEW);
    const [confirmOrderDialogState, setConfirmOrderDialogState] = useState<boolean>(false);

    const [orderRenderModeRole, setOrderRenderModeRole] = useState<OrderRenderModeRole>(OrderRenderModeRole.ADMIN);
    
    // Logged in user from store
    const storeLoginUser = useSelector((state: RootState) => state.loginUser.user);
    if (storeLoginUser?.userType === "MANUFACTURER" && orderRenderModeRole !== OrderRenderModeRole.MANUFACTURER) {
        setOrderRenderModeRole(OrderRenderModeRole.MANUFACTURER);
    }

    useEffect(() => {
        (async () => {
            const result = await getApiData<Order>(ORDER_VIEW_API + "/" + id);

            //Set Render mode
            if(result.data.status === OrderStatus.PENDING_CONFIRMATION){
                setOrderRenderMode(OrderRenderMode.EDIT);
            }
            
            //Set estimated delivery date and estimated shipping date
            if(!result.data.estimatedDeliveryDate){
                result.data.estimatedDeliveryDate = new Date();
            }
            if(!result.data.estimatedShippingDate){
                result.data.estimatedShippingDate = new Date();
            }
            //Set Accepted quantity
            if(result.data.lineItems){
                result.data.lineItems.forEach((item) => {
                    if(!item.acceptedQuantity){
                        if(item.acceptedQuantity === null){
                            item.acceptedQuantity = 0;
                        }
                    }
                });
            }

            setOrderData(result.data);
        })();
    }, [id, reload]);


    const orderSubmit = (data: Partial<Order>) => {
        (async () => {
            if(data && data.id){
                console.log("Order updated !");
                let result = await putApiData<Order>(ORDER_EDIT_API,data.id, data);
                setOrderData(result.data);
            }
        })();
    }

    //Change order status
    const changeOrderStatus = (data: Partial<Order>, status: OrderStatus) => {
        (async () => {
            if(data && data.id){
                console.log("Order Confirmed");
                let result = await putApiData<Order>(ORDER_STATUS_CHANGE_API,data.id, {status: status});
                setOrderData(result.data);
            }
        })();
    }
    

    const startContent = (data: Partial<Order>) => {
        return (
            <React.Fragment>
                <span className='text-2xl font-bold mr-4'>{data.orderNumber} (Rev#{data.revision})</span>
                <OrderStatusBadge status={data.status} size="large" />
            </React.Fragment>
        )
    };

    const endContent = (data: Partial<Order>, touched: any) => {
        return (
            <React.Fragment>
                {
                    (data.status === OrderStatus.PAYMENT_RECEIVED || data.status === OrderStatus.PARTIALLY_SHIPPED) &&
                        <Link to={FURL_ORDER_SHIPMENT_ADD_WITHOUT_PARAMS+data.id}>
                            <Button type='button' className="p-button-success" label="Add Shipment" />
                        </Link>
                }

                {
                    data.status === OrderStatus.PENDING_CONFIRMATION &&
                        <>
                            <Button tooltip={Object.keys(touched).length?"Save the changes before confirming the order!":""} tooltipOptions={{'showOnDisabled': true}} type='button' disabled={Object.keys(touched).length?true:false} className="p-button-success m-1" label="Confirm Order" onClick={()=>setConfirmOrderDialogState(true)} />
                            <ConfirmOrderDialog data={data} changeOrderStatus={changeOrderStatus} display={confirmOrderDialogState} setConfirmOrderDialogState={setConfirmOrderDialogState} />

                            <Button onClick={(event)=>orderCancelFn<Order>(event, data.id?data.id:0, ORDER_STATUS_CHANGE_API, setReload)} className='p-button p-button-danger m-1' label='Cancel Order' />
                            <ConfirmPopup />
                            
                        </>
                }

                {
                    data.status === OrderStatus.CONFIRMED &&
                        <>
                            <Button type='button' className="p-button-success m-1" label="Payment Received" onClick={()=>changeOrderStatus(data, OrderStatus.PAYMENT_RECEIVED)} />

                            <Button onClick={(event)=>orderCancelFn<Order>(event, data.id?data.id:0, ORDER_STATUS_CHANGE_API, setReload)} className='p-button p-button-danger m-1' label='Cancel Order' />
                            <ConfirmPopup />
                        </>
                }

                {
                    data.status === OrderStatus.SHIPPED &&
                        <Button type='button' className="p-button-success m-1" label="Delivered" onClick={()=>changeOrderStatus(data, OrderStatus.DELIVERED)} />
                }
            </React.Fragment>
        )
    }

    return(
        <Formik enableReinitialize={true} initialValues={orderData} onSubmit={orderSubmit}>
            {({values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, setFieldTouched, touched})=>(
                <div className="grid p-fluid" id='print-content'>
                    <div className="col-12 md:col-12">
                        <div className="card">
                            <Toolbar left={()=>startContent(values)} right={()=>endContent(values, touched)} />

                                <form onSubmit={handleSubmit} className="p-fluid">
                                    
                                    <OrderDetails values={values} handleChange={handleChange} orderRenderMode={orderRenderMode} orderRenderModeRole={orderRenderModeRole} />

                                    <OrderOtherDetails values={values} handleChange={handleChange} orderRenderMode={orderRenderMode} setFieldValue={setFieldValue} />

                                    <TabView className='mt-5'>
                                        <TabPanel header="Item(s)">
                                        {
                                            values.manufacturer && 
                                                <OrderLineItemElememt values={values} handleChange={handleChange} orderRenderMode={orderRenderMode} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
                                        }        
                                        </TabPanel>
                                        <TabPanel header="Shipment">
                                            {orderData && orderData.id && <OrderShipmentList orderId={orderData.id} isDialog={true} />}
                                        </TabPanel>
                                    </TabView>                
                                    
                                                
                                    <span className="grid p-fluid col-4 col-offset-4">
                                        {orderRenderMode !== OrderRenderMode.VIEW && <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />}
                                    </span>       
                                </form>

                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default OrderEdit;