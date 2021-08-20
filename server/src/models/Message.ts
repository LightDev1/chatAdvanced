import { model, Schema, Types } from 'mongoose';

export interface MessageModelInterface {
    author: {
        type: Types.ObjectId,
        ref: string,
        required: boolean,
    };
    partner: {
        type: Types.ObjectId,
        ref: string,
        required: boolean,
    };
    dialog: {
        type: Types.ObjectId,
        ref: string,
        required: boolean,
    };
    text: {
        type: string,
        required: boolean,
    };
    unread: {
        type: boolean,
        default: boolean,
    },
}

const MessageSchema = new Schema<MessageModelInterface>({
    text: {
        type: String,
        required: true
    },
    dialog: {
        type: Types.ObjectId,
        ref: 'Dialog',
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    unread: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const Message = model<MessageModelInterface>('Message', MessageSchema);

export default Message;