import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { postApiData } from '../../../common/DataService';
import { MANUFACTURER_ADDRESS_ADD_API } from '../../../config/api.config';
import { useNavigate } from 'react-router-dom';
import { ManufacturerAddress } from '../../../entities/ManufacturerAddressEntity';
import { ManufacturerDropdown, ServiceableStateDropdown } from '../../general/GeneralComponents';

const ManufacturerAddressAdd = (props: {hideTitle?: boolean, isDialog?: boolean}) => {

    const title = "Manufacturer Addresses";
    const navigate = useNavigate();

    const formik = useFormik<Partial<ManufacturerAddress>>({
        initialValues: {
            addressTitle: ""
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                await postApiData<Partial<ManufacturerAddress>>(MANUFACTURER_ADDRESS_ADD_API, data);
                if(!props.isDialog){
                    navigate(-1);
                }
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(() => {}, []);

    return (
        <div className="grid p-fluid">
            <div className={!props.isDialog?"col-12 col-offset-2 md:col-8":"col-12"}>
                <div className="card">
                    {!props.hideTitle && <h3>{title} - Add</h3>}:

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        
                        <h5>Manufacturer</h5>
                        <span className="p-float-label">
                            <ManufacturerDropdown name="manufacturer" value={formik.values.manufacturer} onChange={formik.handleChange} />
                        </span>

                        <h5>Address Title</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Address Title" name='addressTitle' type="text" value={formik.values.addressTitle} onChange={formik.handleChange} />
                        </span>

                        <h5>Address</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Address" name='address' type="text" value={formik.values.address} onChange={formik.handleChange} />
                        </span>

                        <h5>City</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="City" name='city' type="text" value={formik.values.city} onChange={formik.handleChange} />
                        </span>

                        <h5>State</h5>
                        <span className="p-float-label">
                            <ServiceableStateDropdown name="state" value={formik.values.state} onChange={formik.handleChange} />
                        </span>

                        <h5>Zip</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Zip" name='zip' type="text" value={formik.values.zip} onChange={formik.handleChange} />
                        </span>

                        <h5>Phone</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Phone" name='phone' type="text" value={formik.values.phone} onChange={formik.handleChange} />
                        </span>

                        <h5>Email</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Email" name='email' type="text" value={formik.values.email} onChange={formik.handleChange} />
                        </span>

                        <h5>GST Number</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="GST Number" name='gstNumber' type="text" value={formik.values.gstNumber} onChange={formik.handleChange} />
                        </span>

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default ManufacturerAddressAdd;
