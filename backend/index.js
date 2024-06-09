// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { error } from "console";

// Constants
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Configuration
dotenv.config();
const dBpromise=connectDB();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());//securely stores cookies. only server can acceess these


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Connection with DB
dBpromise
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
    app.on(error,()=>{
        console.log("App FAILED to connect to DB. ERROR: ", error);
    })
})
.catch((error)=>{
    console.log("SERVER FAILED to connect to DB. ERROR: ", error);
})
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
