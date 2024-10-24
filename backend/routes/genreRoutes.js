import express from "express";

const router = express.Router();

// Controller imports
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

// Middleware imports
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Route definitions
router.route("/").post(authenticate, authorizeAdmin, createGenre); // Create a new genre

router.route("/allGenres").get(listGenres); // List all genres

router
  .route("/:id")
  .get(readGenre) // Read a specific genre by ID
  .put(authenticate, authorizeAdmin, updateGenre) // Update a specific genre by ID
  .delete(authenticate, authorizeAdmin, removeGenre); // Delete a specific genre by ID

export default router;
