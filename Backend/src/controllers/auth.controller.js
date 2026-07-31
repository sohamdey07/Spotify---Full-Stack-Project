import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

// function to register a new user
async function registerUser(req, res) {
    const { username, email, password, role="user" } = req.body;

    const isUserExists =await userModel.findOne({ $or: [{ username:username }, { email:email }] });

    // Check if the user already exists
    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser= await userModel.create({ 
            username, email, password: hashedPassword, role });
        // Generate a JWT token
        const token = jwt.sign({id:newUser._id, role:newUser.role},process.env.JWT_SECRET);
        // Set the token in a cookie
        res.cookie("token",token);

        res.status(201).json({ message: "User registered successfully"});
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//function to login a user
async function loginUser(req,res){
    const {username,email,password}=req.body;

    const user=await userModel.findOne({ $or: [{ username }, { email }] });

    if(!user){
        return res.status(400).json({"message":"User not found!"});
    }

    //compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({"message":"Invalid credentials!"});
    }

    const token=jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({ message: "Login successful",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    });

}

//function to logout a user
async function logoutUser(req,res){
    try{
        await res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Logout failed" });
    }
}


export { registerUser, loginUser, logoutUser };