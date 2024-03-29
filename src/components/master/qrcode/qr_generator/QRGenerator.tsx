import React, { useEffect, useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { COUPAN_BATCH_LIST, COUPON_BATCH_VIEW, ORDER_LIST_API } from '../../../../config/api.config';
import { Order } from '../../../../entities/OrderEntity';
import GeneralList from '../../../general/GeneralList';
import { displayDate, getRupee } from '../../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_ORDER_ADD, FURL_ORDER_EDIT_WITHOUT_PARAMS, FURL_QR_CODE_BATCH, FURL_QR_CODE_GENERATOR_BATCH } from '../../../../config/route.config';
import { OrderStatus, UserRole } from '../../../../common/common.enum';
import { JSObjectDto } from '../../../../common/common.dto';
import { RenderRestriction } from '../../../general/Restriction';
import { ManufacturerDropdownListFilter, OrderStatusDropdownListFilter, ProductDropdownListFilter, StockistDropdownListFilter } from '../../../general/GeneralComponents';
import { getApiData } from '../../../../common/DataService';
import { IBatchDetails } from '../../../../models/coupon';


const QRGenerator = (props: { status?: OrderStatus[]; isDialog?: boolean }) => {
    const title: string = 'QR Generator';
    // let listUrl: string = ORDER_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
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
            <div className="flex-wrap">
                <Link to={`${FURL_QR_CODE_GENERATOR_BATCH}${rowData.id}`} className="p-button p-button-info m-1">
                    Add Coupon
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
                        <DataTable {...datatableProps}>
                            <Column header="ID" field="id" sortable filter showFilterMatchModes={false} />
                            <Column header="Product" field="product.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                            <Column header="Product code" field="product.code" sortable filter showFilterMatchModes={false} />
                            <Column header="Manufacturer" field="manufacturer.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                            <Column header="Sale Amount" field="product.price" filterField="product.price" body={(data) => getRupee(data.product.price)} sortable filter />
                            <Column header="Incentive Amount" field="cashback" filterField="cashback" body={(data) => getRupee(data.cashback)} sortable filter />
                            <Column header="Date" field="createdAt" body={(data) => displayDate(data.createdAt)} />
                            <Column header="Action" style={{ minWidth: '15rem' }} body={actionContent} />
                        </DataTable>
                    )}
                />
            </RenderRestriction>
        </>
    );
};
export default QRGenerator;