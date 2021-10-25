const jwt = require("jsonwebtoken");

const User = require("../models/user");

const userSignUp = (req, res) => {
  let userdata = req.body;

  let user = new User(userdata);
  user.save((error, result) => {
    if (error) {
      return console.log(error);
    } else {
      let payload = {
        subject: result._id,
      };
      let token = jwt.sign(payload, "secret");

      res.status(200).send({
        token,
        payload,
      });
    }
  });
};

const userLogIn = (req, res) => {
  let userdata = req.body;

  User.findOne(
    {
      userid: userdata.userid,
    },
    (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        if (!result) {
          res.status(401).send("User not found!!");
        } else {
          result.comparePassword(userdata.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch != true) {
              res.status(401).send("Password is worng!!");
            } else {
              // result.comparePassword(userdata.password, function(err, isMatch) {
              // if (err) throw err;
              let payload = {
                subject: result._id,
                admin: result.isAdmin,
              };
              let token = jwt.sign(payload, "secret");
              res.status(200).send({
                token: token,
                payload,
              });
            }
          });
        }
      }
    }
  );
};

exports.userSignUp = userSignUp;
exports.userLogIn = userLogIn;
