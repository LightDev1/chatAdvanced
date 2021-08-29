import { axios } from 'core';

// eslint-disable-next-line
export default {
    login: (postData) => axios.post(`/user/login`, postData),
    register: (postData) => axios.post('/user/registration', postData),
    verifyHash: (hash) => axios.get(`/user/verify?hash=${hash}`),
    getMe: () => axios.get(`/user/me`),
};