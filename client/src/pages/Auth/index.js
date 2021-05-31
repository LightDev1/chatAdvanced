import React from 'react';
import { Form, Input } from 'antd';
import { Button, Block } from 'components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Auth.scss';

const Auth = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <section className="auth">
            <div className="auth__content">
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
                        hasFeedback
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
                        <a
                            className="auth__register-link"
                            href="#"
                        >
                            Зарегистрироваться
                        </a>
                    </Form>
                </Block>
            </div>
        </section>
    );
}

export default Auth;
