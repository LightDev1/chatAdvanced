import { check } from 'express-validator';

export default [
    check('email', 'Неверный email или пароль').isEmail(),
    check('fullname', 'Имя пользователя должно состоять минимум из 4 сиволов').isLength({ min: 4 }),
    check('password', 'Неверный email или пароль').isLength({ min: 6 }),
];