import React, { useState } from 'react';
import { connect } from 'react-redux';

import { userApi, dialogsApi } from 'utils/api'
import { Sidebar as BaseSidebar } from 'components';

const Sidebar = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState([]);
    const [users, setUsers] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    const onClose = () => {
        setVisible(false);
    };

    const onShow = () => {
        setVisible(true);
    };

    const handleChangeInput = (value) => {
        setInputValue(value);
    };

    const onSearch = (value) => {
        userApi.findUsers(value).then(({ data }) => {
            setUsers(data);
        });
    };

    const onAddDialog = () => {
        setIsLoading(true);
        dialogsApi.create({
            partner: selectedUserId,
            text: messageText,
        }).then(({ data }) => {
            console.log(data);
            setIsLoading(false);
            onClose();
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const onSelectUser = (userId) => {
        setSelectedUserId(userId);
    };

    const onChangeTextArea = (event) => {
        setMessageText(event.target.value);
    };

    return (
        <BaseSidebar
            userId={user && user._id}
            inputValue={inputValue}
            visible={visible}
            users={users}
            isLoading={isLoading}
            messageText={messageText}
            selectedUserId={selectedUserId}
            onSearch={onSearch}
            onClose={onClose}
            onSelectUser={onSelectUser}
            onShow={onShow}
            onChangeInput={handleChangeInput}
            onModalOk={onAddDialog}
            onChangeTextArea={onChangeTextArea}
        />
    );
};

export default connect(
    ({ user }) => ({
        user: user.data
    })
)(Sidebar);
