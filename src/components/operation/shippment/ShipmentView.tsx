import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShippingStatus } from '../../../common/common.enum';
import { getApiData, putApiData } from '../../../common/DataService';
import { ORDER_SHIPMENT_STATUS_CHANGE_API, ORDER_SHIPMENT_VIEW_API } from '../../../config/api.config';
import { FURL_ORDER_EDIT_WITHOUT_PARAMS } from '../../../config/route.config';
import { OrderShipment } from '../../../entities/OrderShipmentEntity';
import { OrderShipmentDetails, OrderShipmentLineItemElememtView, OrderShipmentOtherDetailsView, OrderShipmentStatusBadge } from './ShipmentComponents';

const OrderShipmentView = () => {
    const { id } = useParams();
    const [ shipmentData, setShipmentData] = useState<OrderShipment>({orderInvoice:{}} as OrderShipment);

    const title = "Order Shipment";

    useEffect(() => {
        (async () => {
            const result = await getApiData<OrderShipment>(ORDER_SHIPMENT_VIEW_API + "/" + id);
            setShipmentData(result.data);
        })();
    }, [id]);

    const startContent = (
        <React.Fragment>
            <span className='text-2xl font-bold mr-4'>{title} # {shipmentData.shipmentNumber}</span>
            <OrderShipmentStatusBadge status={shipmentData.shippingStatus} size="large" />
        </React.Fragment>
    );

    const changeOrderShipmentStatus = (data: Partial<OrderShipment>, status: ShippingStatus) => {
        (async () => {
            if(data && data.id){
                let result = await putApiData<OrderShipment>(ORDER_SHIPMENT_STATUS_CHANGE_API,data.id, {status: status});
                setShipmentData(result.data);
            }
        })();
    }


    const endContent = (data: Partial<OrderShipment>) => {
        return (
            <React.Fragment>
                {
                    data.shippingStatus === ShippingStatus.INITIATED &&
                        <Button type='button' className="p-button-success m-1" label="Delivered" onClick={()=>changeOrderShipmentStatus(data, ShippingStatus.DELIVERED)} />
                }

                    <Link to={FURL_ORDER_EDIT_WITHOUT_PARAMS+data.order?.id}>
                        <Button type='button' className="p-button-success" label="View Order" />
                    </Link>
            </React.Fragment>
        )
    }
    
    return(
        <div className="grid p-fluid">
            <div className="col-12 md:col-12">
                {shipmentData.id && 
                    <div className="card">
                        <Toolbar left={startContent} right={()=>endContent(shipmentData)} />

                                <OrderShipmentDetails values={shipmentData as Partial<OrderShipment>} />

                                <OrderShipmentOtherDetailsView values={shipmentData as Partial<OrderShipment>} />

                                <OrderShipmentLineItemElememtView values={shipmentData as Partial<OrderShipment>} />

                    </div>
                }
            </div>
        </div>
    );
}

export default OrderShipmentView;