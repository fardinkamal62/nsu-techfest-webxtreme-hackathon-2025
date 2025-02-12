const comment = {};

import Report from '../schemas/Report.js';
import Comment from '../schemas/Comment.js';
import User from '../schemas/User.js';

comment.create = async (req, res) => {
    try {
        const report = await Report.findById(req.body.reportId);
        if (!report) {
            throw new Error('Report not found');
        }

        const comment = new Comment({...req.body, createdBy: req.user.user, report: req.body.reportId});
        return await comment.save();
    } catch (e) {
        throw new Error(e.message);
    }
}

comment.get = async (req) => {
    try {
        const filters = req.query;
        
        const query = {};
        if (filters.report) {
            query.report = filters.report;
        }

        return await Comment.find(query);
    } catch (e) {
        throw new Error(e.message);
    }
}

comment.update = async(req) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(req.user.user);
        if (!user) {
            throw new Error('User not found');
        }

        if (comment.createdBy.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to update this comment');
        }

        Object.keys(req.body).forEach(key => {
            comment[key] = req.body[key];
        });

        return await comment.save();
    } catch (e) {
        throw new Error(e.message);
    }
};

comment.delete = async(req) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(req.user.user);
        if (!user) {
            throw new Error('User not found');
        }

        if (comment.createdBy.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to delete this comment');
        }

        return await comment.remove();
    } catch (e) {
        throw new Error(e.message);
    }
};

export default comment;