import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();

console.log(process.env.MONGODB_URI); // Correct connection string
mongoose.set("debug", true);
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
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)


//middleware
app.use((err,req,res,next)=>{
  console.log("ith middle where");
  console.log("===>",err.statuscode);
  
  const statusCode = err.statuscode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    status: 'error',
    message: message,
    statusCode:statusCode
  })
})

