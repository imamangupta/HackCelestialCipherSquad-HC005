var express = require('express');
var router = express.Router();
const { addJob, getJob, getJobId, getJobIdUser, editJob } = require('../controller/job/job');




router.post('/',  addJob);
router.get('/',  getJob);
router.get('/id',  getJobId);
router.get('/userid',  getJobIdUser);
router.put('/edit',  editJob);


module.exports = router;