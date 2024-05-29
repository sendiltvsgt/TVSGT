import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';
import CustomButton from '../../common/CustomButton';
import { ICoupon } from '../../../models/coupon';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

interface Action {
    value: string;
    type: string;
}
interface Props {
    coupon: ICoupon;
}
const QRCodeComp = ({ coupon }: Props) => {
    // const { code } = useParams();
    const [action, setAction] = useState<Action>({ value: '', type: '' });
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const printQRCodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (action.type === 'print') {
            try {
                handlePrint();
            } catch (error) {
                console.log('err', error);
            }
        } else if (action.type === 'download') handleDownloadPDF();
    }, [action]);
    const handlePrint = useReactToPrint({
        content: () => printQRCodeRef.current
    });
    const handleDownloadPDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        if (printQRCodeRef.current) {
            html2canvas(printQRCodeRef.current)
                .then((canvas) => {
                    const imageData = canvas.toDataURL('image/png');
                    const width = pdf.internal.pageSize.getWidth();
                    const height = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imageData, 'PNG', 0, 0, width, height);
                    pdf.save('qr-code.pdf');
                })
                .catch((error) => {
                    console.error('Error generating PDF:', error);
                    // Handle errors gracefully, e.g., display an error message to the user
                });
        }
    };

    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="flex-grow-1 w-100 ">
                <div ref={qrCodeRef} className=" w-100 h-100 d-flex flex-column">
                    <div className="py-2 px-5  flex-grow-1 w-100 d-flex flex-column justify-content-center align-items-center">
                        <span className=" pr-2 d-flex justify-content-end text-dark text-base font-semibold " style={{ width: `calc((100vh + 100vw) / 7)`, minWidth: 200 }}>
                            Batch ID : {coupon.couponBatch.id}
                        </span>
                        <div className=" flex-grow-1 d-flex justify-content-center align-items-center " style={{ minWidth: 200, height: `calc((100vh + 100vw) / 7)`, width: `calc((100vh + 100vw) / 7)` }}>
                            <QRCodeSVG value={coupon.couponCode} className="h-100 w-100" style={{ objectFit: 'fill' }} fgColor="#160b55" />
                        </div>

                        <span className=" mt-1 text-center text-dark text-2xl font-semibold ">{coupon.couponCode}</span>
                        <span className="mt-1 ps-1 text-wrap text-start text-dark text-base font-semibold " style={{ width: `calc((100vh + 100vw) / 7)`, minWidth: 200 }}>
                            Product Details : {coupon.couponBatch.product.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
                <CustomButton
                    className="mx-3 "
                    minWidth={180}
                    label="Download"
                    onClick={() =>
                        setAction({
                            value: `${coupon.couponCode}`,
                            type: 'download'
                        })
                    }
                />
                <CustomButton
                    className=" "
                    minWidth={180}
                    label="Print"
                    onClick={() =>
                        setAction({
                            value: `${coupon.couponCode}`,
                            type: 'print'
                        })
                    }
                />
            </div>
            <div className="" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div ref={printQRCodeRef} id="print-content" className=" d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                    <div className=" d-flex align-items-end" style={{ height: '23.5%', width: '81.8%' }}>
                        <span className="mb-1 mr-2  w-100 d-flex justify-content-end  text-dark font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 90)' }}>
                            Batch ID : {coupon.couponBatch.id}
                        </span>
                    </div>
                    <div className="d-flex justify-content-center     " style={{ height: '53%', width: '81.8%' }}>
                        <QRCodeSVG value={coupon.couponCode} className="w-100 h-100" style={{ objectFit: 'fill' }} fgColor="#160b55" />
                    </div>
                    <div className=" flex-column justify-content-start  " style={{ height: '23.5%', width: '81.8%' }}>
                        <span className=" mt-2 text-center  text-dark font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 50)' }}>
                            {coupon.couponCode}
                        </span>
                        <span className="mt-1 w-100 d-flex justify-content-start text-wrap text-dark  font-semibold " style={{ fontSize: 'calc((100vh + 100vw) / 90)' }}>
                            Product Details : {coupon.couponBatch.product.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QRCodeComp;
