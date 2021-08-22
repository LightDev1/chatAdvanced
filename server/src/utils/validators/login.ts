import { check, validationResult } from 'express-validator';

export default [
    check('email', 'Неверный email или пароль').isEmail(),
    check('password', 'Неверный email или пароль').isLength({ min: 6 }),
];