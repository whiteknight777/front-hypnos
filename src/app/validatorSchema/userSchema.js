import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
    lastName: Yup.string().min(3).required('Veuillez saisir un nom'),
    firstName: Yup.string().min(3).required('Veuillez saisir un prénom'),
    email: Yup.string().email('Email incorrect').required('Veuillez saisir un email'),
});

export default UserSchema;