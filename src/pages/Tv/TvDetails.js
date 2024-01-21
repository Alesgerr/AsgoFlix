import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../assets/MovieDetail.css";
import Slider from "react-slick";

const TvDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const [seasonData, setSeasonData] = useState([]);
  const [sortBy, setSortBy] = useState("sort");
  const [castData, setCastData] = useState({});

  const fetchData = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
    );
    setMovieData(res.data);
    setSeasonData(res.data.seasons);
  };
  const fetchCredits = async () => {
    try {
      const apiKey = "f345faa446485deffb377e9fe52e2792";
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      setCastData(res.data);
    } catch (error) {
      console.error("Fetch credits error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCredits();
  }, [id]);
  const {
    budget,
    backdrop_path,
    poster_path,
    languages,
    production_companies,
    production_countries,
    release_date,
    name,
    vote_average,
    overview,
    popularity,
    first_air_date,
    last_air_date,
    original_language,
    genres,
    video,
    seasons,
  } = movieData || {};

  const handleSortChange = (value) => {
    setSortBy(value);
  };
  const renderSeasons = () => {
    let sortedSeasons = [...seasonData];

    if (sortBy === "first_air_date.desc") {
      sortedSeasons = sortedSeasons.sort(
        (a, b) => new Date(b.air_date) - new Date(a.air_date)
      );
    } else if (sortBy === "first_air_date.asc") {
      sortedSeasons = sortedSeasons.sort(
        (a, b) => new Date(a.air_date) - new Date(b.air_date)
      );
    }
    return sortedSeasons.map((season, index) => (
      <div key={index} className="bg-gray-800 p-4 rounded-md lg:w-36">
        <h3 className="md:text-1x1 lg:text-1xl font-bold text-white">{season.name}</h3>
        {/* <p className="text-gray-400">Air Date: {season.air_date}</p> */}
        <p className="text-gray-400 flex">Episode {season.episode_count}</p>
        {/* <p className="text-gray-400">Vote Average: {season.vote_average}</p> */}
        <div className="flex items-center">
         <FaStar className="text-yellow-400"/>
         <span className="ml-1 text-white">{season.vote_average}</span>
        </div>
      </div>
    ));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
  return (
    <>
      {movieData && (
        <>
          <div
            className="banner container mx-auto overflow-hidden" /*</>style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}} */>
            <div className="mb-3 movie-content md:flex lg:flex text-black">
              <div className="relative movie-content__poster flex justify-center">
                <div className="pt-5 max-w-80">
                  <img className="rounded-xl details_img" src={`https://image.tmdb.org/t/p/original/${poster_path ? poster_path : backdrop_path}`} alt="" />
                </div>
              </div>
              <div className="movie-content__info flex flex-col justify-center  sm:mb-0 md:mb-0 lg:mb-0 md:pl-4 lg:pl-6 dark:text-white font-bold">
                <div className="flex items-center justify-between">
                  <div className="movieContentDiv">
                    <h1 className="text-2xl font-bold movieContentDiv">
                      {name}
                    </h1>
                    <div className="mt-2 mb-2 movieContentDiv">
                      {first_air_date === last_air_date
                        ? "Publication Date: " + first_air_date
                        : first_air_date}{" "}
                      {last_air_date === first_air_date
                        ? ""
                        : "| " + last_air_date}
                    </div>
                    <div>Seasons {seasons.length}</div>
                  </div>
                  {/* ({languages}) */}
                </div>
                <div className="genres flex flex-wrap items-center gap-1 text-white movieContentDiv">
                  {genres &&
                    genres.slice(0, 5).map((genre, i) => (
                      <div key={i}>
                        <span key={i} className="genres__item">
                          {genre.name}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="flex items-center movieContentDiv">
                  <FaStar className="me-2 text-yellow-400" />{" "}
                  {vote_average.toFixed(2)}
                </div>
                <div className="season">
                  <div className='flex flex-wrap gap-1'>{renderSeasons()}</div>
                </div>
                <p className="movieContentDiv">{overview}</p>
                <div className="cast movieContentDiv">
                  <Slider {...settings}>
                    {castData.cast?.map((dt) => (
                      <div
                        key={dt.id}
                        className="rounded-md overflow-hidden shadow-md"
                      >
                        <Link to={`/actor-details/${dt.id}`}>
                          <div className="relative">
                            <div className="relative movieContentDiv flex justify-center">
                              {dt.profile_path ? (
                                <img
                                  className="inset-0  h-24 w-24 object-cover rounded-full"
                                  src={`https://image.tmdb.org/t/p/w300/${dt?.profile_path}`}
                                />
                              ) : (
                                <img
                                  className="inset-0  h-24 w-24 object-cover rounded-full"
                                  width={200}
                                  height={200}
                                  src={
                                    "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                                  }
                                />
                              )}
                            </div>
                            <div className="p-4 movieContentDiv text-center ">
                              <div className="actor_name">
                                 <h4 className="text-md font-semibold">{dt?.name}</h4>
                              </div>
                              </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TvDetails;
