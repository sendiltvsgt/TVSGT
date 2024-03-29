import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { postApiData } from '../../../common/DataService';
import { VEHICLE_MODEL_ADD_API } from '../../../config/api.config';
import { VehicleModel } from '../../../entities/VehicleModelEntity';
import { VehicleBrand } from '../../../entities/VehicleBrandEntity';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { VehicleBrandDropdown } from '../../general/GeneralComponents';

const VehicleModelAdd = () => {

    const title = "Vehicle Model";
    const navigate = useNavigate();

    const formik = useFormik<Partial<VehicleModel>>({
        initialValues: {
            name: '',
            sort: 1,
            vehicleBrand: {} as VehicleBrand
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                console.log(data);
                await postApiData<Partial<VehicleModel>>(VEHICLE_MODEL_ADD_API, data);
                navigate(-1);
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(() => {}, []);

    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Add</h3>

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <h5>Name</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Name" name='name' type="text" value={formik.values.name} onChange={formik.handleChange} />
                        </span>

                        <h5>Sort</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Sort" name='sort' type="text" value={formik.values.sort} onChange={formik.handleChange} />
                        </span>

                        <h5>Vehicle Brand</h5>
                        <VehicleBrandDropdown name="vehicleBrand" value={formik.values.vehicleBrand} onChange={formik.handleChange} />

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default VehicleModelAdd;
