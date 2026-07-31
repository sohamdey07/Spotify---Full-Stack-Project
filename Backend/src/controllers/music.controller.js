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

//function to get all musics
async function getAllMusics(req,res){
    const musics = await musicModel
    .find()
    .limit(2)
    .populate("artist","username email");


    if(!musics){
        return res.status(404).json({message:"No musics found"});
    }
    res.status(200).json({
        message:"Musics fetched successfully",
        musics:musics
    });
}

//function to get specific music by id
async function getMusicById(req,res){
    const music = await musicModel.findById(req.params.id).populate("artist","username email");
    if(!music){
        return res.status(404).json({message:"Music not found"});
    }
    res.status(200).json({
        message:"Music fetched successfully",
        music:music
    });
}

//function to update uploaded music by id
async function updateMusicById(req,res){
    const music = await musicModel.findById(req.params.id);
    if(!music){
        return res.status(404).json({message:"Music not found"});
    }
    try
    {
        const title = req.body?.title;
        const file=req.file;
        if(file){
            const result=await uploadMusicFile(file.buffer.toString('base64'));
            music.uri=result.url;
        }
        if(title){
            music.title=title;
        }
        await music.save();
        res.status(200).json({
            message:"Music updated successfully",
            music:music
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Error updating music"});
    }
}

//get all albums
async function getAllAlbums(req,res){
    const albums = await albumModel
        .find()
        .select("title artist")
        .populate("artist","username");

    if(!albums){
        return res.status(404).json({message:"No albums found"});
    }
    res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums
    });
}

//get album by id
async function getAlbumById(req,res){
    const album = await albumModel.findById(req.params.id);
    if(!album){
        return res.status(404).json({message:"Album not found"});
    }
    res.status(200).json({
        message:"Album fetched successfully",
        album:album
    });
}

export { createMusic , createAlbum , getAllMusics , getMusicById,updateMusicById, getAllAlbums , getAlbumById};