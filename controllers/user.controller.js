const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req,res) => {
    let { firstName, lastName, email, password } = req.body;

    const fullNames = firstName.split(" ")[0]

    try {
         const userExist = await user.findOne({email});
         if (userExist) {
            return res(400).json({
                message: `Hi ${firstName} you already registered, click next`,
            });
         }

         password = await bcrypt.hash(password, 8);

         await user.register ({
            firstName,
            lastName,
            email,
            age,
            password,
         });
         return res.status(201).json({
            message: `Hi ${firstName}, your registration is successfull`, 
         });
    } catch (error) {
        return res.status(500).json({error: error.message});
        
    }
};

module.exports=register;