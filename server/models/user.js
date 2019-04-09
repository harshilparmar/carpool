const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

let userSchema = new schema({
    userid: { type: String, unique: true  },
    password: String,
    first_name: String,
    last_name: String,
    email: { type: String, unique: true  },
    second_email : { type: String, unique: true  },
    phone: String,
    gender: String,
    owener :{ type: Boolean ,default :false },
    isAdmin : { type: Boolean ,default :false },
    isRejected : { type: Boolean ,default :false },
    ride_provider : {
        license_number:String,
        license_date:Date,
        license_photo : String,
           // coustomer : [userSchema]
        },
        //rides history
    rides : [{
            rideID : { type: mongoose.Schema.Types.ObjectId, ref: 'offeredride' }
             }],
    loadtransport : [{
                reqid : { type: mongoose.Schema.Types.ObjectId, ref: 'loadReq' },
                shippedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'carpool' }  
             }],
    transportByme : [{ reqid : { type: mongoose.Schema.Types.ObjectId, ref: 'loadReq' }}]                      
});   

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('carpool',userSchema);