import { model, Schema, Types } from 'mongoose';

export interface UploadedFileModelInterface {
    filename: string;
    size: number;
    url: string;
    ext: string;
    user: string;
}

const UploadedFileSchema = new Schema<UploadedFileModelInterface>({
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    ext: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

const UploadedFile = model<UploadedFileModelInterface>('UploadedFile', UploadedFileSchema);

export default UploadedFile;