const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 30011;
const mongoose = require("mongoose");
const router = express.Router();

let Thread_Data = require("./models/Thread_Data");
let Ranking_Province = require("./models/Ranking_Province");
let Ranking_Places = require("./models/Ranking_Places");

app.use(cors());
// edit "MongoServer Config" to available server
mongoose.connect( "MongoServer Config", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
});

app.use("/", router);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

router.route("/getThreadData").get(function(req, res) {
    Thread_Data.find({ $or: [
        { "provinceTh":{$all:[req.query.provinceTh]} },
        { "placeList":{$all:[req.query.placeName]} }
    ]}, 

        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
    });
});

router.route("/getRankProvince").get(function(req, res) {
    Ranking_Province.find({ $or: [
            {"provinceRank":  req.query.provinceRank},
            { "provinceTh":{$all:[req.query.provinceTh]} },
            // {"provinceRank": { "$gte": 1, "$lte": 10 }},
        ]}, 
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
    });
});

router.route("/getRankPlaces").get(function(req, res) {
    Ranking_Places.find({ $or: [
            {"placeRank":  req.query.placeRank},
            // { "placeName":{$all:[req.query.provinceTh]} },
        ]},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
    });
});