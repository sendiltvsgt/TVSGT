export type HandleFormChange = {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
};

export type FormikSetFieldValue = <T = any>(field: string, value: T, shouldValidate?: boolean) => void;

export type LoginDto =  {
    username: string;
    password: string;
}