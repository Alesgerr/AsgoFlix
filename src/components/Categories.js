import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";
import { Link, useParams } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";

const Categories = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("movies");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [itemsInCategory, setItemsInCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {id} = useParams()
  console.log(id);
  const fetchGenres = async () => {
    try {
      const apiKey = "f345faa446485deffb377e9fe52e2792";

      const [movieGenresResponse, tvGenresResponse] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
        ),
      ]);

      setMovieGenres(movieGenresResponse.data.genres);
      setTvGenres(tvGenresResponse.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchItems = async (category, genreId, page = 1) => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";
    try {
      let response;

      if (category === "movies") {
        if (genreId) {
          response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
          );
        }
      } else if (category === "tv") {
        if (genreId) {
          response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
          );
        }
      }

      setItemsInCategory(response.data.results);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedGenre("");
    // Kategori seçilmediğinde tüm filmleri veya dizileri ilk sayfadan getir
    fetchItems(category, "", 1);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchItems(selectedCategory, genreId, 1);
  };

  const handlePageChange = (page) => {
    fetchItems(selectedCategory, selectedGenre, page);
  };

  useEffect(() => {
    // Başlangıçta tüm filmleri veya dizileri ilk sayfadan getir
    fetchItems(selectedCategory, "", 1);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto mt-10 overflow-hidden">
      <div className="flex flex-wrap gap-1 px-4">
        <div className="mb-5 text-white flex w-50 flex-col gap-6">
          {/* <Select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} size="md"
        className="p-2 border rounded bg-gray-600 border-none cursor-pointer"
        >
            <Option value="movies">Movies</Option>
            <Option value="tv">TV Shows</Option>
        </Select> */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border rounded bg-gray-600 border-none cursor-pointer"
          >
            <option value="movies">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>

        {selectedCategory && (
          <div className="mb-5 text-white flex w-50 flex-col gap-6">
            <select
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="p-2 border rounded bg-gray-600 border-none cursor-pointer"
            >
              <option value="">Select a genre</option>
              {selectedCategory === "movies" &&
                movieGenres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              {selectedCategory === "tv" &&
                tvGenres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {itemsInCategory.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {itemsInCategory.map((item) => (
            <div key={item.id} className="p-4 rounded-md shadow-md relative">
              <Link
                to={`/${selectedCategory === "tv" ? "tv" : "movies"}/${
                  item.id
                }`}
              >
                <div className="movCard">
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${
                        item?.poster_path || item?.backdrop_path
                      }`}
                      alt={item?.title || item?.name}
                      className="w-full h-64 object-cover rounded-md mb-2"
                    />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                  </div>
                  <div className="py-2">
                    <h3 className="text-sm font-bold">
                      {item?.title || item?.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-black dark:text-white">
                    {/* <p className="text-gray-500">
                           {item?.release_date || item?.first_air_date}
                        </p> */}
                    {/* <div className="flex items-center gap-2">
                           <FaStar className="text-yellow-400" />
                           <span>{item?.vote_average.toFixed(2)}</span>
                        </div> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="px-4">No items to display.</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-start rounded-lg justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            className="bg-black py-2 px-2 text-white"
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
