import React, { useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { LoginDto } from '../common/common.type';
import { USER_LOGIN } from '../config/api.config';
import { postApiData } from '../common/DataService';
import { LoginResponseDto } from '../common/common.dto';
import { saveLoginToken } from '../common/LoginService';
import { LoggedInRoleContext } from '../components/general/ReactContext';
import { UserRole, UserType } from '../common/common.enum';
import { store } from '../redux/store';
import { setUser } from '../redux/login_user.slice';
import ToastWrapper from '../toast.component';
import { setNavigate } from '../redux/navigate.slice';
import { setToast } from '../redux/toast.slice';

export const Login = () => {
    const navigate = useNavigate();
    const { setRole } = useContext(LoggedInRoleContext);

    const initialValues: LoginDto = {
        username: '',
        password: ''
    };

    const userLogin = (data: LoginDto) => {
        (async () => {
            try {
                let result = await postApiData<LoginResponseDto>(USER_LOGIN, data);
                // Login success logics
                if (result.data.success) {
                    if (result.data.data.user.userType === UserType.ADMIN || result.data.data.user.userType === UserType.MANUFACTURER) {
                        saveLoginToken(result.data.data.token);
                        store.dispatch(setUser(result.data.data.user));
                        store.dispatch(setNavigate({ to: '', from: '' }));
                        store.dispatch(setToast({ severity: 'success', summary: 'Success', detail: 'Logged in successfully !', life: 3000 }));
                        setRole(result.data.data.privileges.pop() as UserRole);
                        setTimeout(() => navigate('/'), 200);
                    }
                }
            } catch (e) {
                navigate('/');
            }
        })();
    };

    return (
        <React.Fragment>
            <ToastWrapper />
            <Formik
                initialValues={initialValues}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(false);
                    userLogin(data);
                }}
            >
                {({ handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="login-body">
                            <div className="login-wrapper">
                                <div className="login-panel">
                                    <div className="logo p-link">
                                        <img src="assets/layout/images/logo-single.svg" alt="dream-layout" style={{ width: '100px' }} />
                                    </div>

                                    <InputText name="username" placeholder="Email" onChange={handleChange} />
                                    <Password name="password" feedback={false} placeholder="Password" onChange={handleChange} />
                                    <Button type="submit" onClick={() => handleSubmit} label="LOGIN" />

                                    {/* <button className="p-link forget-password">forget password?</button> */}
                                </div>
                                <div className="login-footer">{/* <h4>{new Date().getFullYear()}</h4> */}</div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};
