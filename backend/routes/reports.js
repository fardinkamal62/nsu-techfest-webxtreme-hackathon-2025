var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');
var fs = require('fs');

const api = require('../api');
const middlewares = require('../middlewares');
const utils = require('../utils');

const upload_image = require('../services/firebase').upload_image;

const gemini = require('../services/ai');

router.post('/', middlewares.default.authenticate, upload.array('files', 10), async function (req, res, next) {
    try {
        utils.default.checkRequiredFields(['title', 'description', 'division', 'district', 'crimeTime'], req.body, next);

        if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'Attachment is required' });

        if (req.files && req.files.length > 5) return res.status(400).json({ message: 'Maximum 5 attachments are allowed' });

        const files = req.files;
        const ref = 'NSU_WebXtreme';

        let downloadURLs = [];

        const uploadPromises = files.map(file => {
            const filenameWithExtension = `${file.filename}${path.extname(file.originalname)}`;
            return upload_image(ref, filenameWithExtension, file.path)
                .then(data => {
                    downloadURLs.push(data);
                    fs.unlinkSync(file.path, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                })
                .catch(e => {
                    console.log('Failed to upload image', e);
                    throw new Error('Failed to upload image');
                });
        });

        await Promise.all(uploadPromises);
        if (downloadURLs.length !== files.length) {
            return res.status(500).json({ message: 'Failed to upload image' });
        }

        req.body.attachments = downloadURLs;

        // filter only images
        const images = downloadURLs.filter(url => {
            return url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png');
        });
        const run = await gemini.default.test(req.body.title, req.body.description, images);

        if (run && run.trim().toLowerCase() === 'no') {
            return res.status(400).json({ message: 'Invalid image. Photo is not relevant to the title and description' });
        }

        const report = api.reportApi.default.create(req);

        res.status(201).json(report);
    } catch (error) {
        next(error);
    }
});

router.get('/', function (req, res, next) {
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