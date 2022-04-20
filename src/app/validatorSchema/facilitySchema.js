import * as Yup from 'yup';

const FacilitySchema = Yup.object().shape({
    name: Yup.string().min(3).required('Veuillez saisir un nom'),
    city: Yup.string().min(3).required('Veuillez saisir une ville'),
    address: Yup.string().required('Veuillez saisir une adresse'),
    description: Yup.string().required('Veuillez saisir une description'),
    isDeleted: Yup.boolean()
});

export default FacilitySchema;