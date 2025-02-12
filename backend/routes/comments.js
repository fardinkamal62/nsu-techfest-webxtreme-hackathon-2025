var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

const api = require('../api');
const middlewares = require('../middlewares');
const utils = require('../utils');
var upload = multer({ dest: 'uploads/' });

const upload_image = require('../services/firebase').upload_image;

const gemini = require('../services/ai');

router.post('/', middlewares.default.authenticate, upload.array('files', 10), async function (req, res, next) {
  try {
    utils.default.checkRequiredFields(['description', 'reportId'], req.body);

    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'Attachment is required' });

        if (req.files && req.files.length > 1) return res.status(400).json({ message: 'Maximum 1 attachment are allowed' });

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
        const run = await gemini.default.test("crime", "", images);

        if (run && run.trim().toLowerCase() === 'no') {
            return res.status(400).json({ message: 'Invalid image. Photo is not relevant to the title and description' });
        }

        const comment = api.commentApi.default.create(req);

        res.status(201).json(comment);
  } catch (e) {
    res.status(500).json(
      {
        message: 'Failed to comment',
        error: e.message
      }
    )
  }
});

router.get('/', function (req, res, next) {
  try {
    const comment = api.commentApi.default.get(req);
    comment.then((data) => {
      res.status(200).json(
        {
          message: 'Comment fetched successfully',
          data: data
        }
      )
    });
  }
  catch (e) {
    console.log('Failed to fetch comment', e);
    res.status(500).json(
      {
        message: 'Failed to fetch comment',
        error: e.message
      }
    )
  }
});

module.exports = router;
