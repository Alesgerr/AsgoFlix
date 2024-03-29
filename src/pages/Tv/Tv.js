import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Tv = () => {
  const [movieData, setMovieData] = useState([]);
  const [sortBy, setSortBy] = useState("vote_average.desc");
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=f345faa446485deffb377e9fe52e2792&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortBy}`
      );

      const zeroRatingMovies = res.data.results.filter(
        (movie) => movie.vote_average === 0
      );

      const otherMovies = res.data.results.filter(
        (movie) => movie.vote_average !== 0
      );

      let sortedMovies = [];
      if (sortBy === "vote_average.desc") {
        sortedMovies = [
          ...otherMovies.sort((a, b) => b.vote_average - a.vote_average),
          ...zeroRatingMovies,
        ];
      } else if (sortBy === "vote_average.asc") {
        sortedMovies = [
          ...otherMovies.sort((a, b) => a.vote_average - b.vote_average),
          ...zeroRatingMovies,
        ];
      } else if (sortBy === "first_air_date.desc") {
        sortedMovies = [
          ...otherMovies.sort(
            (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
          ),
          ...zeroRatingMovies,
        ];
      } else if (sortBy === "first_air_date.asc") {
        sortedMovies = [
          ...otherMovies.sort(
            (a, b) => new Date(a.first_air_date) - new Date(b.first_air_date)
          ),
          ...zeroRatingMovies,
        ];
      }

      setMovieData(sortedMovies);
    } catch (error) {
      console.error("Axios request error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-between">
      <div className="flex flex-wrap px-2 justify-center mt-3 mb-3 gap-2 container mx-auto">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="mr-4 p-2 border rounded dark:bg-black"
        >
          <option disabled value="sort">
            Sort
          </option>
          <option value="vote_average.desc">High to Low Rating</option>
          <option value="vote_average.asc">Low to High Rating</option>
          <option value="first_air_date.asc">Oldest to Newest</option>
          <option value="first_air_date.desc">Newest to Oldest</option>
        </select>
        <div className="flex">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-2 border rounded ${
              page === 1 ? "bg-gray-400 opacity-40" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="ml-2 p-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 cursor-pointer">
        {movieData?.map((dt, i) => (
          <div
            className="relative w-36 lg:w-72 hover:scale-105 transition-transform"
            key={i}
          >
            <Link to={`/tv/${dt.id}`}>
              <div className="relative">
                {dt?.backdrop_path || dt?.poster_path ? (
                  <div>
                    <img
                      className="h-64 object-cover rounded-2xl"
                      width={500}
                      height={450}
                      src={`https://image.tmdb.org/t/p/original/${
                        dt?.backdrop_path || dt?.poster_path
                      }`}
                    />
                  </div>
                ) : (
                  <img
                    className="h-64 object-cover rounded-2xl"
                    width={500}
                    height={450}
                    src={`https://m.media-amazon.com/images/I/61s8vyZLSzL.jpg`}
                  />
                )}
                <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
                <div className="absolute text-white bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                  <div className="text-1xl font-bold">{dt?.name}</div>
                  <div className="text-1xl font-bold">
                    <div className="flex">{dt?.first_air_date}</div>
                    <div className="flex items-center">
                      <FaStar className="me-1 text-yellow-500" />{" "}
                      {dt?.vote_average.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-1 justify-end mt-3 px-3 py-5">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 border rounded ${
            page === 1 ? "bg-gray-400 opacity-40" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="ml-2 p-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tv;
