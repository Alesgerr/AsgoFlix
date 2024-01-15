import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const MovieCards = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingActors, setTrendingActors] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_TMDB_API_KEY);
    console.log(process.env);
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
    const fetchTrendingMovies = async () => {
      try {
        const trendingResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=f345faa446485deffb377e9fe52e2792`
        );
        setTrendingMovies(trendingResponse.data.results);
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

    fetchPopularMovies();
    fetchTrendingMovies();
    fetchTrendingActors();
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
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
      <div className="movies-card">
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Trend Actors</h2>
        <Slider {...settings2}>
          {trendingActors?.map((dt, i) => (
            <Link to={`/actor/${dt.id}`} key={i}>
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
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Popular Films</h2>
        <Slider {...settings}>
          {popularMovies?.map((dt, i) => (
            <div key={i} className="relative cursor-pointer text-white gap-2 ">
              <Link to={`/movie/${dt.id}`}>
                <div className="relative">
                  <img
                    className="h-64 object-cover rounded-lg"
                    width={500}
                    height={450}
                    src={`https://image.tmdb.org/t/p/original/${
                      dt?.backdrop_path || dt?.poster_path
                    }`}
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
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
        <h2 className="text-2xl p-1 font-bold mb-4 flex">Trend Films</h2>
        <Slider {...settings}>
          {trendingMovies?.map((dt, i) => (
            <div key={i} className="relative cursor-pointer text-white gap-2 ">
              <img
                className="h-64 object-cover rounded-lg"
                width={500}
                height={450}
                src={`https://image.tmdb.org/t/p/original/${
                  dt?.backdrop_path || dt?.poster_path
                }`}
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
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
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieCards;
