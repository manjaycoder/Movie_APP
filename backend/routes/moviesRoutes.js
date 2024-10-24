import express from "express";
const router = express.Router();

//controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovies,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";
//middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { create } from "ts-node";

//public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);
//Restricted Routes
router.post("/:id/reviews", authenticate, checkId, movieReview);
router.get("/new-movies", getNewMovies);
//Admin
router.put(
  "/update-movie/:id/reviews",
  authenticate,
  authorizeAdmin,
  updateMovie,
);
router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovies);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

export default router;
