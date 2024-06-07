import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { getApiDataDownload } from '../../../common/DataService';
import { useNavigate } from 'react-router-dom';
import { DeliveryPartnerDropdown, ShipmentStatusDropdown } from '../../general/GeneralComponents';
import { SHIPMENT_REPORT } from '../../../config/api.config';
import { DeliveryPartner } from '../../../entities/DeliveryPartnerEntity';
import { Calendar } from 'primereact/calendar';
import { formatDate } from '@fullcalendar/react';
import { endOfDay, format } from 'date-fns';

const ShipmentReport = () => {

    const title = "Shipment Report";

    const formik = useFormik<Partial<any>>({
        initialValues: {
            status: '',
            deliveryPartner: {} as DeliveryPartner,
            createdAtRange: [],
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                const postData = {
                    "status": data.status.value,
                    "deliveryPartner.id": data.deliveryPartner.id,
                    "createdAtFrom": format(data.createdAtRange[0],"yyyy-MM-dd HH:mm:ss"),
                    "createdAtTo": format(endOfDay(data.createdAtRange[1]),"yyyy-MM-dd HH:mm:ss"),
                }
                await getApiDataDownload(SHIPMENT_REPORT, postData);
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(() => {
    }, []);

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h3>{title}</h3>

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="grid p-fluid">
                            <span className="p-fluid col-4">
                                <h5>Status</h5>
                                <span className="p-float-label">
                                    <ShipmentStatusDropdown name="status" value={formik.values.status.value} onChange={formik.handleChange} />
                                </span>
                            </span>
                            
                            <span className="p-fluid col-4">
                                <h5>Delivery Partner</h5>
                                <span className="p-float-label">
                                    <DeliveryPartnerDropdown name="deliveryPartner" value={formik.values.deliveryPartner} onChange={formik.handleChange} />
                                </span>
                            </span>

                            <span className="p-fluid col-4">
                                <h5>Created Date</h5>
                                <span className="p-float-label">
                                    <Calendar value={formik.values.createdAtRange} name="createdAtRange" onChange={formik.handleChange} selectionMode="range" readOnlyInput dateFormat="yy-mm-dd" />
                                </span>
                            </span>
                            
                            <span className="grid p-fluid col-4 col-offset-4">
                                <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Download" />
                            </span>    
                        </div>   
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default ShipmentReport;
