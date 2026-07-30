import musicModel from "../models/music.model.js";
import userModel from "../models/user.model.js";
import {uploadMusicFile} from "../services/storage.service.js";
import jwt from "jsonwebtoken";

async function createMusic(req, res) {
    const token=req.cookies.token;
    
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

        if(decodedToken.role!=="artist"){
            return res.status(403).json({message:"You do not have access to create music"});
        }

        const {title} =req.body;
        const file=req.file;

        if(!file){
            return res.status(400).json({message:"No file uploaded"});}

        const result=await uploadMusicFile(file.buffer.toString('base64'));

        const newMusic= await musicModel.create({
            uri:result.url,
            title:title,
            artist:decodedToken.id
        });
        res.status(201).json({
            message:"Music created successfully",
            music:{
                id:newMusic._id,
                title:newMusic.title,
                uri:newMusic.uri,
                artist:newMusic.artist
            }
        });
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"});
    }

}



export { createMusic };