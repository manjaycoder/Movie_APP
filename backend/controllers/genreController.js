import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Create a new genre
const createGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const existing = await Genre.findOne({ name });
  if (existing) {
    return res.status(400).json({ error: "Genre already exists" });
  }

  const genre = await new Genre({ name }).save();
  res.status(201).json(genre); // Return a 201 status for successful creation
});

// Update a genre
const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }

  genre.name = name;
  const updatedGenre = await genre.save();
  res.json(updatedGenre);
});

// Remove a genre
const removeGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const removed = await Genre.findByIdAndDelete(id);

  if (!removed) {
    return res.status(404).json({ error: "Genre not found" });
  }

  res.json({ message: "Genre removed successfully", genre: removed });
});

// List all genres
const listGenres = asyncHandler(async (req, res) => {
  const all = await Genre.find({});
  res.json(all);
});

// Read a specific genre
const readGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }

  res.json(genre);
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
