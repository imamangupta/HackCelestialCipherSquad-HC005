var express = require('express');
var router = express.Router();

const user = require('./user')
router.use('/user', user);

const job = require('./job')
router.use('/job', job);

const courses = require('./courses')
router.use('/courses', courses);

const application = require('./application')
router.use('/app', application);

const resume = require('./resume')
router.use('/resume', resume);

module.exports = router;