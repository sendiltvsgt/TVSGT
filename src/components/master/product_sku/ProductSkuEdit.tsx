import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Editor } from 'primereact/editor';
import { getApiData, putApiData } from '../../../common/DataService';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductSku } from '../../../entities/ProductSkuEntity';
import { PRODUCT_SKU_EDIT_API, PRODUCT_SKU_VIEW_API } from '../../../config/api.config';
import { ManufacturerDropdown, TaxRateDropdown, VehicleModelDropdown, VehicleModelDropdownMultiSelect } from '../../general/GeneralComponents';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import { VehicleModel } from '../../../entities/VehicleModelEntity';

const ProductSkuEdit = () => {
    const {id} = useParams();
    const [productSku, setProductSku] = useState<ProductSku>(
        {
            name: "",
            code: "",
            shortDescription: "",
            longDescription: "",
            specifications: [],
            hsnCode: "",
            price: 0,
            manufacturer: {} as Manufacturer,
            vehicleModels: [] as VehicleModel[],
            boxContents: "",
        } as ProductSku
      );

    const title = "Product SKU";
    const navigate = useNavigate();

    const formik = useFormik<Partial<ProductSku>>({
        initialValues: productSku,
        enableReinitialize: true,
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                if(productSku && productSku.id){
                    await putApiData<Partial<ProductSku>>(PRODUCT_SKU_EDIT_API, productSku.id, data);
                    navigate(-1);
                }
            }
            )();
            formik.resetForm();
        }
    });

    useEffect(()=>{
        (async () => {
            const result = await getApiData<ProductSku>(PRODUCT_SKU_VIEW_API + "/" + id);
            if (result.data){
                setProductSku(result.data);
            }
        })();
    },[id]);

    return (
        (!productSku)?
            <React.Fragment>
                <Skeleton className="mb-2"></Skeleton>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
            </React.Fragment>
            :
            <div className="grid p-fluid">
                <div className="col-12 col-offset-2 md:col-8">
                    <div className="card">
                        <h3>{title} - Edit</h3>

                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <h5>Name</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Name" name='name' type="text" value={formik.values.name} onChange={formik.handleChange} />
                            </span>

                            <h5>Slug</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Slug" name='slug' type="text" value={formik.values.slug} onChange={formik.handleChange} />
                            </span>

                            <h5>Manufacturer</h5>
                            <ManufacturerDropdown name="manufacturer" value={formik.values.manufacturer} onChange={formik.handleChange} />

                            <h5>Vehicle Model</h5>
                            <VehicleModelDropdownMultiSelect name="vehicleModels" value={formik.values.vehicleModels} onChange={formik.handleChange} />

                            <h5>Code</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Code" name='code' type="text" value={formik.values.code} onChange={formik.handleChange} />
                            </span>

                            <h5>Short Description</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Short Description" name='shortDescription' type="text" value={formik.values.shortDescription} onChange={formik.handleChange} />
                            </span>

                            <h5>Long Description</h5>
                            <span className="p-float-label">
                                <Editor value={formik.values.longDescription} name='longDescription' onTextChange={(e) => formik.setFieldValue('longDescription', e.htmlValue)} style={{ height: '320px' }} />
                            </span>

                            <h5>Specification</h5>
                            <span className="p-float-label">
                                <InputTextarea required placeholder="Specification" name='specifications' rows={20}
                                    value={JSON.stringify(formik.values.specifications,null,4)}
                                    onChange={(e)=>formik.setFieldValue('specifications',JSON.parse(e.target.value))} />
                            </span>

                            <h5>HSN Code</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="HSN Code" name='hsnCode' type="text" value={formik.values.hsnCode} onChange={formik.handleChange} />
                            </span>

                            <h5>Box Contents</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Box Contents" name='boxContents' type="text" value={formik.values.boxContents} onChange={formik.handleChange} />
                            </span>

                            <h5>Tax Rate</h5>
                            <span className="p-float-label">
                                <TaxRateDropdown name="taxRate" value={formik.values.taxRate} onChange={formik.handleChange} />
                            </span>

                            <h5>Price (INR)</h5>
                            <span className="p-float-label">
                                <InputText required placeholder="Price" name='price' type="text" value={formik.values.price} onChange={formik.handleChange} />
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

export default ProductSkuEdit;