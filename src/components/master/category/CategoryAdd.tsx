import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { postApiData } from '../../../common/DataService';
import { CATEGORY_ADD_API } from '../../../config/api.config';
import { Category } from '../../../entities/CategoryEntity';
import { useNavigate } from 'react-router-dom';
import { CategoryDropdown } from '../../general/GeneralComponents';

const CategoryAdd = () => {

    const title = "Category";
    const navigate = useNavigate();

    const formik = useFormik<Partial<Category>>({
        initialValues: {
            name: '',
            shortDescription: '',
            longDescription: '',
            sort: 1,
            parentCategory: {} as Category,
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: (data) => {
            (async () => {
                await postApiData<Partial<Category>>(CATEGORY_ADD_API, data);
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

                        <h5>Short Description</h5>
                        <span className="p-float-label">
                            <InputText placeholder="Short description" name='shortDescription' type="text" value={formik.values.shortDescription} onChange={formik.handleChange} />
                        </span>

                        <h5>Long Description</h5>
                        <InputTextarea name='longDescription' value={formik.values.longDescription} onChange={formik.handleChange} placeholder="Long description" autoResize />

                        <h5>Sort</h5>
                        <span className="p-float-label">
                            <InputNumber placeholder="Sort" name='sort' showButtons value={formik.values.sort} onChange={formik.handleChange} />
                        </span>

                        <h5>Parent Category</h5>
                        <CategoryDropdown name="parentCategory" value={formik.values.parentCategory} onChange={formik.handleChange} />

                        <span className="grid p-fluid col-4 col-offset-4">
                            <Button type='submit' className="mt-6 mb-2 p-button-primary sm" label="Save" />
                        </span>       
                    </form>             
                </div>
            </div>
        </div>
    );
};

export default CategoryAdd;