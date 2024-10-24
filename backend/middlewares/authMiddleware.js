import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
//check if the user is authenticated
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  //read jwt from the jwt cookies
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});
//check if tje user is admin or not
const authorizeAdmin = (req, res, next) => {
  // Check if the user exists and if they are an admin
  if (req.user && req.user.isAdmin) {
    next(); // User is authorized, proceed to the next middleware
  } else {
    res.status(401).send("NOT AUTHORIZED AS AN ADMIN"); // User is not authorized
  }
};

export { authenticate, authorizeAdmin };
