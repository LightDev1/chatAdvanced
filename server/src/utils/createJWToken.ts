import jwt from 'jsonwebtoken';
import { reduce, values } from 'lodash';

export default (user: any) => {
    const token = jwt.sign(
        {
            data: reduce(user, (result: any, value, key) => {
                if (key !== 'password') {
                    result[key] = values;
                }

                return result;
            }, {}),
        },
        process.env.JWT_SECRET || '',
        { expiresIn: process.env.JWT_MAX_AGE }
    );

    return token;
}