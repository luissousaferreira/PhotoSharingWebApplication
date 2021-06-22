var Photo = require('../models/photo');

//Create photo
exports.photo_create = function(req, res, next) {
    var photo = new Photo({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        like: req.body.like,
        user: req.body.user,
        date: req.body.date
    });

    photo.save(function(err) {
        if (err) { console.log(err); return next(err); }
        res.send(photo);
    });
};


//Show photos
exports.photo_list = function(req, res, next) {
    Photo.find().sort([
            ['id', 'ascending']
        ])
        .exec(function(err, list_photos) {
            if (err) { return next(err) }
            res.send(list_photos);
        })
}

//Show 50 most recent photos
exports.photo_list_recent = function(req, res, next) {
    Photo.find().sort([
            ['date', 'descending']
        ])
        .exec(function(err, list_photos) {
            if (err) { return next(err) }
            res.send(list_photos.slice(0, 51));
        })
}

//Show most liked pics
exports.photo_most_liked = function(req, res, next) {
    Photo.find().sort([
            ['like', 'descending']
        ])
        .exec(function(err, list_photos) {
            if (err) { return next(err) }
            res.send(list_photos.slice(0, 51));
        })
}

// Show photo.
exports.photo_get = function(req, res, next) {
    Photo.findById(req.params.id)
        .exec(function(err, photo) {
            if (err) { return next(err) }
            res.send(photo);
        })
};


//Update photo
exports.photo_update = function(req, res, next) {
    var photo = new Photo({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        like: req.body.like,
        user: req.body.user,
        date: req.body.date
    });

    Photo.findByIdAndUpdate(req.params.id, photo, {}, function(err) {
        if (err) { return next(err) }
        res.send(photo);
    })
};

//Delete photo
exports.photo_delete = function(req, res, next) {
    Photo.findByIdAndDelete(req.params.id, function(err) {
        if (err) { return next(err); }
        res.send('Photo successfully deleted');
    })
};
