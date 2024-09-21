const Application = require("../../models/Application");
const Resume = require("../../models/Resume");

exports.addApplication = async (req, res) => {

    let { userName, email, phone, resume , cover ,studentId, companyId,jobid} = req.body

    try {
       
        let application = await Application.create({
            userName: userName,
            email: email,
            phone: phone,
            cover: cover,
            resume: resume,
            studentId: studentId,
            companyId: companyId,
            jobId:jobid
        })


        return res.status(201).json({ message: 'application Created', application })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}


exports.getUserApp = async (req, res) => {

    const userId = req.header('userid')

    try {
       
        let app = await Application.find({studentId:userId});
       
        return res.status(201).json({ message: 'Fetch Job by user', app })

       
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
exports.getCompanyApp = async (req, res) => {

    const companyid = req.header('companyid')

    try {
       
        let app = await Application.find({companyId:companyid});
       
        return res.status(201).json({ message: 'Fetch Job by company', app })

       
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}

exports.getJobApp = async (req, res) => {

    const jobid = req.header('jobid')

    try {
       
        let app = await Application.find({jobId:jobid});
       
        return res.status(201).json({ message: 'Fetch Jobasdfasd by company', app })

       
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
exports.getAppByJob = async (req, res) => {

    const jobid = req.header('jobid')

    try {
        let data = []
       
        let app = await Application.find({jobId:jobid});
        for (let index = 0; index < app.length; index++) {
            const element = app[index];
            let resume = await Resume.findOne({ userid: element.studentId }).select('-userid -_id -date');
            data.push(resume)
            
        }
       
        return res.status(201).json({ message: 'Fetch Jobasdfasd by company', data })

       
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}

