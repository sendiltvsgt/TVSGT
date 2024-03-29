import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { getApiDataDownload } from '../../../common/DataService';
import { useNavigate } from 'react-router-dom';
import { ManufacturerDropdown, OrderStatusDropdown, StockistDropdown } from '../../general/GeneralComponents';
import { ORDER_LINE_ITEM_REPORT, ORDER_REPORT } from '../../../config/api.config';
import { Stockist } from '../../../entities/StockistEntity';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import { Calendar } from 'primereact/calendar';
import { endOfDay, format } from 'date-fns';

const OrderLineItemReport = () => {

    const title = "Order Line Item Report";
    const navigate = useNavigate();

    const formik = useFormik<Partial<any>>({
        initialValues: {
            status: '',
            stockist: {} as Stockist,
            manufacturer: {} as Manufacturer,
            createdAtRange: [],
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                const postData = {
                    "search.status": data.status.value,
                    "search.stockist.id": data.stockist.id,
                    "search.manufacturer.id": data.manufacturer.id,
                    "search.createdAtFrom": format(data.createdAtRange[0],"yyyy-MM-dd HH:mm:ss"),
                    "search.createdAtTo": format(endOfDay(data.createdAtRange[1]),"yyyy-MM-dd HH:mm:ss"),
                }
                console.log(postData);
                await getApiDataDownload(ORDER_LINE_ITEM_REPORT, postData);
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
                                    <OrderStatusDropdown name="status" value={formik.values.status.value} onChange={formik.handleChange} />
                                </span>
                            </span>
                            
                            <span className="p-fluid col-4">
                                <h5>Stockist</h5>
                                <span className="p-float-label">
                                    <StockistDropdown name="stockist" value={formik.values.stockist} onChange={formik.handleChange} />
                                </span>
                            </span>

                            <span className="p-fluid col-4">
                                <h5>Manufacturer</h5>
                                <span className="p-float-label">
                                    <ManufacturerDropdown name="manufacturer" value={formik.values.manufacturer} onChange={formik.handleChange} />
                                </span>
                            </span>

                            <span className="p-fluid col-4 col-offset-4">
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

export default OrderLineItemReport;
