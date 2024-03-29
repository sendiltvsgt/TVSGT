import * as Yup from 'yup';


const validation:any = Yup.object().shape({

    name: Yup.string()
    .required('Name is required'),
    hoAddress: Yup.string()
    .required('Head Office Address is required'),
    hoCity: Yup.string()
    .required('Head Office City is required'),
    hoState: Yup.string()
    .required('Head Office State is required'),
    hoZip: Yup.string()
    .required('Head Office Zipcode is required'),
    email:Yup.string().email("give valid email")
    .required('Email is required'),
    phone:Yup.string()
    .required('Phonenumber is required').length(10),
    secondaryPhone:Yup.string()
    .required('SecondaryPhonenumber is required').length(10),
    code: Yup.string()
    .required('Code is required').length(3)
}) 



export default validation;