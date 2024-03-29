import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { FileUpload } from 'primereact/fileupload';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApiData, postApiData } from '../../../common/DataService';
import {  ORDER_SHIPMENT_ADD_API, ORDER_VIEW_API } from '../../../config/api.config';
import { Order } from '../../../entities/OrderEntity';
import { OrderInvoice } from '../../../entities/OrderInvoiceEntity';
import { OrderShipment } from '../../../entities/OrderShipmentEntity';
import { OrderShipmentItem } from '../../../entities/OrderShipmentItemsEntity';
import { OrderShipmentDetails, OrderShipmentLineItemElememt, OrderShipmentOtherDetails } from './ShipmentComponents';
import { ShipmentOrderAddDto, ShipmentOrderWithFileDto } from '../../../common/common.dto';

const OrderShipmentAdd = () => {
    const { order_id } = useParams();
    const [orderData, setOrderData] = useState<Order>();
    const navigate = useNavigate();

    const title = "Order Shipment";
    const initialValue: Partial<ShipmentOrderWithFileDto> = {
        order: orderData,
        lineItems: orderData?orderData.lineItems.map( item => {
            return {
                productSku: item.productSku,
                quantity: ((item.acceptedQuantity?item.acceptedQuantity:0)-(item.fullfilledQuantity?item.fullfilledQuantity:0))
            } as OrderShipmentItem }):[],
        shipmentNumber: "",
        shippingDate: new Date(),
        trackingNumber: "",
        orderInvoice: {
            invoiceNumber: "",
            invoiceDate: new Date(),
            shippingCharges: 0,
            discount: 0
        } as OrderInvoice,
        file: ""
    };

    useEffect(() => {
        (async () => {
            const result = await getApiData<Order>(ORDER_VIEW_API + "/" + order_id);
            setOrderData(result.data);
        })();
    }, [order_id]);

    const orderSubmit = (data: Partial<ShipmentOrderWithFileDto>) => {
        if (data.file){
            (async () => {
                console.log("Order Shipment Submitted");
                let postData = {"shipment": {...data}, file: data.file?data.file:""} as ShipmentOrderAddDto;
                let result = await postApiData<Partial<OrderShipment>>(ORDER_SHIPMENT_ADD_API+"/"+orderData?.id, postData);
                navigate(-1);
            })();
        }else{
            alert('Invoice is mandatory!')
        }
    }

    const startContent = (
        <React.Fragment>
            <span className='text-2xl font-bold'>{title} - Creation</span>
        </React.Fragment>
    );

    return(
        <Formik enableReinitialize={true} initialValues={initialValue} onSubmit={orderSubmit}>
            {({values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue})=>(
                <div className="grid p-fluid">
                    <div className="col-12 md:col-12">
                        <div className="card">
                            <Toolbar left={startContent} />

                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <OrderShipmentDetails values={values} />

                                    <OrderShipmentOtherDetails values={values} handleChange={handleChange} setFieldValue={setFieldValue} />

                                    {values.order && values.order.lineItems.length && 
                                        <OrderShipmentLineItemElememt values={values} handleChange={handleChange} setFieldValue={setFieldValue} orderValue={orderData} />
                                    }

                                    <span className="grid p-fluid col-4 col-offset-4">
                                        <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                                    </span>       
                                </form>

                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default OrderShipmentAdd;