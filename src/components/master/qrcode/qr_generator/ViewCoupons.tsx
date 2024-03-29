import { Column } from 'primereact/column';
import { DataTableProps, DataTable } from 'primereact/datatable';
import React from 'react';
import { UserRole } from '../../../../common/common.enum';
import { getRupee, displayDate } from '../../../../common/utils';
import { Order } from '../../../../entities/OrderEntity';
import { ManufacturerDropdownListFilter } from '../../../general/GeneralComponents';
import GeneralList from '../../../general/GeneralList';
import { RenderRestriction } from '../../../general/Restriction';
import { VIEW_GENERATE_COUPONS } from '../../../../config/api.config';
import { ICoupons } from '../../../../models/coupon';
interface Props {
    batchId: string;
    reload: boolean;
    setShowQrcode: React.Dispatch<React.SetStateAction<boolean>>;
    setCode: React.Dispatch<React.SetStateAction<string>>;
}
const ViewCoupons = (props: Props) => {
    const handleCoupon = (couponCode: string) => {
        props.setCode(couponCode);
        props.setShowQrcode(true);
    };
    return (
        <div className="w-100 h-100">
            <RenderRestriction allowedRoles={[UserRole.ADMIN, UserRole.MANUFACTURER]}>
                <GeneralList<ICoupons>
                    title={'Coupons'}
                    reload={props.reload}
                    // apiFilterParams={apiFilterParams}
                    listUrl={VIEW_GENERATE_COUPONS(props.batchId)}
                    // hideToolBar={props.isDialog}
                    render={(datatableProps: DataTableProps) => (
                        <DataTable {...datatableProps}>
                            <Column
                                header="Coupon No"
                                field="couponCode"
                                body={(data) => (
                                    <span className="hyperlink" onClick={() => handleCoupon(data.couponCode)}>
                                        {data.couponCode}
                                    </span>
                                )}
                                sortable
                                filter
                                showFilterMatchModes={false}
                            />
                            <Column header="Status" field="status" sortable filter showFilterMatchModes={false} />
                            <Column header="Sale Amount" field="couponBatch.product.price" body={(data) => getRupee(data.couponBatch.product.price)} sortable filter showFilterMatchModes={false} />
                            <Column header="Incentive Amount" field="couponBatch.cashback" body={(data) => getRupee(data.couponBatch.cashback)} sortable filter showFilterMatchModes={false} />
                            <Column header="Product" field="couponBatch.product.name" sortable filter />
                            <Column header="Product code" field="couponBatch.product.code" sortable filter />
                            {/* <Column header="Action" style={{ minWidth: '15rem' }} body={actionContent} /> */}
                        </DataTable>
                    )}
                />
            </RenderRestriction>
        </div>
    );
};

export default ViewCoupons;
