var express = require('express');
var router = express.Router();

const { addResume, getResume } = require('../controller/resume/resume');



router.post('/',  addResume);
router.get('/',  getResume);



module.exports = router;