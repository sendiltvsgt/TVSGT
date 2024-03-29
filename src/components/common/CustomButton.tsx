import { Button } from 'primereact/button';
import React from 'react';

type Props = {
    label: string;
    className: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    minWidth?: number;
};

const CustomButton = (props: Props) => {
    return <Button className={`${props.className} px-3 rounded-9 fs-md `} style={{ minWidth: props.minWidth, padding: 10 }} type="submit" onClick={props.onClick} label={props.label} />;
};

export default React.memo(CustomButton);
