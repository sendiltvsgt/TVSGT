import React, { useEffect, useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { ORDER_LIST_API } from '../../../config/api.config';
import { Order } from '../../../entities/OrderEntity';
import GeneralList from '../../general/GeneralList';
import { displayDate, getRupee } from '../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_ORDER_ADD, FURL_ORDER_EDIT_WITHOUT_PARAMS } from '../../../config/route.config';
import { OrderStatus, UserRole } from '../../../common/common.enum';
import { JSObjectDto } from '../../../common/common.dto';
import { OrderStatusBadge } from './OrderComponents';
import { RenderRestriction } from '../../general/Restriction';
import { ManufacturerDropdownListFilter, OrderStatusDropdownListFilter, StockistDropdownListFilter } from '../../general/GeneralComponents';


const OrderList = (props: {status?: OrderStatus[], isDialog?: boolean}) => {
    const title: string = "Order";
    let listUrl: string = ORDER_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
    const [apiFilterParams, setApiFilterParams] = useState<JSObjectDto>({'search.status': props.status?props.status.join():null});

    useEffect(() => {
        setApiFilterParams((prevState: JSObjectDto) => ({ ...prevState, 'search.status': props.status?props.status.join():null } as JSObjectDto));
    }, [props.status]);
    


    const actionContent = (rowData: Order) => {
        return (
            <div className='flex-wrap'>
                <Link to={`${FURL_ORDER_EDIT_WITHOUT_PARAMS}${rowData.id}`} className='p-button p-button-info m-1'>View/Edit</Link>
                {/* <RenderRestriction allowedRoles={[UserRole.ADMIN]}>
                    <Button onClick={(event)=>commonDeleteFn<Order>(event, rowData, ORDER_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                </RenderRestriction> */}
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_ORDER_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>  
            {/* Show only for Admin */}
            <RenderRestriction allowedRoles={[UserRole.ADMIN,UserRole.GUEST]}>

                <GeneralList<Order> title={title} reload={reload} apiFilterParams={apiFilterParams} rightToolBarElements={rightToolbarElement} listUrl={listUrl} hideToolBar={props.isDialog} 
                render={(datatableProps: DataTableProps)=>(
                    <DataTable {...datatableProps}>
                        <Column header="Order Number" field="orderNumber" sortable filter showFilterMatchModes={false} />
                        <Column header="Manufacturer" field="manufacturer.name" sortable filter showFilterMatchModes={false} 
                            filterElement={options=><ManufacturerDropdownListFilter {...options} />} />
                        <Column header="Stockist" field="stockist.name" sortable filter showFilterMatchModes={false} 
                            filterElement={options=><StockistDropdownListFilter {...options} />} />
                        <Column header="Order Value" field="orderTotal" body={data=>getRupee(data.orderTotal)} sortable filter showFilterMatchModes={false} />
                        <Column header="Status" field="status" body={data=><OrderStatusBadge status={data.status} />} sortable filter showFilterMatchModes={false} filterField="status"
                            filterElement={options=><OrderStatusDropdownListFilter {...options} />} />
                        <Column header="Date" field="createdAt" dataType="date" body={data=>displayDate(data.createdAt)} />
                        <Column header="Action" style={{ 'minWidth': '15rem' }} body={actionContent} />
                    </DataTable>
                )}/>
            </RenderRestriction>

            {/* Show only for Manufacturer */}
            <RenderRestriction allowedRoles={[UserRole.MANUFACTURER]}>
                <GeneralList<Order> title={title} reload={reload} apiFilterParams={apiFilterParams} rightToolBarElements={rightToolbarElement} listUrl={listUrl} hideToolBar={props.isDialog} render={(datatableProps: DataTableProps)=>(
                    <DataTable {...datatableProps}>
                        <Column header="Order Number" field="orderNumber" sortable filter showFilterMatchModes={false} />
                        <Column header="Stockist" field="stockist.name" sortable filter showFilterMatchModes={false} 
                            filterElement={options=><StockistDropdownListFilter {...options} />} />
                        <Column header="Order Value" field="orderTotal" body={data=>getRupee(data.orderTotal)} sortable filter showFilterMatchModes={false} />
                        <Column header="Status" field="status" body={data=><OrderStatusBadge status={data.status} />} sortable filter filterField="status" showFilterMatchModes={false}
                            filterElement={options=><OrderStatusDropdownListFilter {...options} />} />
                        <Column header="Date" field="createdAt" dataType="date" body={data=>displayDate(data.createdAt)} />
                        <Column header="Action" style={{ 'minWidth': '15rem' }} body={actionContent} />
                    </DataTable>
                )}/>
            </RenderRestriction>
        </>
    );
};
export default OrderList;