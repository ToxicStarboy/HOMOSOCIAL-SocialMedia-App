const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const cors = require("cors");
const multer = require("multer");
// const path = require("path");

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// const {fileURLToPath} = require('url');
// // import { fileURLToPath } from "url";
// const path = require('path')
// // import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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