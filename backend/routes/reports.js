var express = require('express');
var router = express.Router();

const api = require('../api');
const middlewares = require('../middlewares');
const utils = require('../utils');

router.post('/', middlewares.default.authenticate, function (req, res, next) {
    try {
        utils.default.checkRequiredFields(['title', 'description', 'division', 'district'], req.body, next);
    
        const report = api.reportApi.default.create(req);
        report.then((data) => {
        res.status(200).json(
            {
            message: 'Report created successfully',
            data: data
            }
        )
        }).catch((e) => {
        console.log('Failed to create report', e);
        res.status(500).json(
            {
            message: 'Failed to create report',
            error: e.message
            }
        )
        });
    } catch (e) {
        console.log('Failed to create report', e);
        res.status(500).json(
        {
            message: 'Failed to create report',
            error: e.message
        }
        )
    }
});

router.get('/', middlewares.default.authenticate, function (req, res, next) {
    try {
        const report = api.reportApi.default.get(req);
        report.then((data) => {
        res.status(200).json(
            {
            message: 'Report fetched successfully',
            data: data
            }
        )
        }).catch((e) => {
        console.log('Failed to fetch report', e);
        res.status(500).json(
            {
            message: 'Failed to fetch report',
            error: e.message
            }
        )
        });
    } catch (e) {
        console.log('Failed to fetch report', e);
        res.status(500).json(
        {
            message: 'Failed to fetch report',
            error: e.message
        }
        )
    }
});

router.put('/:id', middlewares.default.authenticate, function (req, res, next) {
    try {
        const report = api.reportApi.default.update(req);
        report.then((data) => {
        res.status(200).json(
            {
            message: 'Report updated successfully',
            data: data
            }
        )
        }).catch((e) => {
        console.log('Failed to update report', e);
        res.status(500).json(
            {
            message: 'Failed to update report',
            error: e.message
            }
        )
        });
    } catch (e) {
        console.log('Failed to update report', e);
        res.status(500).json(
        {
            message: 'Failed to update report',
            error: e.message
        }
        )
    }
});

router.delete('/:id', middlewares.default.authenticate, function (req, res, next) {
    try {
        const report = api.reportApi.default.delete(req);
        report.then((data) => {
        res.status(200).json(
            {
            message: 'Report deleted successfully',
            data: data
            }
        )
        }).catch((e) => {
        console.log('Failed to delete report', e);
        res.status(500).json(
            {
            message: 'Failed to delete report',
            error: e.message
            }
        )
        });
    } catch (e) {
        console.log('Failed to delete report', e);
        res.status(500).json(
        {
            message: 'Failed to delete report',
            error: e.message
        }
        )
    }
});

module.exports = router;
