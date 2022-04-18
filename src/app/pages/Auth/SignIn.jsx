import React from 'react';
import { Form, Input, Button, Alert} from 'antd';
import './Login.scss'

function SignIn() {
    const [form] = Form.useForm();
    return (
    <div className="sign-in-content">
        <h2 className="title">Créez un compte <br/> Gratuitement</h2>
        <div className="form-container">
            <Alert
                className="alert-box"
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
            />
            <Form
            className="form-horizontal"
            layout={'vertical'}
            form={form}
            initialValues={{ layout: 'vertical' }}
            >
                <Form.Item label="Nom">
                    <Input placeholder="Nom" />
                </Form.Item>
                <Form.Item label="Prenom(s)">
                    <Input placeholder="Prenom(s)" />
                </Form.Item>
                <Form.Item label="Email">
                    <Input placeholder="moi@societe.com" />
                </Form.Item>
                <Form.Item label="Mot de passe">
                    <Input placeholder="****" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" shape="round" block>S'inscrire</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
);
}

export default SignIn