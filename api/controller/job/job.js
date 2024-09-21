const Job = require("../../models/Job");
// {
//     id: 1,
//     title: "Senior UX Designer",
//     company: "TechInnovate Solutions",
//     logoColor: "#E57373",
//     location: "Bangalore, Karnataka",
//     jobType: "Full-Time",
//     workType: "Hybrid",
//     experience: "Senior Level",
//     salary: "₹18,00,000 / year",
//     postedTime: "12hrs ago",
//     tags: ["UX Design", "UI/UX", "Figma", "User Research"],
//     jobFunction: "Design",
//   },


// {
//     id: "1",
//     title: "Senior Full Stack Developer",
//     company: "TechIndia Solutions",
//     location: "Bangalore, India",
//     type: "Full-time",
//     experience: "5-7 Years",
//     tags: ["Full-time", "Remote", "5-7 Years"],
//     description:
//       "TechIndia Solutions is seeking a Senior Full Stack Developer to join our innovative team. You'll be responsible for developing and maintaining web applications using modern technologies.",
//     qualifications: [
//       "5-7 years of experience in full stack development",
//       "Proficiency in React, Node.js, and MongoDB",
//       "Experience with cloud platforms (AWS/Azure/GCP)",
//       "Strong problem-solving and communication skills",
//     ],
//     responsibilities: [
//       "Design and implement scalable web applications",
//       "Collaborate with cross-functional teams to define and develop new features",
//       "Optimize application for maximum speed and scalability",
//       "Mentor junior developers and contribute to technical decision-making",
//     ],
//     attachments: [
//       {
//         title: "Job Description",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//       {
//         title: "Company Benefits",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//     ],
//     postedTime: "2 days ago",

//     applicants: "150 Applicants",
//   },


exports.addJob = async (req, res) => {



    try {

        let job = await Job.create(req.body)

        return res.status(201).json({ message: 'Job Created', job })

    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
exports.editJob = async (req, res) => {


    const { id, createdby, title, company, logoColor, jobType, workType, location, experience, salary, tags, jobFunction, qualifications, description, responsibilities } = req.body

    try {

      
        let update = await Job.findByIdAndUpdate(id, {
            "createdby": createdby,
            "title": title,
            "company": company,
            "logoColor": logoColor,
            "location": location,
            "jobType": jobType,
            "workType": workType,
            "experience": experience,
            "salary": salary,
            "postedTime": 'today',
            "tags": tags,
            "jobFunction": jobFunction,
            "type": jobType,
            "description": description,
            "qualifications": qualifications,
            "responsibilities": responsibilities
        });
   
        return res.status(201).json({ message: 'Job Created', update })

    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}


exports.getJob = async (req, res) => {


    try {
        let job = await Job.find();

        return res.status(201).json({ message: 'Fetch Job', job })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
exports.getJobId = async (req, res) => {

    const jobid = req.header('jobid')
    try {
        let job = await Job.findById(jobid);

        return res.status(201).json({ message: 'Fetch Job single', job })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}

exports.deleteJob = async (req, res) => {

    const jobid = req.header('jobid')
    try {
        let job = await Job.findByIdAndDelete(jobid);

        return res.status(201).json({ message: ' delete job', job })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}

exports.getJobIdUser = async (req, res) => {

    const userId = req.header('userid')
    try {
        let job = await Job.find({ createdby: userId });

        return res.status(201).json({ message: 'Fetch Job', job })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
