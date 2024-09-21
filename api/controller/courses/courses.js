// {
//     title: "Ultimate JavaScript Course",
//     description:
//       "Master JavaScript from basics to advanced concepts. Includes ES6+, async programming, and more.",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
//     progress: 75,
//     duration: "20 hours",
//     lessons: 150,
//     rating: 4.9,
//     tags: ["JavaScript", "Web Development"],
//     difficulty: "Intermediate",
//     students: 15000,
//   },

exports.addCourses = async (req, res) => {

    let { title, company, logoColor, location, jobType, workType, experience, salary, postedTime, tags, jobFunction } = req.body

    try {
       
        let data = {
            
        }


        return res.status(201).json({ message: 'User Created', data })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}


exports.getCourses = async (req, res) => {

    let { title, company, logoColor, location, jobType, workType, experience, salary, postedTime, tags, jobFunction } = req.body

    try {
       
        let data = {
            
        }


        return res.status(201).json({ message: 'User Created', data })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
