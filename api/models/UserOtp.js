
const mongoose = require('mongoose')



const userOtpSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    otp: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

// module.exports = dbConnection.model('UserOtp', userOtpSchema)
const UserOtp = mongoose.model('UserOtp', userOtpSchema);
UserOtp.createIndexes();
module.exports = UserOtp;
