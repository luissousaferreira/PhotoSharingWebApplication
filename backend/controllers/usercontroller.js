var User = require('../models/user');


//Show users
exports.user_list = function(req, res, next) {
    User.find().sort([
            ['id', 'ascending']
        ])
        .exec(function(err, list_users) {
            if (err) { return next(err) }
            res.send(list_users);
        })
}

// Show User.
exports.user_get = function(req, res, next) {
    User.findById(req.params.id)
        .exec(function(err, user) {
            if (err) { return next(err) }
            res.send(user);
        })
};

// Show User.
exports.user_get_name = function(req, res, next) {
    User.find({ 'userName': req.body.userName })
        .exec(function(err, user) {
            if (err) { return next(err) }
            res.send(user);
        })
};


//Update user
exports.user_update = function(req, res, next) {
    var user = new User({
        _id: req.params.id,
        password: req.body.password,
        userName: req.body.userName,
        uploadedPhotos: req.body.uploadedPhotos,
        likedPhotos: req.body.likedPhotos,
        favoritePhotos: req.body.favoritePhotos
    });

    User.findByIdAndUpdate(req.params.id, user, {}, function(err) {
        if (err) { return next(err) }
        res.send(user);
    })
};

//Create user
exports.user_create = function(req, res, next) {
    var user = new User({
        password: req.body.password,
        userName: req.body.userName,
        uploadedPhotos: req.body.uploadedPhotos,
        likedPhotos: req.body.likedPhotos,
        favoritePhotos: req.body.favoritePhotos
    });

    user.save(function(err) {
        if (err) { return next(err); }
        res.send(user);
    });
};

//Delete hero
exports.user_delete = function(req, res, next) {
    User.findByIdAndDelete(req.params.id, function(err) {
        if (err) { return next(err); }
        res.send('User successfully deleted');
    })
};