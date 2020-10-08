var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        line1: String,
        line2: String
    },
    workExperience: {
        years: String, 
        months: String
    },
    skills: [String],
    resume: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);
