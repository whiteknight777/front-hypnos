import * as Yup from 'yup';

const dateRegex =/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

const BookingSchema = Yup.object().shape({
    startDate: Yup.string()
    .matches(dateRegex, "Veuillez respecter le format DD/MM/YYYY")
    .required('Veuillez saisir une date de départ'),
    endDate: Yup.string()
    .matches(dateRegex, "Veuillez respecter le format DD/MM/YYYY")
    .required('Veuillez saisir une date de fin'),
});

export default BookingSchema;