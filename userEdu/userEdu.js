const mongoose = require("mongoose");

const userEduSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    _id: mongoose.Schema.Types.ObjectId,
    college: String, 
    passedYear: String,
    graduated: Boolean,
    graduateSchool: String,
    durationYears: String,
    skills: String,
    certifications: String,
    timeCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Useredu', userEduSchema);
