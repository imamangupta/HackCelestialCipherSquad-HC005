var express = require('express');
var router = express.Router();
const { addCourses, getCourses } = require('../controller/courses/courses');



router.post('/',  addCourses);
router.get('/',  getCourses);


module.exports = router;