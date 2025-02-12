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

module.exports = router;
