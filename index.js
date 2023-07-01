const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const connectDB = require("./database/db");
const authRouter = require("./routes/user.route");

const app = express();
app.use(express.json());

connectDB();

app.get(["/signUp", "/"], (req, res) => {
    res.send("Welcome, kindly fill in your details for registration");
});

app.use("/auth",authRouter);

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`server is listening on port ${port}`));

