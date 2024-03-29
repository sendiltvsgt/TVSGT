import { Toast, ToastMessageType } from 'primereact/toast';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const ToastWrapper = () => {
    //Toast
    const toastBR = useRef<Toast>(null);

    //Redux toast
    const storeToast = useSelector((state: RootState) => state.toast.value);

    useEffect(() => {
        triggerToastBR(storeToast);
    }, [storeToast]);

    const triggerToastBR = (alert: ToastMessageType) => {
        if (toastBR.current) {
            if (Object.keys(alert).length !== 0) {
                toastBR.current.show(alert);
            }
        }
    };

    return <Toast ref={toastBR} position="top-right" />;
};
export default ToastWrapper;
