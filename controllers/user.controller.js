const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const  sendMail = require("../utils/email");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const register = async (req,res) => {
    let { firstName, lastName, email, password } = req.body;

    const firstPartOfName = firstName.split(" ")[0]

    try {
         const userExist = await user.findOne({email});
         if (userExist) {
            return res.status(400).json({
                message: `Hi ${firstName} you already registered, click next`,
            });
         }

         password = await bcrypt.hash(password, 8);

         const user = await User.create({
            firstName,
            lastName,
            email,
            age,
            password,
         });


         await user.register ({
            firstName,
            lastName,
            email,
            age,
            password,
         });

         const token = jwt.sign({ id: user._id, email}, process.env.JWT_SECRET,{
            expiresIn: "1d",
         });

         const verificationUrl = process.env.VERIFICATION_URL + "?token=" + token;

         const subject = "Welcome to User_registration";
         const text = "Welcome to User_registration";
         const html = `<h1>Hello ${firstName}<h1> <p> welcome to your registration platform, kindly click the link below to verify your account </p> 
         <h3>${verificationUrl}</h3>`;

         await sendMail(email, subject, text, html);
         return res.status(201).json({
            message: `Hi ${firstName}, your registration is successfull`, 
         });
     } catch (error) {
        return res.status(500).json({error: error.message});
        
    }
};

const verifyUser = async (req,res) => {
    const token = req.query.token;
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodeToken) return res.status(401).json({ message: "Unauthorized"});
        let user = await User.findById(decodeToken.Id);
        if (!user) return res.status(401).json({message:"Unauthorized"});
        if (user.isVerified) return res.status(400).json({ message: `Hello ${firstName} your account is verified`});
        user.isVerified = true;
        await user.save();

        return res.redirect(process.env.REDIRECT_URL);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req,res) => {
    let { email, password } = req.body;
    email = email.tolowerCase();
    try {
        const userExist = await user.findOne({ email });
        if (!userExist) {
            return res.status(400).json({message:`you dont have an account,kindly register`});
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) return res.status(400).json({ messsage: "incorrect password" });

        const forgotPassword = async (req, res) => {
            const {email} = req.body;
            try {
                const response = await fetch("https://email/password/reset", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email})
                });
                if (response.ok) return res.status(200).json({message:"Password reset instructions sent to your email"});
                if (!response.ok) return res.status(401).json({message:"Password reset failed. Please try again"});
            } catch (error) {
                return res.status(500).json({ error: error.message});
            }
        };

        const token = jwt.sign(
            { id: userExist._id, email: userExist.email }, process.env.JWT_SECRET,{ expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly:true,
            secure: false,
            maxAge: 3600000,

        });

        return res.status(200).json({
            message: "user logged in successfully",
            status: "success",
            token,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };

};
    
  
module.exports= {
    register,
    login,
    verifyUser,
};