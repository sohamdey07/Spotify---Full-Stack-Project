import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.route.js";
import musicRouter from "./routers/music.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

//authentication route
app.use("/api/auth", authRouter);
//music route
app.use("/api/music", musicRouter);

export default app;