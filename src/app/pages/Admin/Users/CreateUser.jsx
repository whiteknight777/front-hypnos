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
import UserSchema from '../../../validatorSchema/userSchema';
import { useFormik } from 'formik';
import { Register } from '../../../../utils/requests/users';
import '../main.scss';

const CreateUser = ({open, handleClose}) => {
    const [isSuccess, setSuccess] = React.useState(undefined);
    const [form] = Form.useForm();
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "CLIENT",
        isDeleted: false
    }
    const Roles = ["ADMIN", "GERANT", "CLIENT"]
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: UserSchema,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm, ...args }) => {
            setSubmitting(true)
            if(values.password === ""){
                delete values.password;
            }
            try {
                const response = await Register(values)
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
                            name="lastName"
                            defaultValue={formik.values.lastName}
                            {...formik.getFieldProps('lastName')}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.lastName}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Prénom(s)">
                        <Input placeholder="Prénom(s)" name="firstName"
                            {...formik.getFieldProps('firstName')}/>
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.firstName}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="Email" name="email"
                            {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.email}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Roles">
                        <select className="ant-input" 
                        name="role"
                        {...formik.getFieldProps('role')} 
                        >
                        <option value={""}>Selectionnez un role</option>
                        {Roles && Roles.map(item => (
                            <option key={`option-${item}`} value={item}>{item}</option>
                        ))}
                        </select>
                        {formik.touched.role && formik.errors.role ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.role}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Mot de passe">
                        <Input placeholder="Mot de passe" type="password" name="password"
                            {...formik.getFieldProps('password')}/>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.password}</div>
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Statut">
                        <Switch 
                            name="isDeleted"
                            checkedChildren="Inactif" unCheckedChildren="Actif"
                            defaultChecked={formik?.values?.isDeleted}
                            {...formik.getFieldProps('isDeleted')}
                        />
                        {formik.touched.isDeleted && formik.errors.isDeleted ? (
                            <div className="form-error">
                                <div className="help-block">{formik.errors.isDeleted}</div>
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

export default CreateUser;