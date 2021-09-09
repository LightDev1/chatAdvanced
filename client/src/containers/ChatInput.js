import React from 'react';
import { connect } from 'react-redux';

import { messagesActions } from 'redux/actions'
import { ChatInput as BaseChatInput } from 'components';

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    if (!currentDialogId) {
        return null;
    }

    return (
        <BaseChatInput
            onSendMessage={fetchSendMessage}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(({ dialogs }) => dialogs, messagesActions)(ChatInput);
