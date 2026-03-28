
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/users.routes.js";
import fileRoutes from "./routes/file.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// console.log("ENV CHECK:", process.env.CLOUDINARY_API_KEY);

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB Connected"))
  .catch(err=> console.log(err));

app.listen(5000, ()=> console.log("Server running on 5000"));