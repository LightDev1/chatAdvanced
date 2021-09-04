import { openNotification } from 'utils/helpers';
import { userApi } from 'utils/api';

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        }).catch((err) => {
            if (err.response.status === 403) {
                dispatch(actions.setIsAuth(false));
                delete window.localStorage.token;
            }
        });
    },
    fetchUserLogin: (postData) => dispatch => {
        return userApi.login(postData).then(({ data }) => {
            const { token } = data;
            openNotification({
                title: 'Отлично!',
                text: 'Вы успешно авторизавались',
                type: 'success'
            });
            window.axios.defaults.headers.common['token'] = token;
            window.localStorage['token'] = token;
            dispatch(actions.fetchUserData());
        }).catch(({ response }) => {
            if (response.status === 403) {
                openNotification({
                    title: 'Ошибка при авторизации',
                    text: 'Неверный логин или пароль',
                    type: 'error'
                });
            }
        });
    },
    fetchUserRegister: (postData) => dispatch => {
        return userApi.register(postData).then(({ data }) => {
            const { status } = data;
            if (status === 'error') {
                openNotification({
                    title: 'Ошибка при регистрации',
                    text: data.message,
                    type: 'error'
                });
            } else {
                openNotification({
                    title: 'Отлично!',
                    text: 'Регитрация прошла успешно',
                    type: 'success'
                });
            }
        });
    }
};

export default actions;