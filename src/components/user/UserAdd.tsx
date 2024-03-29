import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { USER_ADD_API } from '../../config/api.config';
import { User } from '../../entities/UserEntity';
import { postApiData } from '../../common/DataService';
import { Dropdown } from 'primereact/dropdown';
import { UserType } from '../../common/common.enum';

const UserAdd = () => {

    const title = "User";
    const navigate = useNavigate();

    const formik = useFormik<Partial<User>>({
        initialValues: {},
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                await postApiData<Partial<User>>(USER_ADD_API, data);
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
                        <h5>Username</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Username" name='username' type="text" value={formik.values.username} onChange={formik.handleChange} />
                        </span>

                        <h5>Password</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Password" name='password' type="text" value={formik.values.password} onChange={formik.handleChange} />
                        </span>

                        <h5>First Name</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="First Name" name='firstName' type="text" value={formik.values.firstName} onChange={formik.handleChange} />
                        </span>

                        <h5>Username</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Last Name" name='lastName' type="text" value={formik.values.lastName} onChange={formik.handleChange} />
                        </span>

                        <h5>Email</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Email" name='email' type="text" value={formik.values.email} onChange={formik.handleChange} />
                        </span>

                        <h5>Phone</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Phone" name='phone' type="text" value={formik.values.phone} onChange={formik.handleChange} />
                        </span>

                        <h5>Type</h5>
                        <span className="p-float-label">
                            <Dropdown name="userType" value={formik.values.userType} options={Object.values(UserType)} onChange={formik.handleChange} />
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

export default UserAdd;