var express = require('express');
var router = express.Router();
const { addApplication, getJobApp, getAppByJob, getUserApp } = require('../controller/application/application');



router.post('/',  addApplication);
router.get('/jobid',  getJobApp);
router.get('/getAppByJob',  getAppByJob);
router.get('/getUserApp',  getUserApp);

module.exports = router;