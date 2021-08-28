import React from 'react'
import { Form, Input } from 'antd';

import { validateField } from 'utils/helpers';

const FormField = ({ name, type, placeholder, handleChange, icon, handleBlur, touched, errors, values }) => {
    return (
        <Form.Item
            name={name}
            hasFeedback
            validateStatus={validateField(name, touched, errors)}
            help={touched[name] && errors[name]}
        >
            <Input
                id={name}
                prefix={icon}
                placeholder={placeholder}
                size="large"
                type={type}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
    );
};

export default FormField;
