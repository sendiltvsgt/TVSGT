import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_ADMIN_RESET_PASSWORD_API, USER_EDIT_API, USER_VIEW_API } from '../../config/api.config';
import { User } from '../../entities/UserEntity';
import { getApiData, postApiData, putApiData } from '../../common/DataService';
import { AdminResetPasswordDto } from '../../common/common.dto';
import { store } from '../../redux/store';
import { setToast } from '../../redux/toast.slice';

const UserAdminResetPassword = () => {

    const {id} = useParams();
    const title = "User";
    const navigate = useNavigate();

    const formik = useFormik<Partial<AdminResetPasswordDto>>({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        enableReinitialize: true,
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                if (id){
                    if(data.newPassword === data.confirmPassword){
                        await postApiData<Partial<User>>(USER_ADMIN_RESET_PASSWORD_API+"/"+id, {newPassword: data.newPassword});
                        navigate(-1);
                    }else{
                        store.dispatch(setToast({severity: 'error', summary: 'Invalid Password', detail: 'Invalid Password has been entered !', life: 3000}));
                    }
                }
            }
            )();
            formik.resetForm();
        }
    });

    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Reset Password</h3>

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <h5>New Password</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="New Password" name='newPassword' type="password" value={formik.values.newPassword} onChange={formik.handleChange} />
                        </span>

                        <h5>Confirm Password</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Confirm Password" name='confirmPassword' type="password" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                        </span>

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Reset Password" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default UserAdminResetPassword;