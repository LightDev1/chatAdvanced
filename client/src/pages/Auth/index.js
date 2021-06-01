import React from 'react';
import { Route } from 'react-router-dom';
import { LoginForm, RegisterForm } from 'modules';

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
            </div>
        </section>
    );
}

export default Auth;
