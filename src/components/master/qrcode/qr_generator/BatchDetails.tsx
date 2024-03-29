import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getApiData } from '../../../../common/DataService';
import { COUPON_BATCH_VIEW } from '../../../../config/api.config';
import { IBatchDetails } from '../../../../models/coupon';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import QRCodeComp from './QRCodeComp';
import GenerateCoupon from './GenerateCoupon';
import ViewCoupons from './ViewCoupons';
import { displayDate } from '../../../../common/utils';
import { FURL_QR_CODE_GENERATOR } from '../../../../config/route.config';

const endContent = (
    <React.Fragment>
        <Link to={FURL_QR_CODE_GENERATOR}>
            <Button type="button" className="p-button-success" label="Back to list" />
        </Link>
    </React.Fragment>
);
const BatchDetails = () => {
    const { id } = useParams();
    const [batch, setBatch] = useState<IBatchDetails>({} as IBatchDetails);
    const [showQrcode, setShowQrcode] = useState<boolean>(false);
    const [isGenCoupon, setIsGenCoupon] = useState<boolean>(false);
    const [couponsRefetch, setCouponsRefetch] = useState<boolean>(false);

    const [code, setCode] = useState<string>('');
    useEffect(() => {
        intialLoad();
    }, []);
    const intialLoad = async () => {
        if (id) {
            const res = await getApiData<IBatchDetails>(COUPON_BATCH_VIEW(id));
            setBatch(res.data);
            console.log('coupon', res);
        }
    };

    const startContent = () => {
        return (
            <React.Fragment>
                <span className="text-2xl font-bold mr-4">Batch - {id}</span>
                {/* <OrderStatusBadge status={data.status} size="large" /> */}
            </React.Fragment>
        );
    };
    return (
        <div className="grid p-fluid h-100">
            <div className="h-100 col-12 md:col-12">
                <div className="card">
                    <Toolbar left={startContent} right={endContent} />
                    <div className="mt-5 d-flex flex-wrap justify-content-around">
                        <div className="d-flex flex-column" style={{ minWidth: 100 }}>
                            <span className="mb-3 text-xl font-bold">Batch ID</span>
                            <span className="ml-2 text-xl ">{batch?.id}</span>
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 150 }}>
                            <span className="mb-3 text-xl font-bold">Manufacture</span>
                            <span className="ml-2 text-xl ">{batch?.manufacturer?.name}</span>
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 150 }}>
                            <span className="mb-3 text-xl font-bold">Product</span>
                            <span className="ml-2 text-xl ">{batch?.product?.name}</span>
                        </div>

                        <div className="d-flex flex-column" style={{ minWidth: 150 }}>
                            <span className="mb-3 text-xl font-bold bold">Incentive Amount</span>
                            <span className="ml-2 text-xl ">{batch?.cashback}</span>
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 150 }}>
                            <span className="mb-3 text-xl font-bold bold">Created date</span>
                            <span className="ml-2 text-xl ">{displayDate(new Date(batch?.createdAt))}</span>
                        </div>
                    </div>
                    <div className="mt-5 mr-5 d-flex justify-content-end">
                        <Button style={{ width: '200px' }} type="button" className="p-button-success" label="Generate Coupon" onClick={() => setIsGenCoupon(true)} />
                    </div>
                    <div className="mt-4">{id && <ViewCoupons reload={couponsRefetch} setShowQrcode={setShowQrcode} batchId={id} setCode={setCode} />}</div>
                </div>
            </div>
            <Dialog
                visible={isGenCoupon}
                modal
                header="Available Coupons"
                // footer={footerContent}
                style={{ width: '30vw' }}
                onHide={() => setIsGenCoupon(false)}
            >
                {id && <GenerateCoupon batchId={id} setIsGenCoupon={setIsGenCoupon} couponsRefetch={couponsRefetch} setCouponsRefetch={setCouponsRefetch} />}
            </Dialog>
            <Dialog
                visible={showQrcode}
                modal
                // header={headerElement}
                // footer={footerContent}
                style={{ width: '50vw' }}
                onHide={() => setShowQrcode(false)}
            >
                <QRCodeComp code={code} />
            </Dialog>
        </div>
    );
};

export default BatchDetails;
