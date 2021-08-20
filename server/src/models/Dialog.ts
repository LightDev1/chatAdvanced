import { model, Schema, Types } from 'mongoose';

export interface DialogModelInterface {
    partner: {
        type: Types.ObjectId,
        ref: string,
        required: true,
    };
    author: {
        type: Types.ObjectId,
        ref: string,
        required: true,
    };
    lastMessage: {
        type: Types.ObjectId,
        ref: string,
    };
}

const DialogSchema = new Schema<DialogModelInterface>({
    partner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    lastMessage: {
        type: Types.ObjectId,
        ref: 'Message'
    },
}, {
    timestamps: true
});

const Message = model<DialogModelInterface>('Dialog', DialogSchema);

export default Message;