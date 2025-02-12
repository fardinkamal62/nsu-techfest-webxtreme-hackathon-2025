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

router.post('/', middlewares.default.authenticate, upload.array('files', 10), async function (req, res, next) {
    try {
        utils.default.checkRequiredFields(['title', 'description', 'division', 'district'], req.body, next);

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
        const report = api.reportApi.default.create(req);

        res.status(201).json(report);
    } catch (error) {
        next(error);
    }
});

module.exports = router;