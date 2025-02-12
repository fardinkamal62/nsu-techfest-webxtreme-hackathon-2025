const report = {};

import Report from '../schemas/Report.js';

report.create = async (req) => {
    try {
        console.dir(req.user);
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
            query.title = filters.title;
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

export default report;
