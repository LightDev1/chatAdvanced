import React from 'react';
import { Route } from 'react-router-dom';
import { LoginForm, RegisterForm } from 'modules';
import CheckEmailInfo from './components/checkEmailInfo';

import './Auth.scss';

const Auth = () => {
    return (
        <section className="auth">
            <div className="auth__content">
                <Route path={['/', '/login']} exact>
                    <LoginForm />
                </Route>
                <Route path="/register" exact>
                    <RegisterForm />
                </Route>
                <Route path="/register/check" exact>
                    <CheckEmailInfo />
                </Route>
            </div>
        </section>
    );
}

export default Auth;
