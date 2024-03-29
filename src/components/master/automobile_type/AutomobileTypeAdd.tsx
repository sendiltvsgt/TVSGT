import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { postApiData } from '../../../common/DataService';
import { AutomobileType } from '../../../entities/AutomobileType';
import { AUTOMOBILE_TYPE_ADD_API } from '../../../config/api.config';
import { useNavigate } from 'react-router-dom';

const AutomobileTypeAdd = () => {

    const title = "Automobile Type";
    const navigate = useNavigate();

    const formik = useFormik<Partial<AutomobileType>>({
        initialValues: {
            name: ''
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                await postApiData<Partial<AutomobileType>>(AUTOMOBILE_TYPE_ADD_API, data);
                navigate(-1);
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(() => {
    }, []);

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

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default AutomobileTypeAdd;