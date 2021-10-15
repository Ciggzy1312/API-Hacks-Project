const router = require("express").Router();
const Pin = require("../models/pin");

//create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all pins
router.get("/", async (req, res) => {

    const lat = req.query.lat
    const long = req.query.long
    
    try {
        let pins;
        if(lat && long){
            pins = await Pin.find({lat, long})
        }
        else{
            pins = await Pin.find();
        }
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;