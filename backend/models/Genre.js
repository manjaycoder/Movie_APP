import mongoose from "mongoose";
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    unique: true,
  },
});
export default mongoose.model("Genre", genreSchema);
