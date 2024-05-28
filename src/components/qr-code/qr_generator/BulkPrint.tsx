import React, { useEffect, useRef, useState } from 'react';
import { getApiData } from '../../../common/DataService';
import { VIEW_GENERATE_COUPONS } from '../../../config/api.config';
import { ICoupon } from '../../../models/coupon';
import QRCode from 'react-qr-code';
import { Button } from 'primereact/button';
import { useReactToPrint } from 'react-to-print';
import { store } from '../../../redux/store';
import { setToast } from '../../../redux/toast.slice';
import { QRCodeCanvas } from 'qrcode.react';

interface Props {
    batchId: string;
    reload: boolean;
}

const BulkPrint = (props: Props) => {
    const [qrCodes, setQrCodes] = useState<ICoupon[]>([]);
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const componentRefs = useRef<HTMLDivElement>(null);

    useEffect(() => {
        intialLoad();
    }, [props.reload]);
    const intialLoad = async () => {
        // console.log('token :', getGeneralHeaders().Authorization);

        // const apiUrl = `${BASE_API_URL}${VIEW_GENERATE_COUPONS(props.batchId)}?search.status=GENERATED`;

        // fetch(apiUrl, {
        //     headers: {
        //         Authorization: `${getGeneralHeaders().Authorization}`
        //     }
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('data :', data.length, data); // Do something with the data
        //     })
        //     .catch((error) => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });

        try {
            // const res1 = await axios.get(`${BASE_API_URL}${VIEW_GENERATE_COUPONS(props.batchId)}?search.status=GENERATED`, { headers: getGeneralHeaders() });
            // console.log('COUPONS', res1.data);
            const res = await getApiData<ICoupon[]>(`${VIEW_GENERATE_COUPONS(props.batchId)}?search.status=GENERATED&page.start=0&page.count=500`);
            if (res.data.length) {
                setQrCodes(res.data);
                console.log('COUPONS', res);
            }
        } catch (error) {}
    };
    const handlePrint = () => {
        if (qrCodes.length) {
            Print();
        } else {
            store.dispatch(setToast({ severity: 'info', summary: 'Info', detail: ' All coupons are used', life: 6000 }));
        }
    };
    const Print = useReactToPrint({
        content: () => componentRefs.current
    });
    return (
        <div className=" ">
            {qrCodes.length > 0 && <Button style={{ width: '200px' }} type="button" className="p-button-primary" label="Print Bulk Coupon" onClick={handlePrint} />}
            <div className="" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div ref={componentRefs} id="print-content" className=" w-100 h-100 ">
                    {qrCodes.map((obj, ind) => (
                        <div key={ind} className="  w-100 h-100 d-flex flex-column justify-content-center align-items-center  ">
                            <div className=" d-flex align-items-end" style={{ height: '23.5%', width: '81.8%' }}>
                                <span className="mb-1 mr-2  w-100 d-flex justify-content-end  text-dark font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 100)' }}>
                                    Batch ID : {obj.couponBatch.id}
                                </span>
                            </div>
                            <div className="d-flex justify-content-center     " style={{ height: '53%', width: '81.8%' }}>
                                <QRCodeCanvas value={obj.couponCode} className="w-100 h-100" style={{ objectFit: 'fill' }} fgColor="#160b55" />
                            </div>
                            <div className=" flex-column justify-content-start  " style={{ height: '23.5%', width: '81.8%' }}>
                                <span className=" mt-2 text-center  text-dark font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 50)' }}>
                                    {obj.couponCode}
                                </span>
                                <span className="mt-1 w-100 d-flex justify-content-start text-wrap text-dark  font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 100)' }}>
                                    Product Details : {obj.couponBatch.product.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BulkPrint);
