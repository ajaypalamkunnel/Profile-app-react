import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

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
