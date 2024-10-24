import Movie from "../models/Movie.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const getSpecificMovie = await Movie.findById(id);
    if (!getSpecificMovie) {
      return resstatus(404).json({ message: "Movie not found" });
    }
    res.json(getSpecificMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updateMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;

      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.numReviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};
const deleteMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({
      message: "Movie deleted successfully",
    });
    res.json(deletedMovie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ messag: "Comment not found" });
    }
    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRandomMovies=async(req,res)=>{
  try {
    const movies=await Movie.aggregate([{$sample:{size:10}}])
    res.json(movies);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
}
export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovies,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies
};
