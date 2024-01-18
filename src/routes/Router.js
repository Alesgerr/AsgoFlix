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

export default function Router() {
   return(
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

          {/* <Route path="movie/:id" element={<MovieDetails />} /> */}

         </Route>
         </Routes>
      </BrowserRouter>
   )
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