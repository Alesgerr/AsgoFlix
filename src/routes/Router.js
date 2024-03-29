import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Tv from "../pages/Tv/Tv";
import Movies from "../pages/Movies/Movies";
import Header from "../components/Header";
import TvDetails from "../pages/Tv/TvDetails";
import MoviesDetails from "../pages/Movies/MoviesDetails";
import PeopleDetails from "../components/PeopleDetails";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Register from "../pages/Register";
import ForgotPass from "../components/ForgotPass";
import Login from "../pages/Login";
import Profile from "../pages/Profile/Profile";
import GenreMovies from "../pages/Genres/GenreMovies";
import GenreTvSeries from "../pages/Genres/GenreTvSeries";
import AddProduct from "../components/AddProduct";

export default function Router() {
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
           <Route path="tv" element={<Tv />} />
           <Route path="tv/:id" element={<TvDetails />} />
           <Route path="movies" element={<Movies />} />
           <Route path="movies/:id" element={<MoviesDetails />} />
           <Route path="actor-details/:id" element={<PeopleDetails />} />
           <Route path="categories" element={<Categories />} />
           <Route path="genres/movies/:id" element={<GenreMovies />} />
           <Route path="genres/tv-series/:id" element={<GenreTvSeries />} />
           <Route path="profile" element={<Profile />} />
           <Route path="sign-up" element={<Register />} />
           <Route path="sign-in" element={<Login />} />
           <Route path="sign-in/forgot-password" element={<ForgotPass />} />
           <Route path="sign-up/forgot-password" element={<ForgotPass />} />
           <Route path="add-product" element={<AddProduct />} />

           {/* <Route path="movie/:id" element={<MovieDetails />} /> */}
         </Route>
       </Routes>
     </BrowserRouter>
   );
}
const Layout = () => {

return (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
};