import * as Yup from 'yup';

export const initialValues = {
    phone:"",
    website_link:"",
    headquarters:"",
    industry:"",
    about:"",
    hr_name:"",
    hr_phone:"",
    hr_email:"",
    address:"",

}

export const ProfileValidationSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[1-9]\d{9}$/, 'Phone number must be exactly 10 digits and should not start with 0')
        .required('Required'),
    website_link: Yup.string()
        .url('Website link must be a valid URL format'),
    headquarters: Yup.string()
        .matches(/^[^\d]+$/, ' should not contain numbers')
        .required('Required'),
    industry: Yup.string()
        .matches(/^[^\d]+$/, ' should not contain numbers')
        .required('Required'),
    about: Yup.string()
        .min(20, 'About must be at least 20 characters')
        .max(200, 'About must be at most 200 characters')
        .required('Required'),
    hr_name: Yup.string()
        .min(3,'Too Short!')
        .matches(/^[A-Z][a-zA-Z]/,'First lettershould be capital')
        .max(30,'Too Long!'),
        
    hr_phone: Yup.string()
        .matches(/^[1-9]\d{9}$/, 'Phone number must be exactly 10 digits and should not start with 0'),
    hr_email: Yup.string()
        .email('Invalid email')
        .matches(/^[\w-\.]+@([\w-]+\.)+com$/, 'Invalid email'),
    address: Yup.string()
        .required('Required')
})
