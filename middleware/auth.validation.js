const validateRegisterInput= (req,res,next) => {
    let { firstName, lastName, email, password } = req.body;

    switch (true) {
        case !firstName || typeof firstName !== "string" || firstName.length < 5:
            return res.status(400).json({
                message: "firstName is required and be in string and it must be valid",
            });

         case !lastName || typeof lastName !== "string" || lastName.length < 4:
                return res.status(400).json({
                    message: "lastName is required and must be in string and it must be valid",
                });

         case !email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
                    return res.status(400).json({
                        message: "email is required and must be in string",
                    });

         case !password || typeof password !== "string" || password.length < 8:
                        return res.status(400).json({
                            message: "password is required and must be more than 5 characters",
                        });
                        default:
                            next();

    }

};

const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "email is required "});
    if (!password)
    return res.status(400).json({ message: "password is required"});
    next();
};
module.exports = {
    validateRegisterInput,
    validateLoginInput,
};