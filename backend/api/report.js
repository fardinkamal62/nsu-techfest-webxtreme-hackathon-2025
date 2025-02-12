const report = {};

import moment from 'moment-timezone';

import Report from '../schemas/Report.js';
import User from '../schemas/User.js';

report.create = async (req) => {
    try {
        req.body.crimeTime = moment(req.body.crimeTime).tz('Asia/Dhaka').format();
        const report = new Report({...req.body, createdBy: req.user.user});
        return await report.save();
    } catch (e) {
        throw new Error(e.message);
    }
}

report.get = async(req) => {
    try {
        const filters = req.query;
        const query = {};

        if (filters.title) {
            query.title = { $regex: filters.title, $options: 'i' };
        }
        if (filters.description) {
            query.description = { $regex: filters.description, $options: 'i' };
        }
        if (filters.division) {
            query.division = filters.division;
        }
        if (filters.district) {
            query.district = filters.district;
        }
        if (filters.createdBy) {
            query.createdBy = filters.createdBy;
        }

        return await Report.find(query);
    } catch (e) {
        throw new Error(e.message);
    }
}

report.update = async(req) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            throw new Error('Report not found');
        }

        const user = await User.findById(req.user.user);
        if (!user) {
            throw new Error('User not found');
        }

        if (report.createdBy.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to update this report');
        }

        Object.keys(req.body).forEach(key => {
            report[key] = req.body[key];
        });

        return await report.save();
    } catch (e) {
        throw new Error(e.message);
    }
};

report.delete = async(req) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            throw new Error('Report not found');
        }

        const user = await User.findById(req.user.user);
        if (!user) {
            throw new Error('User not found');
        }

        if (report.createdBy.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to delete this report');
        }

        return await report.remove();
    } catch (e) {
        throw new Error(e.message);
    }
};

export default report;
