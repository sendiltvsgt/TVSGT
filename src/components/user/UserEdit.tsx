import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_EDIT_API, USER_VIEW_API } from '../../config/api.config';
import { User } from '../../entities/UserEntity';
import { getApiData, postApiData, putApiData } from '../../common/DataService';
import { ToggleButton } from 'primereact/togglebutton';
 

const UserEdit = () => {

    const {id} = useParams();
    const title = "User";
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    const formik = useFormik<Partial<User>>({
        initialValues: user || {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        } as User,
        enableReinitialize: true,
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                if (user && user.id){
                    await postApiData<Partial<User>>(USER_EDIT_API+'/'+user.id,data);
                    navigate(-1);
                }
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(() => {
        (async () => {
            const result = await getApiData<User>(USER_VIEW_API + "/" + id);
            if (result.data){
                setUser(result.data);
            }
        })();
    }, [id]);

    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Edit</h3>

                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <h5>Username</h5>
                        <span className="p-float-label">
                            <InputText required placeholder="Username" name='username' type="text" value={formik.values.username} onChange={formik.handleChange} />
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

                        <h5>Status</h5>
                        <ToggleButton className="w-full sm:w-10rem" onLabel="Deactivate" offLabel="Activate" name='active' checked={formik.values.active} onChange={(e) => formik.setFieldValue('active',e.value)} />
 

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default UserEdit;