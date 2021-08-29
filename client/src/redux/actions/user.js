import { openNotification } from 'utils/helpers';
import { userApi } from 'utils/api';

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        });
    },
    fetchUserLogin: (postData) => dispatch => {
        return userApi.login(postData).then(({ data }) => {
            const { status, token } = data;
            if (status === 'error') {
                openNotification({
                    title: 'Ошибка при авторизации',
                    text: data.message,
                    type: 'error'
                });
            } else {
                openNotification({
                    title: 'Отлично!',
                    text: 'Вы успешно авторизавались',
                    type: 'success'
                });
                window.axios.defaults.headers.common['token'] = token;
                window.localStorage['token'] = token;
                dispatch(actions.fetchUserData());
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