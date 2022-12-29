var express = require('express');
var router = express.Router();

const SiteController = require('../controllers/SiteController');



router.get('/', SiteController.index);
router.post('/create', SiteController.create)


module.exports = router;
