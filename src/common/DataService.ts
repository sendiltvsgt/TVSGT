import axios, { AxiosError, ResponseType } from 'axios';
import { BASE_API_URL } from '../config/api.config';
import { setNavigate } from '../redux/navigate.slice';
import { store } from '../redux/store';
import { setToast } from '../redux/toast.slice';
import { ApiPostResponseDataDto, ApiResponseDataDto } from './common.dto';

export const toastRestrictedUrl = ['/authentication/login'];

export const reduxAuthErrorStore = (errorCode?: number) => {
    if (errorCode && errorCode === 401) {
        store.dispatch(setToast({ severity: 'error', summary: 'Error', detail: 'Invalid username or password !', life: 3000 }));
    } else {
        store.dispatch(setToast({ severity: 'error', summary: 'Error', detail: 'You are not authorized to access this page !', life: 3000 }));
    }
    store.dispatch(setNavigate({ to: '/logout', from: '' }));
};

export const DataLayerAxiosErrorHandling = (err: AxiosError) => {
    let error = err.toJSON() as AxiosError;
    if (error.status === 403 || error.status === 401) {
        reduxAuthErrorStore(error.status);
    }
};

export const getGeneralHeaders = (url?: string) => {
    const token = localStorage.getItem('validatetoken');
    if (!token) {
        if (url) {
            //Whitelist for login
            if (url === '/authentication/login') {
                return {};
            }
        }
        reduxAuthErrorStore();
    }

    return {
        Authorization: 'Bearer ' + token
    };
};

export async function getApiData<T>(url: string, params?: { [key: string]: string | null }): Promise<ApiResponseDataDto<T>> {
    try {
        const { data } = await axios.get<ApiResponseDataDto<T>>(BASE_API_URL + url, { params: params, headers: getGeneralHeaders() });

        if (data.count === undefined) {
            //For all data
            let result: ApiResponseDataDto<T> = {
                count: 0,
                data: data as T
            };
            return result;
        } else {
            //For list data
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            DataLayerAxiosErrorHandling(error);
        } else {
            console.log(error);
        }
        console.log(error);
        return null as unknown as ApiResponseDataDto<T>;
    }
}

export async function getApiDataDownload<T>(url: string, params?: { [key: string]: string | number }): Promise<void> {
    try {
        const { data } = await axios.get<Blob | MediaSource>(BASE_API_URL + url, { params: params, headers: getGeneralHeaders(), responseType: 'blob' });

        // If file download
        // create file link in browser's memory
        const href = URL.createObjectURL(data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'report.csv');
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            DataLayerAxiosErrorHandling(error);
        } else {
            console.log(error);
        }
        console.log(error);
    }
}

export async function postApiData<T>(url: string, postData: any): Promise<ApiPostResponseDataDto<T>> {
    try {
        const { data } = await axios.post<T>(BASE_API_URL + url, { ...postData }, { headers: getGeneralHeaders(url) });
        let result: ApiPostResponseDataDto<T> = {
            data: data,
            success: true
        };

        //Redux store dispatch from Js function
        if (!toastRestrictedUrl.includes(url)) {
            store.dispatch(setToast({ severity: 'success', summary: 'Success', detail: 'Data has been saved successfully !', life: 3000 }));
        }
        return result;
    } catch (error) {
        const axiosError = error as Error | AxiosError;
        if (axios.isAxiosError(axiosError)) {
            if (axiosError.status !== 401 && axiosError.status !== 403) {
                store.dispatch(
                    setToast({
                        severity: 'error',
                        summary: (axiosError.response?.data.error ? axiosError.response?.data.error : axiosError.response?.data.message) + ' (#' + axiosError.response?.data.statusCode + ')',
                        detail: axiosError.response?.data.message,
                        life: 3000
                    })
                );
            }
            DataLayerAxiosErrorHandling(axiosError);
        }
        throw error;
    }
}

export async function putApiData<T>(url: string, id: number, postData: any): Promise<ApiPostResponseDataDto<T>> {
    try {
        const { data } = await axios.put<T>(BASE_API_URL + url + '/' + id, { ...postData }, { headers: getGeneralHeaders(url) });
        let result: ApiPostResponseDataDto<T> = {
            data: data,
            success: true
        };

        //Redux store dispatch from Js function
        store.dispatch(setToast({ severity: 'success', summary: 'Success', detail: 'Data has been saved successfully !', life: 3000 }));

        return result;
    } catch (error) {
        const axiosError = error as Error | AxiosError;
        if (axios.isAxiosError(axiosError)) {
            store.dispatch(setToast({ severity: 'error', summary: axiosError.response?.data.error + ' (#' + axiosError.response?.data.statusCode + ')', detail: axiosError.response?.data.message, life: 3000 }));
            DataLayerAxiosErrorHandling(axiosError);
        }
        throw error;
    }
}

export async function deleteApiData<T>(url: string, id: number): Promise<ApiPostResponseDataDto<T>> {
    try {
        const { data } = await axios.delete<ApiPostResponseDataDto<T>>(BASE_API_URL + url + '/' + id);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
