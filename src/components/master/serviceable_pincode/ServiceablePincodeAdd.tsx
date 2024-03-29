import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { getApiData, postApiData } from '../../../common/DataService';
import { useNavigate } from 'react-router-dom';
import { ServiceableState } from '../../../entities/ServiceableStateEntity';
import { SERVICEABLE_PINCODE_ADD_API, SERVICEABLE_STATE_LIST_API } from '../../../config/api.config';
import { apiResultToDropdownOption } from '../../../common/utils';
import { ServiceablePincode } from '../../../entities/ServiceablePincodeEntity';
import { Dropdown } from 'primereact/dropdown';

const ServiceablePincodeAdd = () => {

    const title = "Serviceable Pincode";
    const navigate = useNavigate();
    const [serviceableStateList, setServiceableStateList] = useState<ServiceableState[]>([]);

    const formik = useFormik<Partial<ServiceablePincode>>({
        initialValues: {
            pincode: "",
            cityOrTown: "",
            state: {} as ServiceableState
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                await postApiData<Partial<ServiceablePincode>>(SERVICEABLE_PINCODE_ADD_API, data);
                navigate(-1);
            }
            )();
            formik.resetForm();
        }
    });

    const loadServiceableState = () => {
        (async () => {
            const result = await getApiData<ServiceableState[]>(SERVICEABLE_STATE_LIST_API); 
            setServiceableStateList(apiResultToDropdownOption(result.data));
        }
        )();
    };

    useEffect(() => {
        loadServiceableState();
    }, []);

    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Add</h3>

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <h5>Pincode</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Pincode" name='pincode' type="text" value={formik.values.pincode} onChange={formik.handleChange} />
                        </span>

                        <h5>City/Town</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="City/Town" name='cityOrTown' type="text" value={formik.values.cityOrTown} onChange={formik.handleChange} />
                        </span>

                        <h5>State</h5>
                        <Dropdown name="state" value={formik.values.state} options={serviceableStateList} onChange={formik.handleChange} />

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default ServiceablePincodeAdd;
