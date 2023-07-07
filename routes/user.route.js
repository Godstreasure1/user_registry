const express = require("express");

const {
    validateRegisterInput,
    validateLoginInput,
} = require ("../middleware/auth.validation");

const {
    register,
    login,
    verifyUser,
} = require ("../controllers/user.controller");

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login );
router.post("/verify", verifyUser); 

module.exports = router;