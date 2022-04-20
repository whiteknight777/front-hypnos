import * as Yup from 'yup';

const RoomSchema = Yup.object().shape({
    title: Yup.string().min(3).required('Veuillez saisir un nom'),
    description: Yup.string().min(3).required('Veuillez saisir un prénom'),
    price: Yup.string().required('Veuillez saisir un prénom'),
    isDeleted: Yup.boolean(),
});

export default RoomSchema;