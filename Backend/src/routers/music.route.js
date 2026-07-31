import express from "express";
import multer from "multer";
import {authArtist , authUser} from "../middlewares/auth.middleware.js";
import { createMusic , createAlbum , getAllMusics ,getMusicById,updateMusicById, getAllAlbums, getAlbumById} from "../controllers/music.controller.js";

const router = express.Router();
const upload =multer({
    storage:multer.memoryStorage(),
});


router.post("/create", authArtist, upload.single("music"), createMusic);
router.get("/all",authUser, getAllMusics);
router.get("/:id", authUser, getMusicById);
router.patch("/update/:id", authArtist, upload.single("music"), updateMusicById);

router.post("/album/create", authArtist, createAlbum);
router.get("/album/all", authUser, getAllAlbums);
router.get("/album/:id", authUser, getAlbumById);

export default router;