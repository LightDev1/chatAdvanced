import { axios } from 'core';

// eslint-disable-next-line
export default {
    getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`),
    removeById: (id) => axios.delete(`/messages?id=${id}`),
    send: (text, dialog) => axios.post('/messages', {
        dialog,
        text,
    }),
};