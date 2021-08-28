const validate = ({ isAuth, values, errors }) => {
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите E-mail';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ) {
                errors.email = 'Неверный E-mail';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (
                !isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
            ) {
                errors.password = 'Пароль должен содержать хотя бы 1 заглавную, строчную латинскую букву и цифру';
            }
        },
        password2: (value) => {
            if (!isAuth && !value) {
                errors.password2 = 'Повторите пароль';
            } else if (!isAuth && value !== values.password) {
                errors.password2 = 'Пароли не совпадают';
            }
        },
        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Введите ваше имя и фамилие';
            }
        }
    };

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};

export default validate;