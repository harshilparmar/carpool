const nodemailer = require("nodemailer");
const details = require("../routes/detail.json");

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from: '"Location of your loved ones From carpool"<example.gimail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Track your friend", // Subject line
        html: `<h1> <a href='${user.name}'>See current location</a> </h1><br>
      <h4>Thanks for joining us</h4>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

module.exports = {
    sendMail
}