import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
const MovieCards = () => {
  const [topRated, setTopRated] = useState([]);
  const [tvRecommendations, setTvRecommendations] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingActors, setTrendingActors] = useState([]);
  
  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
        );
        setTopRated(popularResponse.data.results);
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };
    const fetchTvRecommendations = async () => {
      try {
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
        );
        console.log(popularMovies, "SALAAM");
        setTvRecommendations(popularResponse.data.results);
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };
    const fetchPopularMovies = async () => {
      try {
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=f345faa446485deffb377e9fe52e2792&language=en-US&page=1`
        );
        setPopularMovies(popularResponse.data.results);
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };
  
    const fetchTrendingActors = async () => {
      try {
        const trendingActors = await axios.get(
          `https://api.themoviedb.org/3/trending/person/day?api_key=f345faa446485deffb377e9fe52e2792&language=en-US`
        );
        setTrendingActors(trendingActors.data.results);
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };
    fetchTopRated()
    fetchTvRecommendations()
    fetchPopularMovies();
    fetchTrendingActors();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    dots: true,
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
  return (
    <div className="movies_cards overflow-hidden lg:px-5 px-6">
      <div className="actor-card">
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Popular Actors</h2>
        <Slider {...settings2}>
          {trendingActors?.map((dt, i) => (
            <Link to={`/actor-details/${dt.id}`} key={i}>
              <div className="relative cursor-pointer gap-2">
                <div className="flex items-center justify-center rounded-full overflow-hidden">
                  <img
                    className="inset-0  h-24 w-24 object-cover rounded-full"
                    width={200}
                    height={200}
                    src={`https://image.tmdb.org/t/p/original/${
                      dt?.known_for.backdrop_path || dt?.profile_path
                    }`}
                  />
                </div>
                <div className="text-center p-2 transition-opacity">
                  <div className="text-2x1 font-bold">{dt?.name}</div>
                  {/* Diğer bilgileri ekleyebilirsiniz */}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
      <div className="movies-card mt-5">
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Top Rated</h2>
        <Slider {...settings}>
          {topRated?.map((dt, i) => (
            <div key={i} className="relative cursor-pointer text-white gap-2 ">
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
                      {dt?.release_date} <br />
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
        </Slider>
      </div>
      <div className="movies-card mt-5">
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Tv Trend Series</h2>
        <Slider {...settings}>
          {tvRecommendations?.map((dt, i) => (
            <div key={i} className="relative cursor-pointer text-white gap-2 ">
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
                    <div className="text-2x1 font-bold">
                      {dt?.release_date} <br />
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
        </Slider>
      </div>
      <div className="movies-card mt-5">
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Popular Films</h2>
        <Slider {...settings}>
          {popularMovies?.map((dt, i) => (
            <div key={i} className="relative cursor-pointer text-white gap-2 ">
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
                      {dt?.release_date} <br />
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
        </Slider>
      </div>
   
    </div>
  );
};

export default MovieCards;
