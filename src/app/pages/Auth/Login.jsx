import React from 'react';
import { Alert, Form, Input, Button, Spin } from 'antd';
import {
    useMutation
} from 'react-query';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { LoginRequest } from '../../../utils/requests/auth';
import LoginSchema from '../../validatorSchema/loginSchema'
import './Login.scss'

function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const _isMounted = React.useRef(false);
    const initialValues = {
        email: 'admin@demo.com',
        password: ''
    }

    // Mutations
    const mutation = useMutation(LoginRequest)

    React.useEffect(() => () => { // ComponentWillUnmount in Class Component
        _isMounted.current = true;
    }
    // eslint-disable-next-line
    , []);


    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const {email, password} = values
            try {
                const data = await mutation.mutateAsync({email, password})
                console.log(data)
                navigate('/', { replace: true });
              } catch (error) {
                console.error(error.response)
              } finally {
                console.log('done')
              }
        }
    });

    return (
    <div className="login-content">
        <h2 className="title">Espace de connexion</h2>
        <div className="form-container">
            {mutation.error && (
                <Alert
                    className="alert-box"
                    message="Erreur"
                    description={mutation.error.response?.data?.error || mutation.error.message}
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
                    <Button 
                    type="primary" 
                    size="large" 
                    shape="round" 
                    block
                    onClick={formik.handleSubmit}
                    disabled={mutation.isLoading}
                    >
                        Connexion
                        {mutation.isLoading && <Spin className="loader" />}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
);
}

export default Login