import { axios } from 'core';

// eslint-disable-next-line
export default {
    getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`),
    removeById: (id) => axios.delete(`/messages?dialog=${id}`),
    send: (text, dialog) => axios.post('/messages', {
        dialog,
        text,
    }),
};