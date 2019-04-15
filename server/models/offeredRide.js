const mongoose = require('mongoose');
const schema = mongoose.Schema;

let offeredrideSchema = new schema({
    owenerID: { type: mongoose.Schema.Types.ObjectId, ref: 'carpool' },
    departing_from: String,
    arriving_at: String,
    source_faddress: String,
    des_faddress: String,
    departing_date: Date,
    departure_time: String,
    arrival_time: String, // calculated route time
    waypoints: String,
    // meeting_location: String,
    roundtrip: {
        type: Boolean,
        default: false
    },
    returndate: Date,
    returntime: String,
    number_sits: Number,
    vehicle_type: {
        type: String,
        enum: ['car', 'bike']
    },
    vehicle_number: {
        type: String
    },
    rider:[{
        userID :  { type: mongoose.Schema.Types.ObjectId, ref: 'carpool' }
    }],
    preferences: {
        chattiness: {
            type: Boolean,
            default: true
        },
        Smoking: {
            type: Boolean,
            default: false
        },
        pets: {
            type: Boolean,
            default: true
        },
        music: {
            type: Boolean,
            default: true
        },
    }
    // departure_address: String,
    // arrival_address: String,  



});
offeredrideSchema.index({
    departing_from: 'text',
    arriving_at: 'text',
    waypoints: 'text'
});
module.exports = mongoose.model('offeredride', offeredrideSchema);