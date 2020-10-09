const mongoose = require("mongoose");

const userExpSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    _id: mongoose.Schema.Types.ObjectId,
    currEmp: String,
    Destination: String,
    currJobDesc: Boolean,
    currExpMonths: String,
    prevEmp: String,
    prevJobDesc: String,
    prevExpMonths: String,
    timeCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Userexp', userExpSchema);
