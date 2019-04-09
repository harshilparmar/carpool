const mongoose = require('mongoose');
const schema = mongoose.Schema;

let load_req = new schema({
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'carpool' },
    departure_address: String,
    arrival_address: String,    
    description : String,
    dateofdel :  Date,
    weight : Number,
    type : String,
    priority : {
        type: String,
        enum : ['high','medium','low']
    },
    isConfirm : { type: Boolean , default: false}
});

module.exports = mongoose.model('loadReq',load_req);