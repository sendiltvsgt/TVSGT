import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLoginToken } from '../common/LoginService';
import { store } from '../redux/store';
import { setToast } from '../redux/toast.slice';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        removeLoginToken();
        store.dispatch(setToast({severity: 'success', summary: 'Success', detail: 'Logged out successfully !', life: 3000}));
        navigate('/login');
    }, [navigate]);

    return (
        <>
            <center><p>Logging out ...</p></center>
        </>
    );
};
