import { Password } from 'primereact/password';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    register: UseFormRegister<any>;
    className: string;
    name: string;
    label: string;
    feedback?: boolean;
    // onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    // value?: string | number | readonly string[];
    errMsg?: string;
};

const PasswordComp = (props: Props, ref: any) => {
    return (
        <div className="p-float-label w-100">
            <Password className={props.className} id={props.name} {...props.register(props.name)} inputRef={ref} inputClassName="w-100 fs-md" feedback={props.feedback} />
            <label className="fs-md" htmlFor={props.name}>
                {props.label}
            </label>
            {props.errMsg && <span className="text-danger"> {props.errMsg}</span>}
        </div>
    );
};

const CustomPassword = React.forwardRef(PasswordComp);
export default React.memo(CustomPassword);
