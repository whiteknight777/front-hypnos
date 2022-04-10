import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email incorrect').required('Veuillez saisir un email'),
    password: Yup.string()
        .required('Veuillez saisir un mot de passe')
});

export default LoginSchema;