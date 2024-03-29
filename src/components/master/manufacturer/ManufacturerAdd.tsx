import React, { useState,useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { postApiData } from '../../../common/DataService';
import { useNavigate } from 'react-router-dom';
import { MANUFACTURER_ADD_API } from '../../../config/api.config';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import validation from './ManufacturerFormvalidation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ManufacturerAdd = () => {
    const title = 'Manufacturer';
    const navigate = useNavigate();

 const {
    register,handleSubmit,formState:{errors} ,reset 
 } = useForm<Manufacturer>({
    resolver:yupResolver(validation)
 })

 const onSubmit = async (data:Manufacturer) =>{
    console.log(data,"onsubmitvalue");
    await postApiData<Partial<Manufacturer>>(MANUFACTURER_ADD_API, data);
            navigate(-1);
    reset()
 }

    useEffect(() => {}, []);

    return (
        <div className="grid p-fluid">
            <div className="col-12 col-offset-2 md:col-8">
                <div className="card">
                    <h3>{title} - Add</h3>

                    <form  onSubmit={handleSubmit(onSubmit)} autoComplete='off' className="p-fluid">
                        <h5>Name</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Name" type="text" {...register('name',{required:"Name is required"})}/>
                             { errors.name &&<p style={{color:"red", fontSize: "16px"}}>{errors.name.message}</p>}
                        </span>
                        

                        <h5>Head Office Address</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Head Office Address" type="text"{...register('hoAddress',{required:"HoAddress is required"})} />
                            {errors.hoAddress &&<p className='ms-2 text-danger' style={{color:"red", fontSize: "16px"}}>{errors.hoAddress.message}</p>}
                        </span>

                        <h5>Head Office City</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Head Office City"  type="text" {...register('hoCity',{required:"HoCity is required"})} />
                            
                            {errors.hoCity && <span className='ms-2 text-danger' style={{color:"red", fontSize: "16px"}}>{errors.hoCity.message}</span> }

                        </span>

                        <h5>Head Office State</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Head Office State"  type="text" {...register('hoState',{required:"HoState is required"})}/>
                            {errors.hoState && <p style={{color:"red", fontSize: "16px"}}>{errors.hoState.message}</p> }
                        </span>

                        <h5>Head Office Zipcode</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Head Office Zipcode"  type="text"{...register('hoZip',{required:"HoZip is required"})} />
                            { errors.hoZip && <p style={{color:"red", fontSize: "16px"}}>{errors.hoZip.message}</p> }
                        </span>

                        <h5>Email</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Email"  type="text" {...register('email',{required:"Email is required"})} />
                            {errors.email && <p style={{color:"red", fontSize: "16px"}}>{errors.email.message}</p> }
                        </span>

                        <h5>Phone</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Phone"  type="text" {...register('phone',{required:"Phonenumber is required"})} />
                            {errors.phone  &&  <p style={{color:"red", fontSize: "16px"}}>{errors.phone.message}</p> }
                        </span>

                        <h5>Secondary Phone</h5>
                        <span className="p-float-label">
                            <InputText  placeholder="Secondary Phone"  type="text" {...register('secondaryPhone',{required:"Secondary Phonenumber is required"})} />
                            {errors.secondaryPhone &&  <p style={{color:"red", fontSize: "16px"}}>{errors.secondaryPhone.message}</p> }
                        </span>

                        <h5>Code</h5>
                        <span className="p-float-label">
                            <InputText                                
                                type="text"
                                {...register('code',{required:"Code only in 3 digit is required"})}
                            />
                            {errors.code &&  <p style={{color:"red", fontSize: "16px"}}>{errors.code.message}</p> }
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

export default ManufacturerAdd;
