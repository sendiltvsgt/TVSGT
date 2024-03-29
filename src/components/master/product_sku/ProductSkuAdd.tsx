import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Editor } from 'primereact/editor';
import { postApiData } from '../../../common/DataService';
import { useNavigate } from 'react-router-dom';
import { ProductSku } from '../../../entities/ProductSkuEntity';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import { VehicleModel } from '../../../entities/VehicleModelEntity';
import { PRODUCT_SKU_ADD_API } from '../../../config/api.config';
import { ManufacturerDropdown, TaxRateDropdown, VehicleModelDropdown, VehicleModelDropdownMultiSelect } from '../../general/GeneralComponents';
import { InputTextarea } from 'primereact/inputtextarea';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaxRate } from '../../../entities/TaxRateEntity';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required '),
    slug: yup.string().required('Slug is required'),
    code: yup.string().required('Code is required'),
    shortDescription: yup.string().required('Shortdescription is required'),
    specifications: yup.string().required('Specification is required'),
    hsnCode: yup.string().required('Hsn code is required'),
    boxContents: yup.string().required('Box content is required'),
    price: yup.string().required('Price is requitred'),
    vehicleModels: yup.array<VehicleModel>().required('Vechilemodel is required'),
    coupancode: yup.string().required('Coupan code is required'),
    manufacturer: yup.object<Manufacturer>().required('Manufacturer is required'),
    taxRate: yup.object<TaxRate>().required('Taxrate is required'),
    longDescription: yup.string().required('LongDescription is required')
});

const ProductSkuAdd = () => {
    const title = 'Product SKU';
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<ProductSku>({
        resolver: yupResolver(validationSchema)
    });

    console.log(errors, 'line193');

    const onSubmit =  async(data: ProductSku) => {
        console.log(data, 'OnSubmit work');
if (data.specifications) {
    data.specifications = JSON.parse(data.specifications.toString());
}
await postApiData<Partial<ProductSku>>(PRODUCT_SKU_ADD_API, data);
            navigate(-1);
        reset();
    };

    useEffect(() => {}, []);
    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Add</h3>

                    <form className="p-fluid" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <h5>Name</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Name" type="text" {...register('name', { required: 'name is required' })} />
                            {errors?.name && (
                                <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                    {' '}
                                    {errors.name.message}
                                </span>
                            )}
                        </span>
                        <h5>Slug</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Slug" {...register('slug', { required: 'Slug is required' })} type="text" />
                            {errors.slug && (
                                <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                    {errors.slug.message}
                                </span>
                            )}
                        </span>
                        <Controller
                            name="manufacturer"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <h5>Manufacturer</h5>
                                    <span className="p-float-label">
                                        <ManufacturerDropdown value={field.value} name="manufacturer" onChange={(e) => field.onChange(e.value)} />
                                        {fieldState.error && (
                                            <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                                {' '}
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </span>
                                </>
                            )}
                        />

                        <Controller
                            name="vehicleModels"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <h5>Vehicle Model</h5>
                                    <span className="p-float-label">
                                        <VehicleModelDropdownMultiSelect value={field.value} name="vehicleModels" onChange={(e) => field.onChange(e.value)} />
                                        {fieldState.error && (
                                            <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                                {' '}
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </span>
                                </>
                            )}
                        />

                        <h5>Code</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Code" {...register('code', { required: 'code is required' })} type="text" />
                            {errors.code && (
                                <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                    {' '}
                                    {errors.code.message}
                                </span>
                            )}
                        </span>

                        <h5>Short Description</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Short Description" {...register('shortDescription', { required: 'shortDescription is required' })} type="text" />
                            {errors?.shortDescription && (
                                <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                    {' '}
                                    {errors.shortDescription.message}
                                </span>
                            )}
                        </span>

                        
                        <Controller
                            name="longDescription"
                            control={control}
                            // rules={{ required: 'Content is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <h5>Long Description</h5>
                                    <span className="p-float-label">
                                        <Editor value={field.value} name="longDescription" onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '320px' }} />
                                        {fieldState.error && (
                                            <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                                {' '}
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </span>
                                </>
                            )}
                        />

                        <h5>Specification</h5>
                        <span className="p-float-label">
                            <InputTextarea placeholder="Specification" {...register('specifications', { required: 'specifications is required' })} />
                            {errors.specifications && <span style={{ color: 'red',  fontSize: '16px' }}> {errors.specifications.message}</span>}
                        </span>

                        <h5>HSN Code</h5>
                        <span className="p-float-label">
                            <InputText placeholder="HSN Code" type="text" {...register('hsnCode', { required: 'hsnCode is required' })} />
                            {errors?.hsnCode && <span style={{ color: 'red',  fontSize: '16px' }}> {errors.hsnCode.message}</span>}
                        </span>

                        <h5>Box Contents</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Box Contents" {...register('boxContents', { required: 'boxContent is required' })} type="text" />
                            {errors?.boxContents && <span style={{ color: 'red',  fontSize: '16px' }}> {errors.boxContents.message}</span>}
                        </span>

                        <Controller
                            name="taxRate"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <h5>Tax Rate</h5>
                                    <span className="p-float-label">
                                        <TaxRateDropdown value={field.value} name="taxRate" onChange={(e) => field.onChange(e.value)} />
                                        {fieldState.error && (
                                            <span className="ms-2 text-danger" style={{ color: 'red',  fontSize: '16px' }}>
                                                {' '}
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </span>
                                </>
                            )}
                        />

                        <h5>Price (INR)</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Price" type="text" {...register('price', { required: 'price is required' })} />
                            {errors?.price && <span style={{ color: 'red',  fontSize: '16px' }}> {errors.price.message}</span>}
                        </span>

                        <h5>Coupan code</h5>
                        <span className="p-float-label">
                            <InputText type="text" {...register('coupancode', { required: 'coupan code is required' })} />
                            {errors?.coupancode && <span style={{ color: 'red',  fontSize: '16px' }}> {errors.coupancode.message}</span>}
                        </span>

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type="submit" className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductSkuAdd;
