// const express = require("express");
import express from "express";
const app = express();
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
// const helmet = require("helmet");
import helmet from "helmet";
// const morgan = require("morgan");
import morgan from "morgan";
// const userRoute = require("./routes/users");
import userRoute from "./routes/users.js";
// const postRoute = require("./routes/posts");
import postRoute from "./routes/posts.js";
// const authRoute = require("./routes/auth");
import authRoute from "./routes/auth.js";
// const cors = require("cors");
import cors from "cors";
// const multer = require("multer");
import multer from "multer";
// const path = require("path");
import path from "path";

dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MongoDB")
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name);
    }
})
const upload = multer({storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully")
    }
    catch(err){
        console.log(err);
    }
})
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);

// Serve the index.html file if the env is production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, ".", "build", "index.html"))
    );
  }

app.listen(PORT,()=>{
    console.log("Backend server is running!");
})