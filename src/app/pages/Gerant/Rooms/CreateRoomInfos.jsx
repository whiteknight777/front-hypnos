import React from 'react';
import {
    Input,
    Divider,
    Switch,
    Alert,
    Form,
    Spin,
} from 'antd';
import RoomSchema from '../../../validatorSchema/roomSchema';
import { useFormik } from 'formik';
import { AddRoom } from '../../../../utils/requests/rooms';
import '../main.scss';

const CreateRoomInfos = ({room, facility}) => {
    const [isSuccess, setSuccess] = React.useState(undefined);
    const [form] = Form.useForm();
    const initialValues = {
        title: "",
        description: "",
        price: "",
        isDeleted: false
    }
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RoomSchema,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
            setSubmitting(true)
            console.log(values)
            values.price = parseFloat(values.price)
            values.facilityId = facility.id
            try {
                const response = await AddRoom(values)
                const {data} = response;
                console.log(data)
                setSuccess(true)
                setStatus("Mise à jours effectuée")
            } catch (error) {
                console.error(error.message)
                setSuccess(false)
                setStatus(error.response?.data?.error || error.message)
            }finally{
                setSubmitting(false)
            }
        }
    });

    React.useState(() => {
    }, [formik.values, initialValues])

    return (
        <section className="edit-content">
                {formik.status && (
                    <Alert
                        className="alert-box"
                        message={isSuccess === true ? "Succès" : "Erreur"}
                        description={formik.status}
                        type={isSuccess === true ? "success" : "error"}
                        closable
                        onClose={() => {
                            formik.setStatus(null)
                        }}
                        showIcon
                    />
                )}
                <Divider />
                <Form
                className="form-horizontal"
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
                >
                    <Form.Item label="Nom">
                        <Input 
                            placeholder="Nom" 
                            name="title"
                            defaultValue={formik.values.title}
                            {...formik.getFieldProps('title')}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.title}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Prix">
                        <Input placeholder="Prix" name="price"
                            {...formik.getFieldProps('price')}/>
                        {formik.touched.price && formik.errors.price ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.price}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Statut">
                        <Switch 
                            name="isDeleted"
                            checkedChildren="Inactif" unCheckedChildren="Actif"
                            defaultChecked={formik?.values?.isDeleted}
                            onChange={(e, checked) => formik.setValues('isDeleted', checked)}
                            {...formik.getFieldProps('isDeleted')}
                        />
                        {formik.touched.isDeleted && formik.errors.isDeleted ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.isDeleted}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea rows={4} name="description"
                                {...formik.getFieldProps('description')}/>
                        {formik.touched.description && formik.errors.description ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.description}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item>
                        <button 
                        type="submit" 
                        className="submit-btn"
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                        >
                            Enregistrer
                            {formik.isSubmitting && <Spin className="loader" />}
                        </button>
                    </Form.Item>
                </Form>
            </section>
    )

}

export default CreateRoomInfos;