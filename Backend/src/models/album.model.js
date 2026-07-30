import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Music"
    }]
},{timestamps:true});

const Album = mongoose.model("Album",albumSchema);
export default Album;