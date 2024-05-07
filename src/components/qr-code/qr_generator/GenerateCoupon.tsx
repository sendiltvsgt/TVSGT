import { yupResolver } from '@hookform/resolvers/yup';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomButton from '../../common/CustomButton';
import { postApiData } from '../../../common/DataService';
import { GENERATE_COUPON } from '../../../config/api.config';

interface Props {
    batchId: string;
    setIsGenCoupon: React.Dispatch<React.SetStateAction<boolean>>;
    setCouponsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
    couponsRefetch: boolean;
}
interface IGenerateCoupon {
    batchId?: string;
    couponsCount: number;
}
const schema = yup.object().shape({
    batchId: yup.string(),
    couponsCount: yup.number().required(' No of coupons is required.')
});
const GenerateCoupon = (props: Props) => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<IGenerateCoupon>({ resolver: yupResolver(schema), defaultValues: { batchId: props.batchId } });

    const onSumbit = async (data: IGenerateCoupon) => {
        const res = await postApiData<{ success: boolean }>(GENERATE_COUPON, data);
        if (res.data.success) {
            reset();
            props.setCouponsRefetch(!props.couponsRefetch);
            props.setIsGenCoupon(false);
        }
    };
    return (
        <div className=" w-100 h-100 rounded-4 d-flex  justify-content-center align-items-center">
            <form className="w-75 h-100 p-fluid d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit(onSumbit)}>
                <Controller
                    name="batchId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="w-100 d-flex flex-column ">
                            <span className="mb-2 text-xl font-semibold">Batch ID</span>
                            <span className="p-float-label">
                                <InputText placeholder="Batch ID" {...field} className={`w-100 ${classNames({ 'p-invalid': fieldState.error })}`} disabled={true} />
                            </span>
                        </div>
                    )}
                />
                <Controller
                    name="couponsCount"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="mt-4 w-100 d-flex flex-column">
                            <span className="mb-2 text-xl font-semibold">
                            No. of coupons <span className="text-danger">*</span>
                            </span>
                            <span className="p-float-label">
                                <InputNumber
                                    placeholder="No. of coupons"
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                    }}
                                    onValueChange={(e) => field.onChange(e)}
                                    useGrouping={false}
                                    className="w-100"
                                    inputClassName={`w-100 ${classNames({ 'p-invalid': fieldState.error })}`}
                                />
                                {errors.couponsCount && <span className="ms-2 text-danger"> {errors.couponsCount.message}</span>}
                            </span>
                        </div>
                    )}
                />
                <div className="mt-5 w-100 d-flex justify-content-center ">
                    <CustomButton className="w-25 " minWidth={180} type="submit" label="Save" />
                </div>
            </form>
        </div>
    );
};

export default GenerateCoupon;
