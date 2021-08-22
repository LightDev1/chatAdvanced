import { model, Schema } from 'mongoose';
import validator from 'validator';
import generatePasswordHash from '../utils/generatePasswordHash';

export interface UserModelInterface {
    _id?: string;
    email: string,
    avatar?: string,
    fullname: string,
    password: string,
    confirm_hash: string,
    confirmed?: boolean,
    last_seen?: Date,
}

const UserSchema = new Schema<UserModelInterface>({
    email: {
        type: String,
        require: 'Email address is required',
        validate: [validator.isEmail, 'Invalid email'],
        unique: true,
    },
    avatar: {
        type: String
    },
    fullname: {
        type: String,
        required: 'Fullname is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: {
        type: String,
    },
    last_seen: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    generatePasswordHash(user.password)
        .then(hash => {
            user.password = String(hash);
            next();
        })
        .catch((err) => {
            next(err);
        });
});

const User = model<UserModelInterface>('User', UserSchema);

export default User;