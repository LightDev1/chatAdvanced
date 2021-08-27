import { withFormik } from 'formik';
import store from 'redux/store';

import LoginForm from '../components/LoginForm';
import validateForm from 'utils/validate';
import { userActions } from 'redux/actions';

const LoginFormContainer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validate: values => {
        let errors = {};

        validateForm({ values, errors });

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        store.dispatch(userActions.fetchUserLogin(values)).then(() => {
            setSubmitting(false);
        })
    },
    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormContainer;