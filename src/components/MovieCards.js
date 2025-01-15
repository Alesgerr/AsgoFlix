import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Skeleton from 'react-loading-skeleton';
import Skeleton from "@mui/material/Skeleton";
import VideoModal from "./VideoModal";

const LoadingCardActor = () => (
  <div className="flex justify-center  gap-2">
    <Skeleton
      className="dark:bg-gray-500 rounded-sm"
      variant="circular"
      width={100}
      height={100}
    />
  </div>
);
const LoadingCard = () => (
  <div className="flex justify-center gap-2">
    <Skeleton
      className="dark:bg-gray-500 rounded-sm "
      variant="rectangular"
      width={300}
      height={160}
    />
    {/* <Skeleton variant="rounded" width={500} height={160} /> */}
  </div>
);
const MovieCards = () => {
  const [topRated, setTopRated] = useState([]);
  const [tvRecommendations, setTvRecommendations] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingActors, setTrendingActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          topRatedResponse,
          tvRecommendationsResponse,
          popularMoviesResponse,
          trendingActorsResponse,
        ] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
          ),
          axios.get(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
          ),
          axios.get(
            `https://api.themoviedb.org/3/trending/person/day?api_key=f345faa446485deffb377e9fe52e2792&language=en-US`
          ),
        ]);

        setTopRated(topRatedResponse.data.results);
        setTvRecommendations(tvRecommendationsResponse.data.results);
        setPopularMovies(popularMoviesResponse.data.results);
        setTrendingActors(trendingActorsResponse.data.results);
      } catch (error) {
        console.error("Axios request error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [popularMovies]);
  const settings = {
    dots: loading ? false : true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const settings2 = {
    dots: loading ? false : true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const settingsBanner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const openModal = () => {
    setModalOpen(true);
  };

  // Modal'ı kapatan fonksiyon
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="movies_cards overflow-hidden px-3 lg:px-0 ">
      <div className="banner my-3">
        {popularMovies?.slice(0, 1).map((item, i) => (
          <div key={i}>
            <div className="relative bg-gradient-to-r p-10 h-96 text-white">
              <div className="container mx-auto flex flex-wrap items-center justify-center h-96 ">
                <div className="text-center z-50">
                  <h1 className="text-4xl font-bold mb-4">
                    Welcome to Asgoflix!
                  </h1>
                  <p className="text-lg mb-6">
                    Discover your favorite movies and TV series here.
                  </p>
                  <Link
                    to="/categories"
                    className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition duration-300"
                  >
                    Discover Now
                  </Link>
                </div>
                <div className="banner_img">
                  <img
                    className="h-96 w-full object-cover rounded-2xl absolute top-0 left-0"
                    // width={1000}
                    // height={400}
                    src={`https://image.tmdb.org/t/p/original/${
                      item?.backdrop_path || item?.poster_path
                    }`}
                  />
                  <div className="absolute h-96 inset-0 bg-black opacity-50 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="actor-card mt-3">
        <h2 className="text-2xl p-1 font-extrabold mb-4 flex">
          Popular Actors
        </h2>
        <Slider {...settings2}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <LoadingCardActor key={index} />
              ))
            : trendingActors?.map((dt, i) => (
                <Link to={`/actor-details/${dt.id}`} key={i}>
                  <div className="relative cursor-pointer gap-2">
                    <div className="flex items-center justify-center rounded-full overflow-hidden">
                      {dt.profile_path ? (
                        <img
                          className="inset-0 h-24 w-24 object-cover rounded-full"
                          width={200}
                          height={200}
                          src={`https://image.tmdb.org/t/p/original/${dt?.profile_path}`}
                        />
                      ) : (
                        <img
                          className="inset-0 h-24 w-24 object-cover rounded-full"
                          width={200}
                          height={200}
                          src={
                            "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                          }
                        />
                      )}
                    </div>
                    <div className="text-center p-2 transition-opacity">
                      <div className="text-2x1 font-bold">{dt?.name}</div>
                    </div>
                  </div>
                </Link>
              ))}
        </Slider>
      </div>
      <div className="movies-card mt-10">
        <h2 className="text-2xl p-1 font-extrabold mb-4 flex">Top Rated</h2>
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} />
              ))
            : topRated?.map((dt, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer text-white gap-2 "
                >
                  <Link to={`/movies/${dt.id}`}>
                    <div className="relative">
                      <img
                        className="h-64 object-cover rounded-2xl"
                        width={500}
                        height={450}
                        src={`https://image.tmdb.org/t/p/original/${
                          dt?.backdrop_path || dt?.poster_path
                        }`}
                      />
                      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                      <div className="absolute bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                        <div className="text-2x1 font-bold">{dt?.title}</div>
                        <div className="text-2x1 font-bold">
                          <div className="flex items-center">
                            {dt?.release_date.slice(0, 4)}
                            <div className="ml-5 flex items-center">
                              {dt?.vote_average.toFixed(2)}
                              <FaStar className="ml-1 text-yellow-500" />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </Slider>
      </div>
      <div className="movies-card mt-10">
        <h2 className="text-2xl p-1 font-extrabold mb-4 flex">
          Tv Trend Series
        </h2>
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} />
              ))
            : tvRecommendations?.map((dt, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer text-white gap-2 "
                >
                  <Link to={`/tv/${dt.id}`}>
                    <div className="relative">
                      <img
                        className="h-64 object-cover rounded-2xl"
                        width={500}
                        height={450}
                        src={`https://image.tmdb.org/t/p/original/${
                          dt?.backdrop_path || dt?.poster_path
                        }`}
                      />
                      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                      <div className="absolute bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                        <div className="text-2x1 font-bold">{dt?.name}</div>
                        <div className="flex items-center font-bold">
                          {dt.release_date ? dt.release_date.slice(0, 4) : ""}
                          <div
                            className={`flex items-center ${
                              dt.release_date ? "ml-5" : "sasas"
                            }`}
                          >
                            {dt?.vote_average.toFixed(2)}
                            <FaStar className="ml-1 text-yellow-500" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </Slider>
      </div>
      <div className="movies-card mt-10">
        <h2 className="text-2xl p-1 font-extrabold mb-4 flex">Popular Films</h2>
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} />
              ))
            : popularMovies?.map((dt, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer text-white gap-2 "
                >
                  <Link to={`/movies/${dt.id}`}>
                    <div className="relative">
                      <img
                        className="h-64 object-cover rounded-2xl"
                        width={500}
                        height={450}
                        src={`https://image.tmdb.org/t/p/original/${
                          dt?.backdrop_path || dt?.poster_path
                        }`}
                      />
                      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                      <div className="absolute bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                        <div className="text-2x1 font-bold">{dt?.title}</div>
                        <div className="flex items-center font-bold">
                          {dt.release_date ? dt.release_date.slice(0, 4) : ""}
                          <div
                            className={`flex items-center ${
                              dt.release_date ? "ml-5" : "sasas"
                            }`}
                          >
                            {dt?.vote_average.toFixed(2)}
                            <FaStar className="ml-1 text-yellow-500" />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieCards;
