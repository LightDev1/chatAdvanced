import React from 'react';
import { Button, Modal, Select, Input, Form } from 'antd';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Dialogs } from 'containers';

import './Sidebar.scss';

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({ userId, users, visible, inputValue, messageText, selectedUserId, isLoading, onModalOk, onShow, onClose, onChangeInput, onSearch, onSelectUser, onChangeTextArea }) => {
    const options = users.map(user => (
        <Option key={user._id}>{user.fullname}</Option>
    ));

    return (
        <>
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    <Button
                        type="link"
                        shape="circle"
                        icon={<FormOutlined />}
                        onClick={onShow}
                    />
                </div>
                <div className="chat__sidebar-dialogs">
                    <Dialogs userId={userId} />
                </div>
            </div>
            <Modal
                title="Создать диалог"
                visible={visible}
                onCancel={onClose}
                confirmLoading={isLoading}
                footer={[
                    <Button
                        key="close"
                        onClick={onClose}
                    >
                        Закрыть
                    </Button>,
                    <Button
                        key="submit"
                        onClick={onModalOk}
                        type="primary"
                        disabled={!messageText}
                    >
                        Создать
                    </Button>
                ]}
            >

                <Form layout="vertical" className="add-dialog-form">
                    <Form.Item label="Введите имя пользователя или E-mail">
                        <Select
                            value={inputValue}
                            onSearch={onSearch}
                            onChange={onChangeInput}
                            onSelect={onSelectUser}
                            notFoundContent={null}
                            style={{ width: "100%" }}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            placeholder="Введите имя пользователя или почту"
                            showSearch
                        >
                            {options}
                        </Select>
                    </Form.Item >
                    {selectedUserId && <Form.Item
                        label="Введите сообщение"
                    >
                        <TextArea
                            placeholder="Сообщение"
                            autoSize={{ minRows: 3, maxRows: 100 }}
                            onChange={onChangeTextArea}
                            value={messageText}
                        />
                    </Form.Item>}
                </Form>
            </Modal>
        </>
    )
}

export default Sidebar;
