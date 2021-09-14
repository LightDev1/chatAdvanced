import confirm from 'antd/lib/modal/confirm';
import { messagesApi } from 'utils/api';

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),

    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;

        if (currentDialogId === message.dialog._id) {
            dispatch({
                type: "MESSAGES:ADD_MESSAGE",
                payload: message
            });
        }
    },

    removeMessageById: (id) => dispatch => {
        if (confirm('Удалить сообщение?')) {
            dispatch(actions.setIsLoading(true));
            messagesApi.removeById(id).then(() => {
                dispatch({
                    type: 'MESSAGES:REMOVE_MESSAGE',
                    payload: id,
                });
            }).catch(() => {
                dispatch(actions.setIsLoading(false));
            });
            dispatch(actions.setIsLoading(false));
        }
    },

    fetchSendMessage: ({ text, dialog, attachments }) => dispatch => {
        messagesApi.send(text, dialog, attachments);
    },

    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool,
    }),

    fetchMessages: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true));
        messagesApi.getAllByDialogId(dialogId).then(({ data }) => {
            dispatch(actions.setMessages(data));
        }).catch(() => {
            dispatch(actions.setIsLoading(false));
        });
    }
};

export default actions;