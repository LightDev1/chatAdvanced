import React from 'react';
import { Link } from 'react-router-dom'
import { Form } from 'antd';
import { Button, Block, FormField } from 'components';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';

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
        isSubmitting,
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
                        <FormField
                            name="email"
                            touched={touched}
                            errors={errors}
                            icon={<MailOutlined />}
                            placeholder="E-mail"
                            values={values}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />

                        <FormField
                            name="fullname"
                            touched={touched}
                            errors={errors}
                            icon={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Ваше имя"
                            values={values}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />

                        <FormField
                            name="password"
                            touched={touched}
                            errors={errors}
                            icon={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Пароль"
                            values={values}
                            type="password"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />

                        <FormField
                            name="password2"
                            touched={touched}
                            errors={errors}
                            icon={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Повторить пароль"
                            values={values}
                            type="password"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <Form.Item>
                            {isSubmitting && !isValid && <span>Ошибка!</span>}
                            <Button
                                onClick={handleSubmit}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                disabled={isSubmitting}
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
