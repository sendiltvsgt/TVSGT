import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';
import CustomButton from '../../common/CustomButton';

interface Action {
    value: string;
    type: string;
}
interface Props {
    code: string;
}
const QRCodeComp = ({ code }: Props) => {
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
        if (qrCodeRef.current) {
            html2canvas(qrCodeRef.current)
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
            <div className="" style={{ height: 500, width: 500 }}>
                <div ref={qrCodeRef} className=" w-100 h-100 d-flex flex-column">
                    <div className="py-2 px-5  h-100 w-100 d-flex justify-content-center  ">
                        <div className="p-4 h-100 w-100 " style={{ border: '10px solid #160b55', borderRadius: 15 }}>
                            <QRCode value={code} className=" w-100 h-100  " fgColor="#160b55" />
                        </div>
                    </div>
                    <span className=" mt-2 text-center text-dark text-2xl font-semibold ">{code}</span>
                </div>
            </div>

            <div className="mt-3 d-flex justify-content-center align-items-center">
                <CustomButton
                    className="mx-3 "
                    minWidth={180}
                    label="Download"
                    onClick={() =>
                        setAction({
                            value: `${code}`,
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
                            value: `${code}`,
                            type: 'print'
                        })
                    }
                />
            </div>
            <div className="" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div ref={printQRCodeRef} id="print-content" className=" d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                    <div style={{ height: '22%' }}></div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '60%' }}>
                        <div className="py-2 px-5  h-100 w-auto d-flex justify-content-center  ">
                            <QRCode value={action.value} className="p-4 w-100 h-100  " style={{ border: '10px solid #160b55', borderRadius: 15 }} fgColor="#160b55" />
                        </div>
                        <span className=" mt-2 text-center  text-dark  font-semibold " style={{ fontSize: '5vw' }}>
                            {action.value}
                        </span>
                    </div>
                    <div style={{ height: '18%' }}></div>
                </div>
            </div>
        </div>
    );
};
export default QRCodeComp;
