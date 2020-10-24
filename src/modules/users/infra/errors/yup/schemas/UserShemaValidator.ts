import * as Yup from 'yup';

import IUserShemaValidatorDTO from '../../../../dtos/IUserShemaValidatorDTO';

const UserShemaValidator = Yup.object().shape<IUserShemaValidatorDTO>({
    first_name: Yup.string().required('first_name is required'),
    second_name: Yup.string().required('second_name is required'),
    cpf: Yup.string().required('cpf is required'),
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('password is required'),
    confirm_password: Yup.string().required('confirm_password is required'),
    phone: Yup.string().required('phone is required'),
    cep: Yup.string().required('cep is required'),
    address: Yup.string().required('address is required'),
    number: Yup.number().required('number is required'),
    complement: Yup.string(),
    state: Yup.string().required('state is required'),
    city: Yup.string().required('city is required'),
});

export default UserShemaValidator;
