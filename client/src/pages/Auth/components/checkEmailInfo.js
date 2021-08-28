import React from 'react';
import { Result } from 'antd';

const CheckEmailInfo = () => {
    return (
        <Result
            status="success"
            title="Регистрация прошла успешно!"
            subTitle="Ссылка с подверждением аккаунта отправлена на вашу почту."

        />
    );
}

export default CheckEmailInfo;
