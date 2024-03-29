import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BASE_API_URL, ORDER_SHIPMENT_LIST_API, SHIPMENT_LIST_API } from '../../../config/api.config';
import { JSObjectDto } from '../../../common/common.dto';
import { OrderShipment } from '../../../entities/OrderShipmentEntity';
import GeneralList from '../../general/GeneralList';
import { displayDate, getRupee } from '../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_ORDER_SHIPMENT_VIEW_WITHOUT_PARAMS } from '../../../config/route.config';
import { OrderShipmentStatusBadge } from './ShipmentComponents';

const ShipmentList = (props: {isDialog?: boolean}) => {
    const title: string = "Order Shipment List";
    let listUrl: string = SHIPMENT_LIST_API

    const [reload, setReload] = useState<boolean>(false);
    const apiFilterParams: JSObjectDto = {};

    const actionContent = (rowData: OrderShipment) => {
        return (
            <div className='flex-wrap'>
                {rowData.orderInvoice.invoiceFileLink && <a className='p-button' rel="noreferrer" href={BASE_API_URL+"/order/invoice/download/"+rowData.orderInvoice.id} target="_blank">Invoice</a>}
                <Link to={`${FURL_ORDER_SHIPMENT_VIEW_WITHOUT_PARAMS}${rowData.id}`} className='p-button p-button-info mt-1'>View</Link>
            </div>
        );
    };

    return(
        <>
            <GeneralList<OrderShipment> title={title} reload={reload} apiFilterParams={apiFilterParams} listUrl={listUrl} hideToolBar={props.isDialog} render={(datatableProps: DataTableProps)=>{
                //Remove filter display from datatable props in General list component render
                const filterProps = {...datatableProps};
                delete filterProps.filterDisplay;
                
                return (
                    <DataTable {...filterProps}>
                        <Column header="Shipment Number" field="shipmentNumber" />
                        <Column header="Created At" field="createdAt" dataType="date" body={data=>displayDate(data.createdAt)} />
                        <Column header="Tracking Number" field="trackingNumber" />
                        <Column header="Invoice Number" field="orderInvoice.invoiceNumber" />
                        <Column header="Status" field="shippingStatus" body={data=><OrderShipmentStatusBadge status={data.shippingStatus} />} />
                        <Column header="Invoice Date" field="orderInvoice.invoiceDate" body={data=>displayDate(data.orderInvoice.invoiceDate)} />
                        <Column header="Invoice Value" field="orderInvoice.invoiceTotal" body={data=>getRupee(data.orderInvoice.invoiceTotal)} className="text-right" />
                        <Column header="Delivery Partner" field="deliveryPartner.name" />
                        <Column header="Action" body={actionContent} />
                    </DataTable>
                )
            }
        }/>
        </>
    );
};
export default ShipmentList;