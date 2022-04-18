import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    lastName: Yup.string().min(3).required('Veuillez saisir un nom'),
    firstName: Yup.string().min(3).required('Veuillez saisir un prénom'),
    email: Yup.string().email('Email incorrect').required('Veuillez saisir un email'),
    feedBackTypeId: Yup.string().required('Veuillez choisir un motif'),
    text: Yup.string().min(3).required('Veuillez saisir un message')
});

export default LoginSchema;