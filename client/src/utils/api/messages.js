import { axios } from 'core';

// eslint-disable-next-line
export default {
    getAllByDialogId: (id) => axios.get(`/messages?_id=${id}`),
};