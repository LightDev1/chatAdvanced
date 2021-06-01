import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Input } from 'antd';
import { Button, Block } from 'components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        hasFeedback
                        validateStatus="success"
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Имя пользователя"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            size="large"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">
                            Войти в аккаунт
                            </Button>
                    </Form.Item>
                    <Link
                        className="auth__register-link"
                        to="/register"
                    >
                        Зарегистрироваться
                </Link>
                </Form>
            </Block>
        </div>
    )
};

export default LoginForm;
