const mongoose = require('mongoose');
const schema = mongoose.Schema;

let tempOwener = new schema({
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'carpool' },
    email:String,
    licence_number:String,
    licence_date:Date,
    license_photo : String
});

module.exports = mongoose.model('tempOwener',tempOwener);