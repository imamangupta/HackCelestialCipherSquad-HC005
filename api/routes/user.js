var express = require('express');
var router = express.Router();

const { addUser, loginUser, getUser, chekotp } = require('../controller/user/user');




router.post('/',  addUser);
router.post('/checkout',  chekotp);
router.get('/',  getUser);
router.post('/login',  loginUser);


module.exports = router;