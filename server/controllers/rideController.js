const offerRide = require('../models/offeredRide');
const allRide = async (req, res) => {

    try {
        let keyword = req.body.keyword;
        let searchResult = await offerRide.find({
            $text: {
                $search: keyword
            }
        });
        res.send(searchResult);
    } catch (error) {
        res.status(401).send(error);

    }

}

const searchRide = async (req, res) => {


    try {
        // console.log(req.body.des);
        let source = req.body.src;
        let destination = req.body.des;
        let searchResult = await offerRide.find({
            $and: [{
                "departing_from": source
            }, {
                $or: [{
                    "arriving_at": destination
                }, {
                    "waypoints": destination
                }]
            }]
        }).collation({
            locale: 'en',
            strength: 1
        });
        res.send(searchResult);
    } catch (error) {
        res.status(401).send(error);

    }

}


exports.searchRide = searchRide;
exports.allRide = allRide;