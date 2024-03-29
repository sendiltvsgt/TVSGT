import React from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { COUPAN_BATCH_LIST } from '../../../../config/api.config';
import GeneralList from '../../../general/GeneralList';
import { displayDate, getRupee } from '../../../../common/utils';
import { Link } from 'react-router-dom';
import { FURL_QR_CODE_BATCHADD } from '../../../../config/route.config';
import { UserRole } from '../../../../common/common.enum';
import { RenderRestriction } from '../../../general/Restriction';
import { IBatchDetails } from '../../../../models/coupon';
import { useState } from 'react';
import { ManufacturerDropdownListFilter, ProductDropdownListFilter } from '../../../general/GeneralComponents';

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
    return (
        <div className="w-100 h-100">
            <RenderRestriction allowedRoles={[UserRole.ADMIN, UserRole.MANUFACTURER]}>
                <GeneralList<IBatchDetails>
                    title={title}
                    reload={reload}
                    rightToolBarElements={rightToolbarElement}
                    listUrl={COUPAN_BATCH_LIST}
                    render={(datatableProps: DataTableProps) => (
                        <DataTable {...datatableProps}>
                            <Column header="Batch ID" field="id" sortable filter showFilterMatchModes={false} />
                            <Column header="Product" field="product.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ProductDropdownListFilter {...options} />} />
                            <Column header="Product Code" field="product.code" sortable filter showFilterMatchModes={false} />
                            <Column header="Manufacturer" field="manufacturer.name" sortable filter showFilterMatchModes={false} filterElement={(options) => <ManufacturerDropdownListFilter {...options} />} />
                            <Column header="Incentive Amount" field="cashback" body={(data) => getRupee(data.product.price)} sortable filter showFilterMatchModes={false} />
                            <Column header="Created Date" field="createdAt" body={(data) => displayDate(data.createdAt)} />
                            {/* <Column header="Action" style={{ minWidth: '15rem' }} body={actionContent} /> */}
                        </DataTable>
                    )}
                />
            </RenderRestriction>
        </div>
    );
};

export default Batch;
