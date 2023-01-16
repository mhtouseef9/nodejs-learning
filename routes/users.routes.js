var express = require('express');
var app = express();
var router = express.Router();
const userController = require("../controllers/user.controller")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', userController.index);

router.post('/', userController.create);

// router.get('/:email', userController.getByEmail)

router.put('/:id', userController.update);

router.delete('/:name', userController.deleteByName);

router.get('/sync/posts/', userController.getPostIdsSync);

router.get('/sync/posts/:id', userController.getPostByIdSync);

router.get('/async/posts/', userController.getPostIdsAsync);

router.get('/async/posts/:id', userController.getPostByIdAsync);

module.exports = router;
