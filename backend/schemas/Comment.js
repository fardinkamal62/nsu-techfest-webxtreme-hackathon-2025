import mongoose from 'mongoose';
import moment from 'moment-timezone';

import Report from './Report.js';
import User from './User.js';

const commentSchema = new mongoose.Schema({
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
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
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
