const offerRide = require('../models/offeredRide');

const event = async (req, res) => {
    try {
        // let id = req.params.id;
        let ridelist = await offerRide.find();
        // console.log(userdetail.isRejected);
        res.send(ridelist);
    } catch (error) {
        res.status(401).send(error);
    }
}

const eventById = async (req, res) => {
    try {
        let id = req.params.id;
        let ridelist = await offerRide.findById(id).populate('owenerID');
        // console.log(userdetail.isRejected);
        res.send(ridelist);
    } catch (error) {
        res.status(401).send(error);

    }
}


exports.eventById = eventById;
exports.event = event;