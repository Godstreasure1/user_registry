const mongoose=require("mongoose");

const userSchema= new mongoose.Schema (
    {
        firstName:{
            type: String,
            required:true,

        },

        lastName:{
            type:String,
            required:true,
        },

        Email:{
            type: String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        Age:{
            type: Number,
            required:true,
        },
    },
    {timestamps: true}
    
);
 const user= mongoose.model("user", userSchema);

 module.exports = user;