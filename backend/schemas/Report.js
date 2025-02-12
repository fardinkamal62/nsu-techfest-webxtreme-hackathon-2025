import mongoose from 'mongoose';
import moment from 'moment-timezone';

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: () => moment().tz('Asia/Dhaka').format(),
    },
    updatedAt: {
        type: String,
        default: () => moment().tz('Asia/Dhaka').format(),
    },
    attachments: {
        type: Array,
        default: [],
        required: true,
    },
    crimeTime: {
        type: String,
        required: true,
    }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
