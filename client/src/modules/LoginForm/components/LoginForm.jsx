import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Input } from 'antd';
import { Button, Block } from 'components';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

export const validate = (key, touched, errors) => {
    if (touched[key]) {
        if (errors[key]) {
            return 'error';
        } else {
            return 'success';
        }
    } else {
        return '';
    }
};

const LoginForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        validateStatus={validate('email', touched, errors)}
                        rules={[{ required: true, message: 'Please input your E-mail!' }]}
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
                        name="password"
                        hasFeedback
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        validateStatus={validate('password', touched, errors)}
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
                    <Form.Item>
                        {isSubmitting && !isValid && <span>Ошибка!</span>}
                        <Button
                            onClick={handleSubmit}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitting}
                        >
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
