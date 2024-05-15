import React, { useEffect, useRef, useState } from 'react';
import { getApiData } from '../../../common/DataService';
import { VIEW_GENERATE_COUPONS } from '../../../config/api.config';
import { ICoupons } from '../../../models/coupon';
import QRCode from 'react-qr-code';
import { Button } from 'primereact/button';
import { useReactToPrint } from 'react-to-print';
import { store } from '../../../redux/store';
import { setToast } from '../../../redux/toast.slice';

interface Props {
    batchId: string;
    reload: boolean;
}

const BulkPrint = (props: Props) => {
    const [qrCodes, setQrCodes] = useState<ICoupons[]>([]);
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
            const res = await getApiData<ICoupons[]>(`${VIEW_GENERATE_COUPONS(props.batchId)}?search.status=GENERATED&page.start=0&page.count=500`);
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
                            <div style={{ height: '22%' }}></div>
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '60%' }}>
                                <div className=" py-2 px-5    w-100 h-75 d-flex justify-content-center  ">
                                    <QRCode value={obj.couponCode} className="p-4 w-100 h-100 " style={{ border: '10px solid #160b55', borderRadius: 15 }} fgColor="#160b55" />
                                </div>
                                <span className="mt-2 text-center  text-dark  font-semibold " style={{ fontSize: '5vw' }}>
                                    {obj.couponCode}
                                </span>
                            </div>
                            <div style={{ height: '18%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BulkPrint);
