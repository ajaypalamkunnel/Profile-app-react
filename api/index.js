import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


  console.log(process.env.MONGODB_URI) // Correct connection string
 
    
  mongoose
  .connect(process.env.MONGODB_URI) // Correct connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });


const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
