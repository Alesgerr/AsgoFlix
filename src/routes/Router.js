import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Tv from "../pages/Tv";
import Movies from "../pages/Movies";
import Header from "../components/Header";
import MovieDetails from "../components/MovieDetails";

export default function Router() {
   return(
      <BrowserRouter>
         <Routes>
         <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tv" element={<Tv />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:id" element={<MovieDetails />} />

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
    {/* <Footer /> */}
  </>
);
};