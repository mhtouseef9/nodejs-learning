var express = require('express');
var app = express();
var router = express.Router();
const indexController = require("../controllers/index.controller.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', indexController.index);


router.post('/test', indexController.create);

module.exports = router;
