import React, { useEffect, useState } from 'react';
import { DataTable, DataTableFilterMeta, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { COUPAN_BATCH_LIST, COUPON_BATCH_VIEW, ORDER_LIST_API } from '../../../config/api.config';
import { Order } from '../../../entities/OrderEntity';
import GeneralList from '../../general/GeneralList';
import { displayDate, getRupee } from '../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_ORDER_ADD, FURL_ORDER_EDIT_WITHOUT_PARAMS, FURL_QR_CODE_BATCH, FURL_QR_CODE_GENERATOR_BATCH } from '../../../config/route.config';
import { OrderStatus, UserRole } from '../../../common/common.enum';
import { JSObjectDto } from '../../../common/common.dto';
import { RenderRestriction } from '../../general/Restriction';
import { ManufacturerDropdownListFilter, OrderStatusDropdownListFilter, ProductDropdownListFilter, StockistDropdownListFilter } from '../../general/GeneralComponents';
import { getApiData } from '../../../common/DataService';
import { IBatchDetails } from '../../../models/coupon';
import { FilterMatchMode } from 'primereact/api';

const QRGenerator = (props: { status?: OrderStatus[]; isDialog?: boolean }) => {
    const title: string = 'QR Generator';
    // let listUrl: string = ORDER_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
    const [filters] = useState<DataTableFilterMeta>({
        //   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'product.name': { value: null, matchMode: FilterMatchMode.EQUALS },
        'product.code': { value: null, matchMode: FilterMatchMode.EQUALS },
        'product.price': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'product.boxContents': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'manufacturer.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        cashback: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [apiFilterParams, setApiFilterParams] = useState<JSObjectDto>({ 'search.status': props.status ? props.status.join() : null });

    useEffect(() => {
        intialLoad();
        setApiFilterParams((prevState: JSObjectDto) => ({ ...prevState, 'search.status': props.status ? props.status.join() : null } as JSObjectDto));
    }, [props.status]);
    const intialLoad = async () => {
        const res = await getApiData(COUPON_BATCH_VIEW(2));
        console.log('coupon', res);
    };
    const actionContent = (rowData: IBatchDetails) => {
        return (
            // <div className="flex-wrap">
            //     <Link to={`${FURL_QR_CODE_GENERATOR_BATCH}${rowData.id}`} className="p-button p-button-info m-1">
            //         <i className="pi pi-plus-circle"></i>
            //     </Link>
            //     <ConfirmPopup />
            // </div>
            <div className="flex-wrap">
                <Link to={`${FURL_QR_CODE_GENERATOR_BATCH}${rowData.id}`}>
                    <Button type="button" icon="pi pi-plus-circle" tooltip="Add Coupon" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
                </Link>
                <ConfirmPopup />
            </div>
        );
    };

    return (
        <>
            <RenderRestriction allowedRoles={[UserRole.ADMIN, UserRole.MANUFACTURER]}>
                <GeneralList<IBatchDetails>
                    title={title}
                    reload={reload}
                    apiFilterParams={apiFilterParams}
                    listUrl={COUPAN_BATCH_LIST}
                    hideToolBar={props.isDialog}
                    render={(datatableProps: DataTableProps) => (
                        //------Without sortable
                        // <DataTable {...datatableProps} filters={filters}>
                        //     <Column header="Batch ID" field="id" sortable filter showFilterMatchModes={false} />
                        //     <Column header="Product" field="product.name" filter showFilterMatchModes={false} filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                        //     <Column header="Product SKU ID" field="product.code" filter showFilterMatchModes={false} />
                        //     <Column header="Manufacturer" field="manufacturer.name" filter showFilterMatchModes={false} filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                        //     <Column header="Sale Amount" field="product.price" filterField="product.price" body={(data) => getRupee(data.product.price)} filter />
                        //     <Column header="Incentive Amount" field="cashback" filterField="cashback" body={(data) => getRupee(data.cashback)} sortable filter />
                        //     <Column header=" Incentive per Master Carton" field="product.boxContents" filterField="product.boxContents" filter />
                        //     <Column header="Created Date" field="createdAt" body={(data) => displayDate(data.createdAt)} sortable />
                        //     <Column header="Action" style={{ minWidth: '5rem' }} body={actionContent} />
                        // </DataTable>
                        <DataTable {...datatableProps} filters={filters}>
                            <Column header="Batch ID" field="id" sortable filter showFilterMatchModes={false} />
                            <Column header="Product" field="product.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                            <Column header="Product SKU ID" field="product.code" sortable filter showFilterMatchModes={false} />
                            <Column header="Manufacturer" field="manufacturer.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                            <Column header="Sale Amount" field="product.price" filterField="product.price" body={(data) => getRupee(data.product.price)} sortable filter />
                            <Column header="Incentive Amount" field="cashback" filterField="cashback" body={(data) => getRupee(data.cashback)} sortable filter />
                            <Column header=" Incentive per Master Carton" field="product.boxContents" filterField="product.boxContents" sortable filter />
                            <Column header="Created Date" field="createdAt" body={(data) => displayDate(data.createdAt)} sortable />
                            <Column header="Action" style={{ minWidth: '5rem' }} body={actionContent} />
                        </DataTable>
                    )}
                />
            </RenderRestriction>
        </>
    );
};
export default QRGenerator;
