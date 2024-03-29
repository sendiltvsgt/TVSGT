import { InputText } from 'primereact/inputtext';
import React, { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    className: string;
    name: string;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    errMsg?: string;
};

export const ErrorMessage = (errMsg: string) => <span className="text-danger"> {errMsg}</span>;

const InputComp = (props: Props, ref: any) => {
    return (
        <div className="p-float-label w-100">
            <InputText className={props.className} id={props.name} name={props.name} onChange={props.onChange} onBlur={props.onBlur} ref={ref} />
            <label className="fs-md" htmlFor={props.name}>
                {props.label}
            </label>
            {props.errMsg && <span className="text-danger"> {props.errMsg}</span>}
        </div>
    );
};
const CustomInput = React.forwardRef(InputComp);
export default CustomInput;
