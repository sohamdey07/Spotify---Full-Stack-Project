import express from "express";
import multer from "multer";
import { createMusic , createAlbum} from "../controllers/music.controller.js";

const router = express.Router();
const upload =multer({
    storage:multer.memoryStorage(),
});

router.post("/create", upload.single("music"), createMusic);
router.post("/album/create",createAlbum);

export default router;