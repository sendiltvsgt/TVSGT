import React, { useEffect, useState } from 'react';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import { ManufacturerDropdownHook, ProductSkuDropdownHook } from '../../general/GeneralComponents';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'primereact/utils';
import { ProductSku } from '../../../entities/ProductSkuEntity';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { FURL_QR_CODE_BATCH } from '../../../config/route.config';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { postApiData } from '../../../common/DataService';
import { COUPAN_CREATE_BATCH } from '../../../config/api.config';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IBatchDetails } from '../../../models/coupon';

interface NewBatch {
    cashback: number;
    product: any;
}
const validationschema = yup.object().shape({
    manufacturer: yup.object<Manufacturer>().required('Manufacturer is a required.'),
    product: yup.object<ProductSku>().required('Product is a required.'),
    cashback: yup
        .string()
        .required('Incentive Amount is a required')
        .matches(/^[0-9]+$/, 'Incentive Amount must be number')
});
const title = 'Batch';

const startContent = (
    <React.Fragment>
        <span className="text-2xl font-bold">{title} - Creation</span>
    </React.Fragment>
);

const endContent = (
    <React.Fragment>
        <Link to={FURL_QR_CODE_BATCH}>
            <Button type="button" className="p-button-success" label="Back to list" />
        </Link>
    </React.Fragment>
);

const Newbatch = () => {
    const navigate = useNavigate();

    const [manufacturer, setManufacturer] = useState<number>(0);
    const [isVisibel, setIsVisible] = useState<boolean>(false);
    const [batchdata, setBatchData] = useState<IBatchDetails>({} as IBatchDetails);
    const storeLoginUser = useSelector((state: RootState) => state.loginUser.user);

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(validationschema)
    });

    // const onSumbit = async (data: any) => {
    //     const response = await postApiData<NewBatch>(COUPAN_CREATE_BATCH, data);
    //     if (response.success === true) {
    //         setBatchData(response.data.data);
    //         setManufacturer(0);
    //         setIsVisible(true);
    //         reset();
    //     }
    // };
    const onSubmit = async (data: any) => {
        const response = await postApiData<{ data: IBatchDetails; success: boolean }>(COUPAN_CREATE_BATCH, data);
        setBatchData(response.data.data);
        setManufacturer(0);
        setIsVisible(true);
        reset();
    };

    const onHide = () => {
        setIsVisible(false);
    };

    const handelNavigate = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (storeLoginUser?.manufacturer) {
            setValue('manufacturer', storeLoginUser.manufacturer);
            setManufacturer(storeLoginUser.manufacturer.id);
        }
        setValue('cashback', '25');
    }, []);

    return (
        <div className="grid p-fluid">
            <div className="grid p-fluid w-100">
                <div className="card w-100 ">
                    <Toolbar left={startContent} right={endContent} />

                    <form className=" " autoComplete="off" style={{ paddingTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                        <div className=" pl-4 grid ">
                            <Controller
                                name="manufacturer"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <span className="p-fluid col-4">
                                            <h5>
                                                Manufacturer <span className="text-danger">*</span>
                                            </h5>
                                            <span className="p-float-label">
                                                <ManufacturerDropdownHook
                                                    id={field.name}
                                                    value={field.value}
                                                    name="manufacturer"
                                                    optionLabel="label"
                                                    placeholder="Select a Manufacturer"
                                                    // options={Coupons}
                                                    disabled
                                                    focusInputRef={field.ref}
                                                    onChange={(e) => {
                                                        field.onChange(e.value);
                                                        setManufacturer(e.value.id);
                                                    }}
                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                    autofocus="autofocus"
                                                />
                                                {fieldState.error && <span className="ms-2 text-danger"> {fieldState.error.message}</span>}
                                            </span>
                                        </span>
                                    </>
                                )}
                            />
                            <Controller
                                name="product"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <span className="p-fluid col-4">
                                            <h5>
                                                Product <span className="text-danger">*</span>
                                            </h5>
                                            <span className="p-float-label">
                                                <ProductSkuDropdownHook
                                                    id={field.name}
                                                    value={field.value}
                                                    name="product"
                                                    optionLabel="label"
                                                    placeholder="Select a Product"
                                                    manfacturerId={manufacturer}
                                                    disabled={!!manufacturer}
                                                    // options={Coupons}
                                                    focusInputRef={field.ref}
                                                    onChange={(e) => {
                                                        field.onChange(e.value);
                                                    }}
                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                />
                                                {fieldState.error && <span className="ms-2 text-danger"> {fieldState.error.message}</span>}
                                            </span>
                                        </span>
                                    </>
                                )}
                            />

                            <Controller
                                name="cashback"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <span className="p-fluid col-4">
                                            <h5>
                                                Incentive Amount <span className="text-danger">*</span>
                                            </h5>
                                            <span className="p-float-label">
                                                <InputNumber
                                                    placeholder="Incentive Amount "
                                                    id={field.name}
                                                    inputRef={field.ref}
                                                    onBlur={field.onBlur}
                                                    onChange={(e) => {
                                                        field.onChange(e.value);
                                                    }}
                                                    value={field.value ? Number(field.value) : 0}
                                                    disabled
                                                    onValueChange={(e) => field.onChange(e)}
                                                    useGrouping={false}
                                                    className="w-100"
                                                    inputClassName={`w-100 ${classNames({ 'p-invalid': fieldState.error })}`}
                                                />
                                                {fieldState.error && <span className="ms-2 text-danger"> {fieldState.error.message}</span>}
                                            </span>
                                        </span>
                                    </>
                                )}
                            />

                            <span className=" grid p-fluid col-4 col-offset-4 ">
                                <Button type="submit" className="mt-6 mb-3 p-button-primary sm" label="Save" />
                            </span>
                        </div>
                    </form>
                </div>
                <Dialog header="Batch Details" showHeader={false} visible={isVisibel} onHide={onHide} modal className="w-5">
                    <div className="my-5 ">
                        <span className="text-xl text-secondary font-semibold ">Batch Details</span>
                    </div>
                    <div className="flex flex-column w-full gap-4">
                        <div className="flex  w-full">
                            <div className="w-5">Batch ID</div>
                            <div className="w-5"> : {batchdata?.id} </div>
                        </div>
                        <div className="flex  w-full">
                            <div className="w-5">Product Name</div>
                            <div className="w-7"> : {batchdata?.product?.name} </div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-5">Product Code </div>
                            <div className="w-5"> : {batchdata?.product?.code}</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-5">Scan Incentive Amount</div>
                            <div className="w-5"> : {batchdata?.cashback}</div>
                        </div>

                        <div className="flex w-full">
                            <div className="w-5"> Batch Code</div>
                            <div className="w-5"> : {batchdata?.batchCode} </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', placeItems: 'center' }}>
                        <Button type="submit" className="mt-6 mb-2 p-button-primary  px-4" label="OK" onClick={handelNavigate} />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Newbatch;
