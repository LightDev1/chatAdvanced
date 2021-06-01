import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Input } from 'antd';
import { Button, Block } from 'components';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';

const RegisterForm = (props) => {
    const success = true;

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your E-mail!' }]}
                            hasFeedback
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="E-mail"

                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            hasFeedback
                            validateStatus="success"
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Ваше имя"
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
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size="large"
                                placeholder="Повторить пароль"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit">
                                Зарегистрироваться
                        </Button>
                        </Form.Item>
                        <Link
                            className="auth__register-link"
                            to="/login"
                        >
                            Войти в аккаунт
                </Link>
                    </Form>
                ) : <div className="auth__success-block">
                    <div>
                        <InfoCircleTwoTone style={{ fontSize: '48px' }} />
                    </div>
                    <h2>Подтвердите свой аккаунт</h2>
                    <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                </div>}
            </Block>
        </div>
    )
};

export default RegisterForm;
