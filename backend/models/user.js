var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: { type: String, required: true, unique: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 100 },
    uploadedPhotos: [{ type: Schema.Types.Object, ref: 'Photo', required: false, maxlength: 100 }],
    likedPhotos: [{ type: Schema.Types.Object, ref: 'Photo', required: false, maxlength: 100 }],
    favoritePhotos: [{ type: Schema.Types.Object, ref: 'Photo', required: false, maxlength: 100 }]
}, { versionKey: false });

UserSchema
    .virtual('url')
    .get(function() {
        return '/user/' + this._id;
    });

module.exports = mongoose.model('user', UserSchema);