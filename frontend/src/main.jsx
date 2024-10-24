import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import PrivateRoute from "./component/pages/Auth/PrivateRoute.jsx";
///auth
import Profile from "./component/pages/User/Profile.jsx";
import AdminRoutes from "./component/pages/Admin/AdminRoutes.jsx";
import GenreList from "./component/pages/Admin/GenreList.jsx";
import AdminMoviesList from './component/pages/Admin/AdminMoviesList.jsx'
import AllComments from './component/pages/Admin/AllComments.jsx'
//RESTRICTED
import Home from "./component/pages/Home.jsx";
import Login from "./component/pages/Auth/Login.jsx";
import Register from "./component/pages/Auth/Register.jsx";
import CreateMovie from "./component/pages/Admin/CreateMovie.jsx";
import UpdateMovie from "./component/pages/Admin/UpdateMovie.jsx";
import AllMovies from "./component/pages/Movies/AllMovies.jsx";
import MovieDetails from "./component/pages/Movies/MovieDetails.jsx";
import AdminDashboard from "./component/pages/Admin/Dashboard/AdminDashboard.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route auth="/" element={<App />}>
      <Route index={true} path="/movies" element={<Home />} />
      <Route path="/" element={<AllMovies/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies/:id" element={<MovieDetails/>}/>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList/>} 
        />
        <Route path="/admin/movies/comment" element={<AllComments />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
           <Route path="/admin/movies/update/:id" element={<  UpdateMovie/>}/>
           
    
         
        
        <Route path="/admin/movies/create" element={<CreateMovie />} />
   
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
