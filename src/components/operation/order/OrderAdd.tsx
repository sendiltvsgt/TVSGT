import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderRenderMode, OrderRenderModeRole } from '../../../common/common.enum';
import { postApiData } from '../../../common/DataService';
import { ORDER_ADD_API } from '../../../config/api.config';
import { FURL_ORDER_EDIT_WITHOUT_PARAMS, FURL_ORDER_LIST } from '../../../config/route.config';
import { ManufacturerAddress } from '../../../entities/ManufacturerAddressEntity';
import { Order } from '../../../entities/OrderEntity';
import { OrderLineItem } from '../../../entities/OrderLineItemsEntity';
import { StockistAddress } from '../../../entities/StockistAddressEntity';
import { OrderDetails, OrderLineItemElememt } from './OrderComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Manufacturer } from '../../../entities/ManufacturerEntity';

const OrderAdd = () => {
    const title = "Order";
    const navigate = useNavigate();
    const [orderRenderModeRole, setOrderRenderModeRole] = useState<OrderRenderModeRole>(OrderRenderModeRole.ADMIN);
    
    // Logged in user from store
    const storeLoginUser = useSelector((state: RootState) => state.loginUser.user);
    if (storeLoginUser?.userType === "MANUFACTURER" && orderRenderModeRole !== OrderRenderModeRole.MANUFACTURER) {
        setOrderRenderModeRole(OrderRenderModeRole.MANUFACTURER);
    }
    
    const orderRenderMode = OrderRenderMode.ADD;
    const initialValue: Partial<Order> = {
        manufacturer: storeLoginUser?.manufacturer || undefined,
        billFromAddress: {} as ManufacturerAddress,
        billingAddress: {} as StockistAddress,
        shippingAddress: {} as StockistAddress,
        orderNumber: "",
        shippingCharges: 0,
        discount: 0,
        lineItems: [
            {
                product: {},
                orderedQuantity: 0
            } as unknown as OrderLineItem
        ]
    };

    const orderSubmit = (data: Partial<Order>) => {
        (async () => {
            console.log("Order Submitted");
            let result = await postApiData<Order[]>(ORDER_ADD_API, data);
            navigate(FURL_ORDER_EDIT_WITHOUT_PARAMS+result.data.pop()!.id);
        })();
    }

    const startContent = (
        <React.Fragment>
            <span className='text-2xl font-bold'>{title} - Creation</span>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <Link to={FURL_ORDER_LIST}>
                <Button type='button' className="p-button-success" label="Back to list" />
            </Link>
        </React.Fragment>
    );

    return(
        <Formik enableReinitialize={true} initialValues={initialValue} onSubmit={orderSubmit}>
            {({values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue})=>(
                <div className="grid p-fluid">
                    <div className="col-12 md:col-12">
                        <div className="card">
                            <Toolbar left={startContent} right={endContent} />

                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <OrderDetails values={values} handleChange={handleChange} orderRenderModeRole={orderRenderModeRole} />
                                                    
                                    {values.manufacturer && values.manufacturer.id &&
                                        <OrderLineItemElememt values={values} handleChange={handleChange} orderRenderMode={orderRenderMode} setFieldValue={setFieldValue}
                                        setFieldTouched={""} />
                                    }
                                                
                                    <span className="grid p-fluid col-4 col-offset-4">
                                        <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                                    </span>       
                                </form>

                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default OrderAdd;