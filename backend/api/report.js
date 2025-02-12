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
        return await Report.find();
    } catch (e) {
        throw new Error(e.message);
    }
}

export default report;
