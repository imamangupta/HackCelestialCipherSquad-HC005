const Resume = require("../../models/Resume");

exports.addResume = async (req, res) => {

    let { userid,data} = req.body

    try {
        let resume = await Resume.findOne({ userid: userid });
        if(!resume){
            let application = await Resume.create({
                userid: userid,
                data:data
            })
            return res.status(201).json({ message: ' not found data',application})
        }else{

            
            
            let update = await Resume.findOneAndUpdate({ userid: userid }, {
                "userid": userid,
                "data": data,
                
            });
            return res.status(201).json({ message: 'application Created', update })
        }
     
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}


exports.getResume = async (req, res) => {

    const userid = req.header('userid')
    try {
       
        let resume = await Resume.find({ userid: userid });
        if(!resume){

            return res.status(201).json({ message: ' not found data'})
        }

        return res.status(201).json({ message: 'userresume fetch', resume })
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}
