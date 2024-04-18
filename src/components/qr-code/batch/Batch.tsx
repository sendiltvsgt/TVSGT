import React from 'react';
import { DataTable, DataTableFilterMeta, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { COUPAN_BATCH_LIST } from '../../../config/api.config';
import GeneralList from '../../general/GeneralList';
import { displayDate, getRupee } from '../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_QR_CODE_BATCHADD } from '../../../config/route.config';
import { UserRole } from '../../../common/common.enum';
import { RenderRestriction } from '../../general/Restriction';
import { IBatchDetails } from '../../../models/coupon';
import { useState } from 'react';
import { ManufacturerDropdownListFilter, ProductDropdownListFilter } from '../../general/GeneralComponents';
import { FilterMatchMode } from 'primereact/api';

const actionContent = (rowData: IBatchDetails) => {
    return (
        <div className="flex-wrap">
            <Link to={``} className="p-button p-button-info m-1">
                View
            </Link>
            <ConfirmPopup />
        </div>
    );
};
const rightToolbarElement = () => {
    return (
        <React.Fragment>
            <Link to={FURL_QR_CODE_BATCHADD}>
                <Button label="ADD" icon="pi pi-plus" className="p-button-success mr-2" />
            </Link>
        </React.Fragment>
    );
};
const Batch = () => {
    const title: string = 'Batch List';
    const [reload, setReload] = useState<boolean>(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'product.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'product.code': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'manufacturer.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        cashback: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    return (
        <div className="w-100 h-100">
            <RenderRestriction allowedRoles={[UserRole.ADMIN, UserRole.MANUFACTURER]}>
                <GeneralList<IBatchDetails>
                    title={title}
                    reload={reload}
                    rightToolBarElements={rightToolbarElement}
                    listUrl={COUPAN_BATCH_LIST}
                    render={(datatableProps: DataTableProps) => (
                        //------Without sortable
                        // <DataTable {...datatableProps} filters={filters}>
                        //     <Column header="Batch ID" field="id" sortable filter />
                        //     <Column header="Product" field="product.name" filter filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                        //     <Column header="Product SKU ID" field="product.code" filter />
                        //     <Column header="Manufacturer" field="manufacturer.name" filter filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                        //     <Column header="Incentive Amount" field="cashback" body={(data) => getRupee(data.cashback)} sortable filter showFilterMatchModes={false} />
                        //     <Column header="Created Date" field="createdAt" filterField="createdAt" body={(data) => displayDate(data.createdAt)} sortable />
                        //     {/* <Column header="Action" style={{ minWidth: '15rem' }} body={actionContent} /> */}
                        // </DataTable>
                        <DataTable {...datatableProps} filters={filters}>
                            <Column header="Batch ID" field="id" sortable filter />
                            <Column header="Product" field="product.name" sortable filter filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                            <Column header="Product SKU ID" field="product.code" sortable filter />
                            <Column header="Manufacturer" field="manufacturer.name" sortable filter filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                            <Column header="Incentive Amount" field="cashback" body={(data) => getRupee(data.cashback)} sortable filter showFilterMatchModes={false} />
                            <Column header="Created Date" field="createdAt" filterField="createdAt" body={(data) => displayDate(data.createdAt)} sortable />
                            {/* <Column header="Action" style={{ minWidth: '15rem' }} body={actionContent} /> */}
                        </DataTable>
                    )}
                />
            </RenderRestriction>
        </div>
    );
};

export default Batch;
