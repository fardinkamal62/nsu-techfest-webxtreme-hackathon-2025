const api = module.exports;

api.userApi = require('./user');
api.reportApi = require('./report');
api.commentApi = require('./comment');

api.getProfile = async (req, res) => {
    try {
        const user = await api.userApi.getUser(req.user.id);
        const reports = await api.reportApi.getReports(req.user.id);
        const comments = await api.commentApi.getComments(req.user.id);
    
        res.json({
        user,
        reports,
        comments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};