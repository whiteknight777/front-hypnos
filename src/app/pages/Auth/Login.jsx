import React from 'react';
import { Alert, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { LoginRequest } from '../../../utils/requests/auth';
import { UserContext, ActionTypes } from '../../../contexts/userProvider';
import LoginSchema from '../../validatorSchema/loginSchema'
import './Login.scss'

function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const initialValues = {
        email: 'admin@demo.com',
        password: ''
    }
    const { dispatch } = React.useContext(UserContext);

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const {email, password} = values
            setSubmitting(true)
            try {
                const response = await LoginRequest({email, password})
                const {data} = response;
                console.log(response.data)
                dispatch({ type: ActionTypes.login, accessToken: data.accessToken });
                navigate('/', { replace: true });
            } catch (error) {
                console.error(error.message)
                setStatus(error.response?.data?.error || error.message)
            }finally{
                setSubmitting(false)
            }
        }
    });

    return (
    <div className="login-content">
        <h2 className="title">Espace de connexion</h2>
        <div className="form-container">
            {formik.status && (
                <Alert
                    className="alert-box"
                    message="Erreur"
                    description={formik.status}
                    type="error"
                    showIcon
                />
            )}
            <Form
            className="form-horizontal"
            layout={'vertical'}
            form={form}
            >
                <Form.Item label="Email">
                    <Input 
                        placeholder="moi@societe.com"
                        name="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.email}</div>
                        </div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mot de passe">
                    <Input 
                        placeholder="****" 
                        type="password"
                        name="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.password}</div>
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
                        Connexion
                        {formik.isSubmitting && <Spin className="loader" />}
                    </button>
                </Form.Item>
            </Form>
        </div>
    </div>
);
}

export default Login