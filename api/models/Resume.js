const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    userid: {
        type: String
    },
    data: [],
    date: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model('Resume', DataSchema);
Resume.createIndexes();
module.exports = Resume;