import express from "express";
import multer from "multer";
import {authArtist} from "../middlewares/auth.middleware.js";
import { createMusic , createAlbum} from "../controllers/music.controller.js";

const router = express.Router();
const upload =multer({
    storage:multer.memoryStorage(),
});

router.post("/create", authArtist, upload.single("music"), createMusic);
router.post("/album/create", authArtist, createAlbum);

export default router;