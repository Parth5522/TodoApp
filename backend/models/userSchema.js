import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    name: {
        type: String,
        required : [true, "Please Provide Your Name"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required : [true, "Please Provide Your Email"],
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    password: { 
        type: String,
        required: [true, 'Password is Required'],
        minLength: [8, "Password must contain at least 3 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//hashing the pasword
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing passswrod
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//generating a jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);
