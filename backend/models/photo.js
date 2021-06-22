var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var PhotoSchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: false, maxlength: 500 },
    image: { type: String, required: true },
    like: { type: String, required: true, maxlength: 100 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false, maxlength: 100 },
    date: { type: String, required: true, maxlength: 100 },
}, { versionKey: false });

PhotoSchema
    .virtual('url')
    .get(function() {
        return '/photo/' + this._id;
    });

module.exports = mongoose.model('photo', PhotoSchema);