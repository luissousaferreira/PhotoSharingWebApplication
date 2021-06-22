var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/usercontroller');
var photo_controller = require('../controllers/photocontroller');

// GET users.
router.get('/users', user_controller.user_list);

// GET user.
router.get('/user/:id', user_controller.user_get);

// POST user.
router.post('/userName', user_controller.user_get_name);

// POST user.
router.post('/user', user_controller.user_create);

// PUT update user.
router.put('/user/:id', user_controller.user_update);

// DELETE delete user.
router.delete('/user/:id', user_controller.user_delete);

// GET photos.
router.get('/photos', photo_controller.photo_list);

// GET recent photos.
router.get('/photos_recent', photo_controller.photo_list_recent);

// GET recent photos.
router.get('/photos_most_liked', photo_controller.photo_most_liked);

// GET photo.
router.get('/photo/:id', photo_controller.photo_get);

// POST photo.
router.post('/photo', photo_controller.photo_create);

// PUT update photo.
router.put('/photo/:id', photo_controller.photo_update);

// DELETE delete photo.
router.delete('/photo/:id', photo_controller.photo_delete);

module.exports = router;