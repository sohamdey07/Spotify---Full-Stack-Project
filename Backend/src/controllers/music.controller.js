import musicModel from "../models/music.model.js";
import userModel from "../models/user.model.js";
import albumModel from "../models/album.model.js";
import {uploadMusicFile} from "../services/storage.service.js";
import jwt from "jsonwebtoken";

//function to create music
async function createMusic(req, res) {
    
    const {title} =req.body;
    const file=req.file;

    if(!file){
        return res.status(400).json({message:"No file uploaded"});}

    const result=await uploadMusicFile(file.buffer.toString('base64'));

    const newMusic= await musicModel.create({
        uri:result.url,
        title:title,
        artist:req.user.id
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

//function to create album
async function createAlbum(req,res){
        
    const {title,musics} =req.body;

    const newAlbum=await albumModel.create({
        title:title,
        artist:req.user.id,
        musics:musics
    });
    res.status(201).json({
        message:"Album created successfully",
        album:{
            id:newAlbum._id,
            title:newAlbum.title,
            artist:newAlbum.artist,
            musics:newAlbum.musics
        }
    });
}




export { createMusic , createAlbum };