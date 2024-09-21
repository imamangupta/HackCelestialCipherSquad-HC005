const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    
    createdby: {
        type: String
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    logoColor: {
        type: String
    },
    location: {
        type: String
    },
    jobType: {
        type: String
    },
    workType: {
        type: String
    },
    experience: {
        type: String
    },
    salary: {
        type: String
    },
    postedTime: {
        type: String
    },
    tags: {
        type: String
    },
    jobFunction: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    qualifications: {
        type: String
    },
    responsibilities: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('Job', DataSchema);
User.createIndexes();
module.exports = User;