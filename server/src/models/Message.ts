import { model, Schema, Types } from 'mongoose';

export interface MessageModelInterface {
    _id?: string;
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
    read: {
        type: boolean,
        default: boolean,
    },
}

const MessageSchema = new Schema<MessageModelInterface>({
    text: {
        type: String,
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
    read: {
        type: Boolean,
        default: false,
    },
    attachments: [
        {
            type: Types.ObjectId,
            ref: 'UploadedFile',
        }
    ],
}, {
    timestamps: true,
    usePushEach: true,
});

const Message = model<MessageModelInterface>('Message', MessageSchema);

export default Message;