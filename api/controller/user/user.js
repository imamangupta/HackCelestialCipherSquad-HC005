const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, EMAILPASS, EMAILUSER } = require('../../config/config');
const UserOtp = require("../../models/UserOtp");
const nodemailer = require("nodemailer");



exports.addUser = async (req, res) => {
    const { username, email, password, role, firstname, lastname } = req.body;
    try {
        // Check if the email already exists
        let findemail = await UserOtp.findOne({ email: email });
        if (findemail) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        let findemailuser = await User.findOne({ email: email });
        if (findemailuser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        let findemailusername = await User.findOne({ userName: username });
        if (findemailusername) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Generate OTP
        let min = 100000;
        let max = 999999;
        let myotp = Math.floor(Math.random() * (max - min + 1)) + min;

        // Setup transporter for nodemailer
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: EMAILUSER,  // Use environment variables for credentials
                pass: EMAILPASS,
            },
            secure: true,
        });

        // Verify the connection to the email server
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        // Mail configuration
        const mailData = {
            from: `"CodePathshala" <${EMAILUSER}>`,
            to: email,
            subject: "OTP Verification",
            html: `<p>Your OTP is: <b>${myotp}</b></p>`,
        };

        // Send the email
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user with OTP in the database
        const user = await UserOtp.create({
            userName: username,
            email: email,
            password: hashedPassword,
            role: role,
            otp: myotp,  // Store the actual OTP, not the string 'myotp'
            firstname: firstname,
            lastname: lastname,
        });

        res.json({ message: 'User created successfully', user });

    } catch (error) {
        console.error(error);
        res.status(500).send("Some error occurred");
    }
};
exports.chekotp = async (req, res) => {
    try {
        const { email, userotp } = req.body;

        // Find user by email in UserOtp collection
        let findemail = await UserOtp.findOne({ email: email });
        if (!findemail) {
            return res.status(400).json({ error: "Invalid email or OTP" });
        }

        // Check if OTP matches
        if (findemail.otp === userotp) {
            // Hash the password before deletion
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(findemail.password, salt);

            // Create the user in User collection
            const user = await User.create({
                userName: findemail.userName,
                email: findemail.email,
                password: hashPass,
                role: findemail.role,
            
            });

            // Delete the user from UserOtp after successful user creation
            await UserOtp.findByIdAndDelete(findemail._id);

            // Populate the role and remove the password from the response
            let newUser = await User.findById(user.id).populate('role');
            let myUser = await User.findById(user.id).select('-password');

            // Prepare user object for JWT
            let userObject = {
                userName: newUser.userName,
                email: newUser.email,
                id: newUser._id,
            };
            
            if (newUser.role) {
                userObject.roleName = newUser.role;
            }

            // Create JWT token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: '59m' });

            let data = {
                token,
                userObject: myUser,
            };

            if (newUser.role) {
                data.role = newUser.role;
            }

            // Send the response with the token and user data
            return res.status(201).json({ message: 'User Created', data,lastname:findemail.lastname,firstname:findemail.firstname });

        } else {
            return res.status(400).json({ error: "OTP verification failed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Crash" });
    }
};







// exports.addUser = async (req, res) => {

//     let { email, userName, password, role } = req.body

//     try {

//         let emailfind = await User.findOne({ email: req.body.email })
//         if(emailfind){
//             return res.status(201).json({ error: 'email Exited Allready' })
//         }

//         let usernamefind = await User.findOne({ userName: req.body.userName })
//         if(usernamefind){
//             return res.status(201).json({ error: 'Username Exited Allready' })
//         }



//         const salt = await bcrypt.genSalt(10);
//         const hashPass = await bcrypt.hash(password, salt);

//         let user = await User.create({
//             userName: userName,
//             email: email,
//             password: hashPass,
//             role: role,
//         })


//         let newUser = await User.findById(user.id).populate({
//             path: 'role'
//         })

//         let myUser = await User.findById(user.id).select('-password')

//         let userObject = {
//             userName: newUser.userName,
//             email: newUser.email,
//             id: newUser.id

//         }
//         userObject.roleName = user.role;

//         if (newUser.role) {
//             userObject.roleName = newUser.role
//         }

//         const token = jwt.sign(
//             userObject,
//             `${JWT_SECRET}`,
//             {
//                 expiresIn: `59m`
//             }
//         );

//         let data = {
//             token
//         }

//         data.userObject = myUser
//         if (newUser.role) {
//             data.role = role
//         }

//         return res.status(201).json({ message: 'User Created', data })
//     } catch (error) {
//         return res.status(500).json({ error: "Server Crash" });
//     }
// }

exports.loginUser = async (req, res) => {

    let { password } = req.body

    try {

        let user = await User.findOne({
            email: req.body.email
        }).populate(
            {
                path: 'role',
            }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found. you have entered wrong email.' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(404).json({ message: 'Wrong password.' });
        }

        const newuser = await User.find({ _id: user._id }).select('-password')

        let { userName, email, id } = user;

        let userObject = {
            userName, email, id
        };


        if (!user.role) {
            return res.status(400).json({ message: 'user has no role' });
        }

        userObject.roleName = user.role;

        const token = jwt.sign(
            userObject,
            `${JWT_SECRET}`,
            {
                expiresIn: `59m`
            }
        );

        let data = {
            token,
            userObject: newuser
        };

        if (user.role) {
            data.role = user.role;
        }

        return res.status(200).json({ message: 'User LoggedIn Successfuly', data });
    } catch (error) {
        return res.status(500).json({ error: "Server Crash" });
    }
}

exports.getUser = async (req, res) => {
    try {
        // Check if the authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        const token = req.headers.authorization.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Respond with user data if verification is successful
        return res.status(200).json({ message: 'User logged in successfully', user: decoded });

    } catch (error) {
        // Handle token errors (invalid or expired token)
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // General server error
        return res.status(500).json({ error: 'Server error, please try again later' });
    }
}
