import React from 'react';
import { Form, Input, Button, Alert, Spin, Result} from 'antd';
import { useFormik } from 'formik';
import { Register } from '../../../utils/requests/users';
import { useNavigate } from 'react-router-dom'
import SignInSchema from '../../validatorSchema/signInSchema'
import './Login.scss'

function SignIn() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isSuccess, setSuccess] = React.useState(false)
    const initialValues = {
        lastName: '',
        firstName: '',
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setSubmitting(true)
            try {
                values.role = "CLIENT"
                const response = await Register(values)
                const {data} = response;
                console.log(data)
                setSuccess(true)
            } catch (error) {
                console.error(error.response?.data?.message)
                if(error.response?.data?.message === "Users_email_key"){
                    setStatus(`Oups... l'email ${values.email} existe déjà. Veuillez en utiliser un autre.`)
                }else{
                    setStatus(error.response?.data?.error || error.message)
                }
            }finally{
                setSubmitting(false)
            }
        }
    });


    return (
    <div className="sign-in-content">
        {!isSuccess ? (<h2 className="title">Créez un compte <br/> Gratuitement</h2>) : false}
        <div className="form-container">
            {isSuccess ? (
                 <Result
                 status="success"
                 title="Félicitation !!"
                 subTitle="vous êtes désormait membre de notre grande famille d'utilisateurs."
                 extra={[
                   <Button type="primary" key="connexion" onClick={() => {
                        navigate('/connexion', { replace: true })
                   }}>
                     Se connecter
                   </Button>,
                   <Button key="accueil" onClick={() => {
                        navigate('/', { replace: true })
                    }}>Retourner à l'accueil</Button>,
                 ]}
               />
            ): (
                <>
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
                initialValues={{ layout: 'vertical' }}
                >
                    <Form.Item label="Nom">
                        <Input placeholder="Nom" 
                            name="lastName"
                            {...formik.getFieldProps('lastName')}/>
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="form-error">
                                    <div className="help-block">{formik.errors.lastName}</div>
                                </div>
                            ) : null}
                    </Form.Item>
                    <Form.Item label="Prenom(s)">
                        <Input placeholder="Prenom(s)"
                            name="firstName" 
                            {...formik.getFieldProps('firstName')}/>
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="form-error">
                                    <div className="help-block">{formik.errors.firstName}</div>
                                </div>
                            ) : null}
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="moi@societe.com" 
                            name="email" 
                            {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="form-error">
                                    <div className="help-block">{formik.errors.email}</div>
                                </div>
                            ) : null}
                    </Form.Item>
                    <Form.Item label="Mot de passe">
                        <Input placeholder="****" 
                            type="password"
                            name="password"
                            {...formik.getFieldProps('password')}/>
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
                            S'inscrire
                            {formik.isSubmitting && <Spin className="loader" />}
                        </button>
                    </Form.Item>
                </Form>
                </>
            )}
        </div>
    </div>
);
}

export default SignIn