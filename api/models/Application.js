const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    cover: {
        type: String
    },
    resume: {
        type: String
    },
    companyId: {
        type: String
    },
    studentId: {
        type: String
    },
    jobId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', DataSchema);
Application.createIndexes();
module.exports = Application;