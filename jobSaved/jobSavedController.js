const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    JobSaved = require("./jobSaved"),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    verifyToken = require("../auth/verifyToken");


router.post("/", verifyToken, (req, res, next) => {
    const jobSaved = new JobSaved({
        _id: new mongoose.Types.ObjectId(),
        admin: req.body.admin,
        job: req.body.job,
        user: req.body.user 
    });
    jobSaved
        .save()
        .then(result => {
            res.status(200).send({
                message: "Job details saved"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

// getting all user saved jobposts details
router.get("/user/:userId", verifyToken, (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    if (size === undefined)
        size = 10;
    else
        size = parseInt(req.query.size);
    if (page < 0 || page === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        res.send(response);
    }
    var skip = size * (page - 1);
    var limit = size;
    JobSaved.find({ "user": req.params.userId }, {}, { skip: skip, limit: limit }).sort({ id: -1 })
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
});

//getting details by admin Id
router.get("/:jobSavedId", verifyToken, (req, res, next) => {
    const id = req.params.jobSavedId;
    JobSaved.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(404).send({ message: "No valid entry found for provided Id" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});


// updating admin details
router.put("/:jobSavedId", verifyToken, (req, res, next) => {

    const id = req.params.jobSavedId;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Job.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
            res.status(200).send({ msg: "Updated successfully" });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        });
});

module.exports = router;