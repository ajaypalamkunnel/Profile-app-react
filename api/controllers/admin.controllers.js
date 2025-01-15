import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signin = (req, res, next) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_ID = process.env.ADMIN_ID;
  //console.log(ADMIN_USERNAME, ADMIN_PASSWORD);

  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ id: ADMIN_ID }, process.env.JWT_SECRET_ADMIN, {
        expiresIn: "1h", // Token validity period
      });
      const expiry = new Date(Date.now() + 3600000);

      res
        .cookie("access_token_admin", token, {
          httpOnly: true,
          expires: expiry,
        })
        .status(200)
        .json({ username });
      console.log(res);
      console.log("Admin signed in:", username);
    } else {
      return next(errorHandler(401, "Invalid admin credentials"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const dashboard = async (req, res, next) => {
  try {
    const users = await User.find({}, "username email profilePicture");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const addNewProfile = async (req, res, next) => {
  console.log("addNewProfile");
  
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];

      return res.status(400).json({
        message: `The ${duplicateField} "${error.keyValue[duplicateField]}" is already in use.`,
      });
    }
    next(error);
  }
};

export const signout = async (req, res, next) => {
  res.clearCookie("acces_token_admin").status(200).json("Signout message");
};
