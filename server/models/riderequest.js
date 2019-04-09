const mongoose = require('mongoose');
const schema = mongoose.Schema;

let riderequest = new schema({
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'carpool' },
    owenerId : { type: mongoose.Schema.Types.ObjectId, ref: 'carpool' },
    rideid :{ type: mongoose.Schema.Types.ObjectId, ref: 'offeredride' }
    
});

module.exports = mongoose.model('rideReq',riderequest);