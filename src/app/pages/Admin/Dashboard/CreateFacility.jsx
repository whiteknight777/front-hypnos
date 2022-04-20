import React from 'react';
import {
    Input,
    Divider,
    Switch,
    Alert,
    Form,
    Spin,
    Drawer
} from 'antd';
import FacilitySchema from '../../../validatorSchema/facilitySchema';
import { useFormik } from 'formik';
import { AddFacility } from '../../../../utils/requests/facilities';
import '../main.scss';

const CreateFacility = ({open, users, handleClose}) => {
    const [isSuccess, setSuccess] = React.useState(undefined);
    const [form] = Form.useForm();
    const initialValues = {
        name: "",
        city: "",
        address: "",
        description: "",
        isDeleted: "",
        gerantId: "",
    }
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FacilitySchema,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm, ...args }) => {
            setSubmitting(true)
            values.gerantId = values.gerantId !== "" ? values.gerantId : null;
            try {
                const response = await AddFacility(values)
                const {data} = response;
                console.log(data)
                setSuccess(true)
                setStatus("Enregistrement effectué !")
                console.log(args)
                setTimeout(() => {
                  resetForm()
                }, 4000)
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
        <Drawer
            id="create"
            title={`Création d'un établissement`}
            placement={"right"}
            width={700}
            onClose={() => {
                handleClose()
                formik.resetForm()
            }}
            visible={open}
        >
            <section className="create-content">
                
                {formik.status && (
                    <Alert
                        className="alert-box"
                        message={isSuccess === true ? "Succès" : "Erreur"}
                        description={formik.status}
                        type={isSuccess === true ? "success" : "error"}
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
                            name="name"
                            defaultValue={formik.values.name}
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.name}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Ville">
                        <Input placeholder="Ville" name="city"
                            {...formik.getFieldProps('city')}/>
                        {formik.touched.city && formik.errors.city ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.city}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Adresse">
                        <Input placeholder="Adresse" name="address"
                            {...formik.getFieldProps('address')}/>
                        {formik.touched.address && formik.errors.address ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.address}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Statut">
                        <Switch 
                            name="isDeleted"
                            checkedChildren="Inactif" unCheckedChildren="Actif"
                            defaultChecked={formik.values?.isDeleted}
                            {...formik.getFieldProps('isDeleted')}
                        />
                        {formik.touched.isDeleted && formik.errors.isDeleted ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.isDeleted}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Gérant">
                        <select className="ant-input" 
                        name="gerantId"
                        {...formik.getFieldProps('gerantId')} 
                        >
                        <option value={""}>Selectionnez un gérant</option>
                        {users && users.map(item => (
                            <option key={`option-${item.id}`} value={item.id}>{`${item.lastName} ${item.firstName}`}</option>
                        ))}
                        </select>
                        {formik.touched.gerantId && formik.errors.gerantId ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.gerantId}</div>
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
        </Drawer>
    )

}

export default CreateFacility;