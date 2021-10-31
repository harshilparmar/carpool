const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const User = require('../models/user');
const tempOwener = require('../models/rider');
const offerRide = require('../models/offeredRide');
const rideReq = require('../models/riderequest');
const loadReq = require('../models/load_req');
const path = require('path');
const authController = require('../controllers/authController')
const helper = require('../helper/helper');
const rideController = require('../controllers/rideController');
const eventController = require('../controllers/eventController');

const verifyToken = require('../middleware/verifyTocken');

mongoose.connect('mongodb://127.0.0.1:27017/carpool', { useNewUrlParser: true }, { useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});


//////////multer config//////////
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
});

var upload = multer({
  storage: storage
});

//Register

router.post('/register', authController.userSignUp);


//login 

router.post('/login', authController.userLogIn);
// });
//

//all ride list
router.get('/event', eventController.event);


//particular ride by id
router.get('/event/:id', eventController.eventById);


//common ride search
router.post('/allride', rideController.allRide);

//search particular ride based on route

router.post('/search', rideController.searchRide);

///ride request 
router.post('/rideRequest', async (req, res) => {


  try {
    // console.log(req.body.des);
    let data = req.body;
    // console.log(data);

    let searchResult = new rideReq(data);
    await searchResult.save();
    res.send(searchResult);
  } catch (error) {
    res.status(401).send(error);

  }

});

// varify
router.post('/special', verifyToken, async (req, res) => {


  try {
    let rideOffer = new offerRide(req.body);
    await rideOffer.save();
    res.json(rideOffer);
  } catch (error) {
    res.status(401).send(error);

  }

});

//temp owener register

router.post('/owener_reg', upload.single("uploadfile"), async (req, res) => {


  try {
    let owerdetail = {
      userid: req.body.userid,
      email: req.body.email,
      licence_number: req.body.licence_number,
      licence_date: req.body.licence_date,
      license_photo: req.file.filename
    };
    let tempdetail = new tempOwener(owerdetail);
    await tempdetail.save();
    res.send(tempdetail);
  } catch (error) {
    res.status(401).send(error);

  }
});

///////////////////////download licence//////////////////////////

router.post('/download', function (req, res, next) {
  filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename;
  res.sendFile(filepath);
});




//* User profile (READ)
router.get('/profile/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let userdetail = await User.findById(id).populate('rides.reqid');
    // console.log(userdetail.isRejected);
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }
});

// * User profile (UPDATE)
router.patch('/proupdate/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body; ////////try with different approach 
    let userdetail = await User.findByIdAndUpdate({
      "_id": id
    }, data);
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});




//////////////////ADMIN ALL PROFILE FETCH ///////////////////
router.get('/profile', async (req, res) => {
  try {

    let userdetail = await User.find({});
    res.json(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});

////////////////////////* admin varifaction//////////////////////////////////////////////

router.get('/varifaction', async (req, res) => {
  try {
    // let id = req.params.id;
    let userdetail = await tempOwener.find({}).populate('userid');
    res.json(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});

//////////////////////* activate user//////////////////////////
router.patch('/active/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body; ////////!try with different approach 
    let tempdata = await tempOwener.find({
      userid: id
    });
    let userdetail = await User.update({
      "_id": id
    }, {
      $set: {
        "owener": true,
        "ride_provider": {
          license_number: tempdata[0].licence_number,
          license_photo: tempdata[0].license_photo,
          license_date: tempdata[0].licence_date
        }
      }
    });
    let tempdelte = await tempOwener.deleteOne({
      "userid": id
    });
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});


////////////////////* Reject User////////////////////////

router.delete('/reject/:id', async (req, res) => {
  try {
    let id = req.params.id;
    await User.update({
      "_id": id
    }, {
      $set: {
        "isRejected": true
      }
    });
    let userdetail = await tempOwener.deleteOne({
      "userid": id
    });
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});



////////////////////*COUNTING THE NUMBER OF DOC//////////////////////////

router.get('/documentcount', async (req, res) => {
  try {
    let id = req.params.id;
    let userdetail = await tempOwener.count();
    res.send({
      totalRec: userdetail
    });
  } catch (error) {
    res.status(401).send(error);

  }

});



//* Ride requests


router.post('/rideconfirmation', async (req, res) => {
  try {
    let owenerID = req.body.owenerID;
    let response = {};
    let rideRequest = await rideReq.find({
      "owenerId": owenerID
    }).populate('userid').populate('rideid');
    res.json(rideRequest);
  } catch (error) {
    res.status(401).send(error);

  }

});



//accept request 

router.post('/riderActive', async (req, res) => {
  try {
    let userId = req.body.userID;
    let rideID = req.body.rideID;
    console.log(rideID);
    // let owenerID = req.body.owenerID;
    //  let response = {};
    let rideRequest = await offerRide.findByIdAndUpdate(rideID, {
      $inc: {
        number_sits: -1
      },
      $push: {
        rider: {
          userID: userId
        }
      }
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        rides: {
          rideID: rideID
        }
      }
    });
    let deleteRequst = await rideReq.findOneAndDelete({
      rideid: rideID
    });
    // ,$push: { rider: rideID }},{
    //   upsert: true,
    //   new: true
    // }
    res.send(deleteRequst);
  } catch (error) {
    res.status(401).send(error);

  }

});

////ride cancle


router.delete('/riderdeactive/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let userdetail = await rideReq.findByIdAndDelete(id);
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});




///user   rides


router.get('/user_rides/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let userdetail = await User.findById(id).populate('loadtransport.shippedBy loadtransport.reqid').populate({
      path: 'rides.rideID'
    }).populate('transportByme.reqid').exec(function (err, docs) {

      var options = {
        path: 'transportByme.reqid.userid rides.rideID.owenerID'
      };

      if (err) return res.json(500);
      User.populate(docs, options, function (err, projects) {
        res.send(projects);
      });
    });
    // res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});


///// ride Detail ridedetail


router.get('/ridedetail/:rideid', async (req, res) => {
  try {
    let id = req.params.rideid;
    let rideDetail = await offerRide.findById(id);
    res.send(rideDetail);
  } catch (error) {
    res.status(401).send(error);

  }

});

//// owener Ride Details

router.get('/owenerRides/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let rideDetail = await offerRide.find({
      owenerID: id
    }).populate('rider.userID');
    res.send(rideDetail);
  } catch (error) {
    res.status(401).send(error);
  }

});


///////////////loading data detail/////////////////////


router.post('/loadreg', async (req, res) => {


  try {
    let userdata = req.body;

    let loadreg = new loadReq(userdata);
    await loadreg.save();
    res.send(loadreg);
  } catch (error) {
    res.status(401).send(error);

  }
});



//////////send all load request/////


router.get('/allLoadReq', async (req, res) => {
  try {
    // let id = req.params.id;
    let rideDetail = await loadReq.find({}).populate('userid');
    res.send(rideDetail);
  } catch (error) {
    res.status(401).send(error);
  }

});

///accept and decline 
router.post('/loadaccept', async (req, res) => {
  try {
    let userId = req.body.userID;
    let shippedID = req.body.shippedID;
    let reqId = req.body.loadreqID;
    console.log(reqId);


    await User.findByIdAndUpdate(userId, {
      $push: {
        loadtransport: {
          reqid: reqId,
          shippedBy: shippedID
        }
      }
    });
    await User.findByIdAndUpdate(shippedID, {
      $push: {
        transportByme: {
          reqid: reqId
        }
      }
    });
    let done = await loadReq.findByIdAndUpdate(reqId, {
      isConfirm: true
    });


    res.send(done);
  } catch (error) {
    res.status(401).send(error);

  }

});



router.delete('/loadreject/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let userdetail = await loadReq.findByIdAndDelete(id);
    res.send(userdetail);
  } catch (error) {
    res.status(401).send(error);

  }

});

//////load approval request accept


// router.get('/loadacceptreq/:id',async (req,res)=>{
//   try { 
//     let id = req.params.id;
//     let rideDetail = await 
//     res.send(rideDetail);
// } catch (error) {
//   res.status(401).send(error);
//   }

// });

//////////////.........Email..../////////////

router.post("/sendmail", (req, res) => {
  // console.log("request came");
  let user = req.body;
  helper.sendMail(user, info => {
    // console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});


router.get('/map', (req, res) => {
  let param = req.query;
  console.log(param);
  res.render('map', { cdn: param });
  // res.sendFile('../views/map.h')
})






module.exports = router;