# Moves App 🚀

Welcome to the Moves App! This project is a full-stack web application designed to help users track and manage their movements and activities. It utilizes a robust backend powered by Node.js and MongoDB, and a sleek frontend built with React and Tailwind CSS.

## Table of Contents 📚

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features ✨

- **User Authentication**: Secure login and registration system.
- **Activity Tracking**: Easily log and manage various activities.
- **Responsive Design**: Beautiful UI that works on all devices.
- **Dynamic Routing**: Seamless navigation with React Router.
- **Real-time Updates**: Instant feedback and updates on the user interface.

## Technologies 🛠️

- **Backend**:
  - **MongoDB**: NoSQL database for storing user and activity data.
  - **Express**: Web framework for building APIs.
  - **Dotenv**: Environment variable management.
  - **Nodemon**: Tool for automatically restarting the server during development.

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **React Router**: Declarative routing for React applications.
  - **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
  - **Flowbite**: Component library built on Tailwind for additional UI components.

## Installation 🔧

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/moves-app.git
   cd moves-app
2. **Install backend dependencies**:
   cd backend
   npm install
3. **Set up environment variables: Create a .env file in the backend directory and add your MongoDB connection string**:
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
4. **Start the backend server**:
   npm run dev
5. **Install frontend dependencies**:
   cd frontend
   npm install
6. **Start the frontend development server**:
   npm start
## Usage 🖥️

Once the servers are running, open your browser and navigate to `http://localhost:3000`. You can register, log in, and start tracking your activities!

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





const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  // Validate that name is provided
  if (!name) {
    return res.status(400).json({ error: "Genre name is required." });
  }

  // Validate the ObjectId

  // Find the genre by ID
  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).json({ error: "Genre not found." });
  }

  // Update the genre name
  genre.name = name.trim(); // Trim whitespace from the name
  const updatedGenre = await genre.save();

  // Respond with the updated genre
  res.status(200).json(updatedGenre);
});







