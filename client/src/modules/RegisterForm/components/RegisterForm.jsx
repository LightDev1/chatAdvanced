import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Input } from 'antd';
import { Button, Block } from 'components';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { validateField } from 'utils/helpers';

const RegisterForm = (props) => {
    const success = false;

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty,
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <Form.Item
                            name="email"
                            validateStatus={validateField('email', touched, errors)}
                            rules={[{ required: true, message: 'Please input your E-mail!' }]}
                            hasFeedback
                            help={touched.email && errors.email}
                        >
                            <Input
                                id="email"
                                prefix={<MailOutlined />}
                                placeholder="E-mail"
                                size="large"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            hasFeedback
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Ваше имя"
                                size="large"
                                value={'fdffdffd'}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            validateStatus={validateField('password', touched, errors)}
                            help={touched.password && errors.password}
                        >
                            <Input
                                id='password'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size="large"
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password2"
                            validateStatus={validateField('email', touched, errors)}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password2"
                                size="large"
                                placeholder="Повторить пароль"
                            />
                        </Form.Item>
                        <Form.Item>
                            {dirty && !isValid && <span>Ошибка!</span>}
                            <Button
                                onClick={handleSubmit}
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
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
